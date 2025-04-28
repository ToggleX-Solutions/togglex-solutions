import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Boostez votre présence sur{" "}
          <span className="text-togglex-yellow">Twitter</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          ToggleX Solutions vous offre des plans d'engagement personnalisés pour
          maximiser votre visibilité sur Twitter.
        </p>
        <Link
          to="/plans"
          className="bg-togglex-yellow text-black px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
          Choisir mon plan
        </Link>
      </motion.div>

      <motion.div
        className="mt-16 grid md:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="p-6 bg-togglex-gray rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Engagement Garanti</h3>
          <p>Augmentez votre visibilité avec des interactions authentiques.</p>
        </div>
        <div className="p-6 bg-togglex-gray rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Plans Flexibles</h3>
          <p>Choisissez le plan qui correspond à vos objectifs.</p>
        </div>
        <div className="p-6 bg-togglex-gray rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Support Premium</h3>
          <p>Une équipe dédiée pour vous accompagner.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home; 