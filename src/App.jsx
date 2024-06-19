import React from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Home from "@pages/Home";
import Login from "@pages/Login";
import Register from "@pages/Register";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import OTPForm from "@components/OTPForm";
import RequireAuth from "@components/RequireAuth";
import AddFoodItem from "@components/AddFoodItem";
import FoodItemList from "@components/FoodItemList";
import UpdateFoodItem from "@components/UpdateFoodItem";
import Cart from "@pages/Cart";
import OrderList from "@pages/OrderList";
import AllOrderListAdmin from "@pages/AllOrderListAdmin";
import NotFound from "@pages/NotFound";


const App = () => {
  return (
    <div className="container flex flex-col gap-8 min-h-screen justify-between">
      <div className="flex flex-col gap-8">
        <Router>
          <Navbar />
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<OrderList />} />
              <Route element={<RequireAuth adminOnly={true} />}>
                <Route path="/manage-food-items" element={<FoodItemList />} />
                <Route path="/add-food-item" element={<AddFoodItem />} />
                <Route
                  path="/all-orders-admin"
                  element={<AllOrderListAdmin />}
                />
                <Route
                  path="/update-food-item/:id"
                  element={<UpdateFoodItem />}
                />
              </Route>
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/otp-login" element={<Login withotp={true} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/request-otp" element={<OTPForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default App;
