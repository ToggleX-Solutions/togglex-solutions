import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChartPie, FaUsers, FaUserPlus, FaFileExport, FaCog, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import { utils, writeFile } from "xlsx";
import { toast } from "sonner";

const COLORS = ["#FFD700", "#00C49F", "#FF8042", "#8884d8", "#FFBB28", "#FF6666"];

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [clients, setClients] = useState([]);
  const [filter, setFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [section, setSection] = useState("stats");
  const [showAddClient, setShowAddClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();

  // Placeholder pour l'ajout de client (à compléter)
  const [addClientData, setAddClientData] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    email: "",
    telephone: "",
    username: "",
    pays: "",
    ville: "",
    plan: "BASIC",
  });
  const [addClientError, setAddClientError] = useState("");
  const [addClientSuccess, setAddClientSuccess] = useState("");

  // Gestion des admins
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ email: "", password: "" });

  // Bannière d'alerte
  const [banner, setBanner] = useState({ show: false, type: "info", message: "" });
  const showBanner = (type, message) => {
    setBanner({ show: true, type, message });
    setTimeout(() => setBanner({ show: false, type: "info", message: "" }), 5000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchStats();
    fetchClients();
    fetchAdmins();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des stats:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/clients", {
        params: { startDate, endDate },
      });
      setClients(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des clients:", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/admins");
      setAdmins(res.data);
    } catch (err) {
      // ignore
    }
  };

  const filteredClients = clients.filter((client) =>
    client.plan.toLowerCase().includes(filter.toLowerCase())
  );

  // Statistiques clés
  const totalClients = clients.length;
  const totalPlans = stats.reduce((acc, s) => acc + s.count, 0);

  // Top 3 des plans
  const topPlans = [...stats].sort((a, b) => b.count - a.count).slice(0, 3);
  // Pourcentages de répartition
  const totalSouscriptions = stats.reduce((acc, s) => acc + s.count, 0);
  const plansWithPercent = stats.map((plan) => ({ ...plan, percent: totalSouscriptions ? Math.round((plan.count / totalSouscriptions) * 100) : 0 }));

  // Sidebar boutons pro
  const sidebarButtons = [
    { key: "stats", label: "Statistiques", icon: <FaChartPie /> },
    { key: "clients", label: "Liste des clients", icon: <FaUsers /> },
    { key: "add", label: "Ajouter un client", icon: <FaUserPlus /> },
    { key: "export", label: "Exporter", icon: <FaFileExport /> },
    { key: "settings", label: "Paramètres", icon: <FaCog /> },
    { key: "faq", label: "Support / FAQ", icon: <FaQuestionCircle /> },
    { key: "logout", label: "Déconnexion", icon: <FaSignOutAlt /> },
  ];

  // Gestion du clic sur les boutons
  const handleSidebarClick = (key) => {
    if (key === "logout") {
      localStorage.removeItem("token");
      navigate("/login");
    } else if (key === "add") {
      setShowAddClient(true);
    } else {
      setSection(key);
      setShowAddClient(false);
    }
  };

  const handleAddClientChange = (e) => {
    setAddClientData({ ...addClientData, [e.target.name]: e.target.value });
  };

  const handleAddClientSubmit = async (e) => {
    e.preventDefault();
    setAddClientError("");
    setAddClientSuccess("");
    try {
      await axios.post("http://localhost:3001/api/clients", addClientData);
      setAddClientSuccess("Client ajouté avec succès !");
      setAddClientData({ nom: "", postnom: "", prenom: "", email: "", telephone: "", username: "", pays: "", ville: "", plan: "BASIC" });
      fetchClients();
      showBanner('success', 'Nouveau client ajouté !');
    } catch (err) {
      setAddClientError("Erreur lors de l'ajout du client.");
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (admins.some(a => a.email === newAdmin.email)) {
      showBanner('error', 'Cet email admin existe déjà.');
      return;
    }
    try {
      await axios.post("http://localhost:3001/api/admins", newAdmin);
      showBanner('success', 'Nouvel admin ajouté !');
      setNewAdmin({ email: "", password: "" });
      fetchAdmins();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        showBanner('error', err.response.data.message);
      } else {
        showBanner('error', "Erreur lors de l'ajout de l'admin.");
      }
    }
  };

  // Placeholder pour l'ajout de client (à compléter)
  const AddClientModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-togglex-gray p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Ajouter un client</h2>
        {addClientError && <div className="bg-red-600 text-white p-2 rounded mb-2">{addClientError}</div>}
        {addClientSuccess && <div className="bg-green-600 text-white p-2 rounded mb-2">{addClientSuccess}</div>}
        <form onSubmit={handleAddClientSubmit} className="space-y-3">
          <input type="text" name="nom" value={addClientData.nom} onChange={handleAddClientChange} placeholder="Nom" required className="w-full p-2 rounded bg-black border border-gray-700 text-white" />
          <input type="text" name="postnom" value={addClientData.postnom} onChange={handleAddClientChange} placeholder="Postnom" required className="w-full p-2 rounded bg-black border border-gray-700 text-white" />
          <input type="text" name="prenom" value={addClientData.prenom} onChange={handleAddClientChange} placeholder="Prénom" required className="w-full p-2 rounded bg-black border border-gray-700 text-white" />
          <input type="email" name="email" value={addClientData.email} onChange={handleAddClientChange} placeholder="Email" required className="w-full p-2 rounded bg-black border border-gray-700 text-white" />
          <input type="tel" name="telephone" value={addClientData.telephone} onChange={handleAddClientChange} placeholder="Téléphone" className="w-full p-2 rounded bg-black border border-gray-700 text-white" />
          <input type="text" name="username" value={addClientData.username} onChange={handleAddClientChange} placeholder="Username Twitter" required className="w-full p-2 rounded bg-black border border-gray-700 text-white" />
          <input type="text" name="pays" value={addClientData.pays} onChange={handleAddClientChange} placeholder="Pays" required className="w-full p-2 rounded bg-black border border-gray-700 text-white" />
          <input type="text" name="ville" value={addClientData.ville} onChange={handleAddClientChange} placeholder="Ville" required className="w-full p-2 rounded bg-black border border-gray-700 text-white" />
          <select name="plan" value={addClientData.plan} onChange={handleAddClientChange} className="w-full p-2 rounded bg-black border border-gray-700 text-white">
            <option value="BASIC">BASIC</option>
            <option value="ARGENT">ARGENT</option>
            <option value="GOLD">GOLD</option>
            <option value="DIAMOND">DIAMOND</option>
            <option value="CUIVRE">CUIVRE</option>
            <option value="PLATINIUM">PLATINIUM</option>
          </select>
          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-togglex-yellow text-black px-4 py-2 rounded font-semibold">Ajouter</button>
            <button type="button" onClick={() => setShowAddClient(false)} className="bg-gray-700 text-white px-4 py-2 rounded font-semibold">Fermer</button>
          </div>
        </form>
      </div>
    </div>
  );

  // Fonction utilitaire pour générer l'URL d'un avatar DiceBear
  const getAvatarUrl = (email) => `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(email)}`;

  // Fiche client détaillée (modal)
  const ClientDetailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-togglex-gray p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <img src={getAvatarUrl(selectedClient.email)} alt="avatar" className="w-10 h-10 rounded-full border border-gray-700" />
          Détail du client
        </h2>
        {selectedClient ? (
          <div className="space-y-2">
            <div><span className="font-semibold">Nom :</span> {selectedClient.nom}</div>
            <div><span className="font-semibold">Postnom :</span> {selectedClient.postnom}</div>
            <div><span className="font-semibold">Prénom :</span> {selectedClient.prenom}</div>
            <div><span className="font-semibold">Email :</span> {selectedClient.email}</div>
            <div><span className="font-semibold">Téléphone :</span> {selectedClient.telephone}</div>
            <div><span className="font-semibold">Username Twitter :</span> {selectedClient.username}</div>
            <div><span className="font-semibold">Pays :</span> {selectedClient.pays}</div>
            <div><span className="font-semibold">Ville :</span> {selectedClient.ville}</div>
            <div><span className="font-semibold">Plan :</span> {selectedClient.plan}</div>
            <div><span className="font-semibold">Date de souscription :</span> {new Date(selectedClient.dateSouscription).toLocaleDateString()}</div>
          </div>
        ) : null}
        <button onClick={() => setSelectedClient(null)} className="mt-6 bg-togglex-yellow text-black px-4 py-2 rounded font-semibold">Fermer</button>
      </div>
    </div>
  );

  // Fonction d'export CSV
  const handleExportCSV = () => {
    if (clients.length === 0) return;
    const data = clients.map(({ id, nom, postnom, prenom, email, telephone, username, plan, pays, ville, dateSouscription }) => ({
      id, nom, postnom, prenom, email, telephone, username, plan, pays, ville, dateSouscription
    }));
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Clients");
    writeFile(wb, "clients_togglex.csv");
  };

  // Générer les données d'évolution par mois
  const evolutionData = (() => {
    const map = {};
    clients.forEach((client) => {
      const date = new Date(client.dateSouscription);
      const mois = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      map[mois] = (map[mois] || 0) + 1;
    });
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([mois, souscriptions]) => ({ mois, souscriptions }));
  })();

  // Nombre de nouveaux clients ce mois-ci
  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const newClientsThisMonth = clients.filter(c => c.dateSouscription.startsWith(thisMonth)).length;

  // Taux de croissance mensuel
  const months = evolutionData.map(e => e.mois);
  const lastMonth = months.length > 1 ? months[months.length - 2] : null;
  const thisMonthCount = evolutionData.find(e => e.mois === thisMonth)?.souscriptions || 0;
  const lastMonthCount = lastMonth ? (evolutionData.find(e => e.mois === lastMonth)?.souscriptions || 0) : 0;
  const growthRate = lastMonthCount ? Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 100) : (thisMonthCount > 0 ? 100 : 0);

  return (
    <div className="flex min-h-[80vh]">
      {/* Bannière d'alerte */}
      {banner.show && (
        <div className={`fixed top-0 left-0 w-full z-50 text-center py-3 font-semibold ${banner.type === "success" ? "bg-green-600 text-white" : banner.type === "error" ? "bg-red-600 text-white" : "bg-togglex-yellow text-black"}`}>
          {banner.message}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-togglex-gray p-6 flex flex-col gap-4 rounded-xl mr-8 h-fit mt-4 shadow-lg">
        {sidebarButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => handleSidebarClick(btn.key)}
            className={`flex items-center gap-3 py-3 px-4 rounded font-semibold transition-colors text-left text-lg ${section === btn.key || (btn.key === "add" && showAddClient) ? "bg-togglex-yellow text-black" : "bg-black text-togglex-yellow hover:bg-togglex-yellow/80 hover:text-black"}`}
          >
            {btn.icon} {btn.label}
          </button>
        ))}
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 space-y-8">
        <h1 className="text-3xl font-bold mb-8">Tableau de Bord Admin</h1>

        {/* Section Statistiques */}
        {section === "stats" && (
          <>
            {/* Top 3 des plans */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Top 3 des plans les plus souscrits</h2>
              <div className="flex gap-4 flex-wrap">
                {topPlans.map((plan, idx) => (
                  <div key={plan.plan} className="bg-togglex-gray p-4 rounded-xl text-center shadow min-w-[120px]">
                    <div className="text-2xl font-bold" style={{ color: COLORS[idx % COLORS.length] }}>{plan.plan}</div>
                    <div className="text-3xl font-bold">{plan.count}</div>
                    <div className="text-gray-400">{plansWithPercent.find(p => p.plan === plan.plan)?.percent || 0}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistiques clés */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-togglex-gray p-6 rounded-xl text-center shadow">
                <div className="text-4xl font-bold text-togglex-yellow">{totalClients}</div>
                <div className="text-gray-400 mt-2">Clients inscrits</div>
              </div>
              <div className="bg-togglex-gray p-6 rounded-xl text-center shadow">
                <div className="text-4xl font-bold text-togglex-yellow">{totalPlans}</div>
                <div className="text-gray-400 mt-2">Souscriptions</div>
              </div>
              <div className="bg-togglex-gray p-6 rounded-xl text-center shadow">
                <div className="text-4xl font-bold text-green-400">+{newClientsThisMonth}</div>
                <div className="text-gray-400 mt-2">Nouveaux ce mois-ci</div>
              </div>
              <div className="bg-togglex-gray p-6 rounded-xl text-center shadow">
                <div className={`text-4xl font-bold ${growthRate > 0 ? 'text-green-400' : growthRate < 0 ? 'text-red-400' : 'text-gray-400'}`}>{growthRate}%</div>
                <div className="text-gray-400 mt-2">Croissance mensuelle</div>
              </div>
              {stats.map((plan, idx) => (
                <div key={plan.plan} className="bg-togglex-gray p-6 rounded-xl text-center shadow">
                  <div className="text-4xl font-bold" style={{ color: COLORS[idx % COLORS.length] }}>{plan.count}</div>
                  <div className="text-gray-400 mt-2">{plan.plan}</div>
                </div>
              ))}
            </div>

            {/* Graphique circulaire */}
            <div className="bg-togglex-gray p-6 rounded-xl mb-8">
              <h2 className="text-2xl font-semibold mb-4">Répartition des Plans</h2>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={plansWithPercent}
                      dataKey="count"
                      nameKey="plan"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#FFD700"
                      label={({ name, percent }) => `${name} (${Math.round(percent * 100)}%)`}
                    >
                      {plansWithPercent.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [`${value} souscriptions`, props.payload.plan]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Graphique d'évolution (exemple) */}
            <div className="bg-togglex-gray p-6 rounded-xl mb-8">
              <h2 className="text-2xl font-semibold mb-4">Évolution des Souscriptions</h2>
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={evolutionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="souscriptions" stroke="#FFD700" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Section Liste des clients */}
        {section === "clients" && (
          <>
            {/* Filtres */}
            <div className="flex gap-4 mb-4 flex-wrap">
              <input
                type="text"
                placeholder="Filtrer par plan"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-2 rounded bg-togglex-gray border border-gray-700"
              />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 rounded bg-togglex-gray border border-gray-700"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 rounded bg-togglex-gray border border-gray-700"
              />
              <button
                onClick={fetchClients}
                className="bg-togglex-yellow text-black px-4 py-2 rounded font-semibold"
              >
                Appliquer
              </button>
            </div>

            {/* Liste des clients */}
            <div className="bg-togglex-gray p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Liste des Clients</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="p-2">Nom</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Username Twitter</th>
                      <th className="p-2">Plan</th>
                      <th className="p-2">Pays</th>
                      <th className="p-2">Ville</th>
                      <th className="p-2">Date de souscription</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client) => (
                      <tr key={client.id} className="border-t border-gray-700 cursor-pointer hover:bg-togglex-yellow/10" onClick={() => setSelectedClient(client)}>
                        <td className="p-2 flex items-center gap-2">
                          <img src={getAvatarUrl(client.email)} alt="avatar" className="w-8 h-8 rounded-full border border-gray-700" />
                          {client.nom}
                        </td>
                        <td className="p-2">{client.email}</td>
                        <td className="p-2">{client.username}</td>
                        <td className="p-2">{client.plan}</td>
                        <td className="p-2">{client.pays}</td>
                        <td className="p-2">{client.ville}</td>
                        <td className="p-2">
                          {new Date(client.dateSouscription).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Section Ajouter un client (modal) */}
        {showAddClient && <AddClientModal />}

        {/* Section Export (placeholder) */}
        {section === "export" && (
          <div className="bg-togglex-gray p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Exportation des données</h2>
            <button onClick={handleExportCSV} className="bg-togglex-yellow text-black px-4 py-2 rounded font-semibold">Exporter en CSV</button>
          </div>
        )}

        {/* Section Paramètres (gestion admins) */}
        {section === "settings" && (
          <div className="bg-togglex-gray p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Paramètres</h2>
            <h3 className="text-lg font-bold mb-2">Gestion des admins</h3>
            <form onSubmit={handleAddAdmin} className="flex gap-2 mb-4 flex-wrap">
              <input type="email" placeholder="Email" value={newAdmin.email} onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })} required className="p-2 rounded bg-black border border-gray-700 text-white" />
              <input type="password" placeholder="Mot de passe" value={newAdmin.password} onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })} required className="p-2 rounded bg-black border border-gray-700 text-white" />
              <button type="submit" className="bg-togglex-yellow text-black px-4 py-2 rounded font-semibold">Ajouter</button>
            </form>
            <ul className="list-disc ml-6 text-gray-300">
              {admins.map(a => <li key={a.id}>{a.email}</li>)}
            </ul>
          </div>
        )}

        {/* Section FAQ/Support (placeholder) */}
        {section === "faq" && (
          <div className="bg-togglex-gray p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Support / FAQ</h2>
            <p className="text-gray-400">Contactez-nous à support@togglexsolutions.com</p>
          </div>
        )}

        {/* Affichage de la fiche client détaillée */}
        {selectedClient && <ClientDetailModal />}
      </div>
    </div>
  );
};

export default Dashboard; 