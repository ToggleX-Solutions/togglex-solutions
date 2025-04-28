import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3001/api/login", { email, password });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-togglex-gray p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-togglex-yellow mb-6">Connexion Admin</h1>
        {error && (
          <div className="bg-red-600 text-white p-2 rounded text-center">{error}</div>
        )}
        <div>
          <label className="block text-togglex-yellow mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded bg-black border border-gray-700 text-white focus:outline-none focus:border-togglex-yellow"
            required
          />
        </div>
        <div>
          <label className="block text-togglex-yellow mb-2">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-black border border-gray-700 text-white focus:outline-none focus:border-togglex-yellow"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-togglex-yellow text-black font-semibold py-3 rounded hover:bg-yellow-400 transition-colors"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login; 