import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { api } from "@services/api";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const AddFoodItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity_available: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/food/food-items/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Food item added successfully!", response.data);
        navigate("/manage-food-items");
      })
      .catch((error) => {
        console.error("There was an error adding the food item!", error);
      });
  };

  return (
    <div className="mx-auto px-4 container flex flex-col items-center justify-center">
      <h1>Add Food Item</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>

          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="quantity_available">Quantity Available</Label>
          <Input
            type="number"
            name="quantity_available"
            value={formData.quantity_available}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Add Food Item</Button>
      </form>
    </div>
  );
};

export default AddFoodItem;
