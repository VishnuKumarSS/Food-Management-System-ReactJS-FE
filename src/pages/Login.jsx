import { useState } from "react";

import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";

import { api } from "@services/api";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";

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
    <div className="flex flex-col items-center justify-center gap-8">
      <h1>Login User</h1>
      <form onSubmit={handleLogin} className="w-1/3">
        <Label htmlFor="email">Email</Label>

        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        {withotp && (
          <>
            <Label htmlFor="text">Enter your OTP</Label>
            <Input
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="OTP"
            />
          </>
        )}
        <Button type="submit" className="w-full mt-8">
          Login
        </Button>
      </form>
      {!withotp && (
        <div>
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
