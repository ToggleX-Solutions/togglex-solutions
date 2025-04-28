require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connecté à la base de données SQLite');
    createTables();
  }
});

// Création des tables
function createTables() {
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT NOT NULL,
      postnom TEXT NOT NULL,
      prenom TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      telephone TEXT,
      username TEXT NOT NULL,
      plan TEXT NOT NULL,
      pays TEXT,
      ville TEXT,
      dateSouscription TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  // Création du compte admin par défaut
  const adminEmail = 'admin@togglexsolutions.com';
  const adminPassword = 'Lisu@2025';
  
  db.get('SELECT * FROM admin WHERE email = ?', [adminEmail], (err, row) => {
    if (!row) {
      const hashedPassword = bcrypt.hashSync(adminPassword, 10);
      db.run('INSERT INTO admin (email, password) VALUES (?, ?)', [adminEmail, hashedPassword]);
    }
  });
}

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM admin WHERE email = ?', [email], (err, admin) => {
    if (err || !admin) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    if (bcrypt.compareSync(password, admin.password)) {
      const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  });
});

app.post('/api/subscribe', async (req, res) => {
  const { nom, postnom, prenom, email, telephone, username, plan, pays, ville } = req.body;
  const dateSouscription = new Date().toISOString();

  // Log des données reçues
  console.log('Tentative de souscription :', req.body);

  try {
    // Création de la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Plan ${plan}`,
            },
            unit_amount: getPlanPrice(plan) * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/thank-you`,
      cancel_url: `${process.env.FRONTEND_URL}/plans`,
    });

    // Enregistrement du client dans la base de données
    db.run(
      'INSERT INTO clients (nom, postnom, prenom, email, telephone, username, plan, pays, ville, dateSouscription) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nom, postnom, prenom, email, telephone, username, plan, pays, ville, dateSouscription],
      (err) => {
        if (err) {
          console.error('Erreur lors de l\'insertion en base :', err);
          return res.status(500).json({ message: 'Erreur serveur (DB)' });
        }
        res.json({ sessionId: session.id });
      }
    );
  } catch (error) {
    console.error('Erreur Stripe ou serveur lors de la souscription :', error);
    res.status(500).json({ message: 'Erreur lors de la création de la session Stripe', details: error.message });
  }
});

app.get('/api/stats', authenticateToken, (req, res) => {
  db.all('SELECT plan, COUNT(*) as count FROM clients GROUP BY plan', (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(rows);
  });
});

app.get('/api/clients', authenticateToken, (req, res) => {
  const { startDate, endDate } = req.query;
  let query = 'SELECT * FROM clients';
  const params = [];

  if (startDate && endDate) {
    query += ' WHERE dateSouscription BETWEEN ? AND ?';
    params.push(startDate, endDate);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(rows);
  });
});

app.post('/api/admins', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run('INSERT INTO admin (email, password) VALUES (?, ?)', [email, hashedPassword], function(err) {
    if (err) {
      if (err.message && err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ message: 'Cet email admin existe déjà.' });
      }
      return res.status(500).json({ message: 'Erreur lors de la création de l\'admin', error: err.message });
    }
    res.json({ success: true, id: this.lastID });
  });
});

// Route GET / pour vérifier que l'API fonctionne
app.get('/', (req, res) => {
  res.send('API ToggleX en ligne');
});

// Fonction utilitaire pour obtenir le prix du plan
function getPlanPrice(plan) {
  const prices = {
    BASIC: 28,
    ARGENT: 50,
    GOLD: 90,
    DIAMOND: 170,
    CUIVRE: 300,
    PLATINIUM: 480,
  };
  return prices[plan] || 0;
}

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
}); 