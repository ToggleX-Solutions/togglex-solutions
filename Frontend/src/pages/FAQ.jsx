import { motion } from "framer-motion";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Qu'est-ce que ToggleX Solutions ?",
      answer: "ToggleX Solutions est une plateforme innovante de gestion des ressources informatiques qui permet aux entreprises de simplifier et d'optimiser leurs opérations technologiques. Notre solution offre des outils puissants pour la gestion des actifs, la surveillance des performances et l'automatisation des tâches."
    },
    {
      question: "Comment puis-je commencer à utiliser ToggleX Solutions ?",
      answer: "Pour commencer, vous pouvez vous inscrire sur notre site web en choisissant un plan adapté à vos besoins. Une fois votre compte créé, vous aurez accès à un tableau de bord intuitif et à des guides d'utilisation pour vous aider à configurer rapidement votre environnement."
    },
    {
      question: "Quels sont les avantages de ToggleX Solutions ?",
      answer: "ToggleX Solutions offre plusieurs avantages clés : automatisation des tâches répétitives, réduction des coûts opérationnels, amélioration de la productivité, visibilité en temps réel sur vos ressources, et support technique dédié. Notre solution est également évolutive et s'adapte à la croissance de votre entreprise."
    },
    {
      question: "Est-ce que ToggleX Solutions est sécurisé ?",
      answer: "La sécurité est notre priorité absolue. Nous utilisons des protocoles de chiffrement avancés, des authentifications multi-facteurs, et des sauvegardes régulières pour protéger vos données. Notre infrastructure est régulièrement audité et conforme aux normes de sécurité les plus strictes."
    },
    {
      question: "Quel type de support technique est disponible ?",
      answer: "Nous offrons un support technique complet via plusieurs canaux : chat en direct, email, et téléphone. Notre équipe d'experts est disponible 24/7 pour vous aider à résoudre tout problème ou répondre à vos questions. Nous proposons également des sessions de formation et une documentation complète."
    },
    {
      question: "Puis-je personnaliser ToggleX Solutions selon mes besoins ?",
      answer: "Oui, ToggleX Solutions est hautement personnalisable. Vous pouvez adapter l'interface, les rapports, et les fonctionnalités selon vos besoins spécifiques. Notre API ouverte vous permet également d'intégrer notre solution avec vos outils existants."
    }
  ];

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
          Questions Fréquentes
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-togglex-dark rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 text-gray-300">{faq.answer}</div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300 mb-4">
            Vous n'avez pas trouvé la réponse à votre question ?
          </p>
          <a
            href="/contact"
            className="inline-block bg-togglex-yellow text-togglex-gray font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Contactez-nous
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FAQ; 