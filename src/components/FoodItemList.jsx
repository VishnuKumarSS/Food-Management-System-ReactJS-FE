import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { api } from "@services/api";

import FoodItem from "./FoodItem";
import { Button } from "./ui/button";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const token = localStorage.getItem("token");
  function handleDelete(id) {
    api
      .delete(`/food/food-items/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setFoodItems(foodItems.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the food item!", error);
      });
  }
  useEffect(() => {
    api
      .get("/food/food-items/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFoodItems(response.data);
        console.log("response.data", response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the food items!", error);
      });
  }, [token]);

  return (
    <div className="container mx-auto px-4 space-y-4">
      <h1>Food Items</h1>
      <Button>
        <Link to="/add-food-item">Add Food Item</Link>
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foodItems.map((item) => (
          <FoodItem
            key={item.id}
            item={item}
            isAdmin={true}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodItemList;
