import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "BASIC",
    price: 28,
    features: ["1 Tweet par jour", "50 Follows", "50 Likes", "50 Retweets"],
  },
  {
    name: "ARGENT",
    price: 50,
    features: ["5 Tweets par jour", "100 Follows", "100 Likes par Tweet", "100 Retweets par Tweet"],
  },
  {
    name: "GOLD",
    price: 90,
    features: [
      "10 Tweets par jour",
      "100 Follows",
      "100 Likes par Tweet",
      "100 Retweets par Tweet",
      "50 Comments par Tweet",
    ],
  },
  {
    name: "DIAMOND",
    price: 170,
    features: [
      "10 Tweets par jour",
      "150 Follows",
      "150 Likes par Tweet",
      "150 Retweets par Tweet",
      "100 Comments par Tweet",
    ],
  },
  {
    name: "CUIVRE",
    price: 300,
    features: [
      "10 Tweets par jour",
      "300 Follows",
      "300 Likes par Tweet",
      "300 Retweets par Tweet",
      "200 Comments par Tweet",
    ],
  },
  {
    name: "PLATINIUM",
    price: 480,
    features: [
      "10 Tweets par jour",
      "1000 Follows",
      "1000 Likes par Tweet",
      "1000 Retweets par Tweet",
      "500 Comments par Tweet",
    ],
  },
];

const Plans = () => {
  return (
    <div className="py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Nos Plans</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-togglex-gray rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
            <p className="text-3xl font-bold mb-6">${plan.price}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="text-togglex-yellow mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              to={`/subscribe/${plan.name}`}
              className="block w-full bg-togglex-yellow text-black text-center py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Souscrire
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Plans; 