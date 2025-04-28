import { motion } from "framer-motion";

const Legal = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-togglex-gray text-white py-16"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold text-togglex-yellow mb-8 text-center"
        >
          Mentions Légales
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <section className="bg-togglex-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
            <div className="space-y-2 text-gray-300">
              <p>ToggleX Solutions SAS</p>
              <p>123 Rue de la Tech</p>
              <p>75000 Paris, France</p>
              <p>RCS Paris B 123 456 789</p>
              <p>Capital social : 100 000 €</p>
              <p>Email : contact@togglex-solutions.com</p>
              <p>Téléphone : +33 1 23 45 67 89</p>
            </div>
          </section>

          <section className="bg-togglex-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Directeur de la publication</h2>
            <p className="text-gray-300">M. Jean Dupont, Président Directeur Général</p>
          </section>

          <section className="bg-togglex-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Hébergement</h2>
            <div className="space-y-2 text-gray-300">
              <p>Amazon Web Services (AWS)</p>
              <p>38 Avenue John F. Kennedy</p>
              <p>L-1855 Luxembourg</p>
              <p>https://aws.amazon.com</p>
            </div>
          </section>

          <section className="bg-togglex-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
            <p className="text-gray-300">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>

          <section className="bg-togglex-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Protection des données personnelles</h2>
            <p className="text-gray-300">
              Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD) du 27 avril 2016, vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données ou encore de limitation du traitement. Vous pouvez également, pour des motifs légitimes, vous opposer au traitement des données vous concernant.
            </p>
          </section>

          <section className="bg-togglex-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p className="text-gray-300">
              Ce site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur. Pour en savoir plus sur notre politique en matière de cookies, consultez notre page dédiée.
            </p>
          </section>

          <section className="bg-togglex-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Crédits</h2>
            <div className="space-y-2 text-gray-300">
              <p>Conception et développement : ToggleX Solutions</p>
              <p>Design : ToggleX Solutions</p>
              <p>Photographies : Unsplash, Pexels</p>
              <p>Icônes : Heroicons</p>
            </div>
          </section>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Legal; 