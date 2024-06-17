import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OTPForm from "./components/OTPForm";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RequireAuth from "@components/RequireAuth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route element={<RequireAuth adminOnly={true} />}>
            <Route path="/test" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/otp-login" element={<Login withotp={true} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-otp" element={<OTPForm />} />
      </Routes>
    </Router>
  );
};

export default App;
