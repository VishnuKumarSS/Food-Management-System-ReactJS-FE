import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OTPForm from "./components/OTPForm";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RequireAuth from "@components/RequireAuth";

const App = () => {
  return (
    <div className="container bg-pink-100">
      <Router>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route element={<RequireAuth adminOnly={true} />}>
              <Route path="/testadminpage" element={<Home />} />
            </Route>
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/otp-login" element={<Login withotp={true} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/request-otp" element={<OTPForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
