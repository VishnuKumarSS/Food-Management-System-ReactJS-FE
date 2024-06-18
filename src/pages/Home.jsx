import React, { useState, useEffect } from "react";
import FoodItem from "@/components/FoodItem";
import { api } from "@services/api";

function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch both food items and cart data
    const fetchData = async () => {
      try {
        const [foodResponse, cartResponse] = await Promise.all([
          api.get("/food/food-items/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          api.get("/orders/cart/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const foodData = foodResponse.data;
        const cartData = cartResponse.data;

        // Merge the cart quantities into the food items
        const itemsWithQuantity = foodData.map((item) => {
          const cartItem = cartData.items.find(
            (cartItem) => cartItem.food_item.id === item.id
          );
          return {
            ...item,
            quantity: cartItem ? cartItem.quantity : 0,
          };
        });

        setFoodItems(itemsWithQuantity);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    fetchData();
  }, [token]);

  const handleQuantityChange = (foodItemId, newQuantity, numberOfQuantity) => {
    console.log("Changing quantity for item", foodItemId, "to", newQuantity);
    api
      .post(
        "/orders/cart/items/",
        {
          food_item: foodItemId,
          quantity: numberOfQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setFoodItems((prevItems) => {
          return prevItems.map((item) =>
            item.id === foodItemId ? { ...item, quantity: newQuantity } : item
          );
        });
      })
      .catch((error) => {
        console.error("There was an error updating the cart item!", error);
      });
  };

  const handleIncrease = (foodItemId, currentQuantity) => {
    handleQuantityChange(foodItemId, currentQuantity + 1, 1);
  };

  const handleDecrease = (foodItemId, currentQuantity) => {
    handleQuantityChange(foodItemId, currentQuantity - 1, -1);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>Food Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foodItems.map((item) => (
          <FoodItem
            key={item.id}
            item={item}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
