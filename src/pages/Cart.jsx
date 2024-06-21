import React, { useState, useEffect } from "react";

import { api } from "@services/api";
import { Button } from "@components/ui/button";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    api
      .get("/orders/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the cart!", error);
      });
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
        console.log("API response:", response.data);
        setCart((prevCart) => {
          console.log(prevCart, response.data, newQuantity);
          const updatedItems =
            newQuantity > 0
              ? prevCart.items.map((item) =>
                  item.food_item.id === foodItemId
                    ? { ...item, quantity: newQuantity }
                    : item
                )
              : prevCart.items.filter(
                  (item) => item.food_item.id !== foodItemId
                );
          return { ...prevCart, items: updatedItems };
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

  const handlePlaceOrder = () => {
    const items = cart.items.map((item) => ({
      food_item: item.food_item.id,
      quantity: item.quantity,
    }));

    api
      .post(
        "/orders/orders/",
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Order placed successfully!", response.data);
        setCart(null); // Clear the cart after placing the order
      })
      .catch((error) => {
        console.error("There was an error placing the order!", error);
      });
  };

  if (!cart) {
    return <div>Order placed, Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto px-4 flex flex-col gap-8">
      <h1>Cart</h1>
      {cart.items.length !== 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cart.items.map((item) => (
            <li key={item.food_item.id}>
              <div className="flex flex-col border rounded-lg p-4 shadow-md outline-dashed outline-2">
                <h3 className="text-lg font-medium mb-2">
                  {item.food_item.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  {item.food_item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    ₹{item.food_item.price}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleDecrease(item.food_item.id, item.quantity)
                    }
                    disabled={item.quantity <= 0}
                  >
                    -
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleIncrease(item.food_item.id, item.quantity)
                    }
                    disabled={
                      item.quantity >= item.food_item.quantity_available
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      {cart.items.length > 0 && (
        <Button onClick={handlePlaceOrder} className="w-fit">
          Place Order
        </Button>
      )}
    </div>
  );
};

export default Cart;
