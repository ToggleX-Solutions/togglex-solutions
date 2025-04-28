import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const Subscribe = () => {
  const { planName } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    postnom: "",
    prenom: "",
    email: "",
    telephone: "",
    username: "",
    pays: "",
    ville: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/subscribe", {
        ...formData,
        plan: planName,
      });

      if (response.data.sessionId) {
        toast.success("Redirection vers Stripe...");
        setTimeout(() => {
          window.location.href = `https://checkout.stripe.com/pay/${response.data.sessionId}`;
        }, 1000);
      }
    } catch (error) {
      toast.error("Erreur lors de la souscription");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Souscription au plan {planName}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-togglex-gray border border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-2">Postnom</label>
          <input
            type="text"
            name="postnom"
            value={formData.postnom}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-togglex-gray border border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-2">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-togglex-gray border border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-togglex-gray border border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-2">Téléphone (optionnel)</label>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full p-2 rounded bg-togglex-gray border border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-2">Username Twitter</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-togglex-gray border border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-2">Pays</label>
          <input
            type="text"
            name="pays"
            value={formData.pays}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-togglex-gray border border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-2">Ville</label>
          <input
            type="text"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-togglex-gray border border-gray-700"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-togglex-yellow text-black py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
          Payer avec Stripe
        </button>
      </form>
    </div>
  );
};

export default Subscribe; 