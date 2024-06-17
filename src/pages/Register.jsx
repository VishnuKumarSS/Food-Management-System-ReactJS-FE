import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@services/api";
import { Button } from "@components/ui/button";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/account/register/", {
        username,
        email,
        password,
      });
      navigate("/otp-login"); // Redirect to otp login page
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1>Register User</h1>
      <form onSubmit={handleRegister} className="w-1/3">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="p-2 border border-gray-300 rounded mb-2 w-full"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border border-gray-300 rounded mb-2 w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border border-gray-300 rounded mb-2 w-full"
        />
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Register;
