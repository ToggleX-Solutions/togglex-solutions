import { motion } from "framer-motion";

const About = () => {
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
          className="text-4xl font-bold text-togglex-yellow mb-8"
        >
          À propos de ToggleX Solutions
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Notre Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              Chez ToggleX Solutions, nous nous engageons à révolutionner la gestion des ressources
              informatiques pour les entreprises. Notre mission est de simplifier la complexité
              technologique tout en maximisant l'efficacité opérationnelle.
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Notre Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              Nous aspirons à devenir le leader mondial des solutions de gestion informatique,
              en offrant des outils innovants qui transforment la façon dont les entreprises
              gèrent leurs ressources technologiques.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-semibold mb-6">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "Nous repoussons constamment les limites de la technologie pour offrir des solutions avant-gardistes."
              },
              {
                title: "Excellence",
                description: "Nous nous engageons à fournir des produits et services de la plus haute qualité."
              },
              {
                title: "Intégrité",
                description: "Nous opérons avec transparence et éthique dans toutes nos interactions."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="bg-togglex-dark p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold text-togglex-yellow mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About; 