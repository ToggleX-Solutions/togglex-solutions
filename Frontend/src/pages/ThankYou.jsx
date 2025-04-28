import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[60vh] flex flex-col items-center justify-center text-center"
    >
      <div className="bg-togglex-gray p-8 rounded-xl max-w-md">
        <h1 className="text-4xl font-bold mb-4">Merci pour votre souscription !</h1>
        <p className="text-lg mb-8">
          Votre compte sera activé dans les plus brefs délais. Notre équipe vous
          contactera pour finaliser la configuration.
        </p>
        <Link
          to="/"
          className="bg-togglex-yellow text-black px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </motion.div>
  );
};

export default ThankYou; 