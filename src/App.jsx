import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OTPForm from "./components/OTPForm";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request-otp" element={<OTPForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp-login" element={<Login withotp={true} />} />
        {/* Protected route example */}
        {/* <ProtectedRoute
          path="/admin/orders"
          element={<AdminOrders />}
          adminOnly
        /> */}
        {/* Add more routes for other components */}
      </Routes>
    </Router>
  );
};

export default App;
