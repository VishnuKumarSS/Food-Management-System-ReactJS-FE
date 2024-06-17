import { useState } from "react";

import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";

import { api } from "@services/api";
import { Button } from "@components/ui/button";

const Login = ({ withotp = false }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOTP] = useState("");

  console.log("withotp:", withotp);

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/account/token/", {
        email,
        password,
        otp, // Include OTP in login request if available
      });
      const responseData = response.data;
      const accessToken = responseData.access;
      const refreshToken = responseData.refresh;

      let decodedToken = jwtDecode(accessToken);

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refresh", refreshToken);
      localStorage.setItem("userData", JSON.stringify(decodedToken));

      navigate("/");
    } catch (error) {
      setError(error.message);
      navigate("/otp-login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleLogin} className="w-1/3">
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
        {withotp && (
          <input
            type="text"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            placeholder="OTP"
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </form>
      {!withotp && (
        <div className="m-8">
          <Link to={"/otp-login"}>
            <Button variant="outline">Login with OTP</Button>
          </Link>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Login;
