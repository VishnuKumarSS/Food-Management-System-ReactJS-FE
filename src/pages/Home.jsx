import FoodItem from "@/components/FoodItem";
import { api } from "@services/api";
import React from "react";
import { useState, useEffect } from "react";

function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const token = localStorage.getItem("token");

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {foodItems.map((item) => (
        <FoodItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default Home;
