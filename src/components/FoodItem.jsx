import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { api } from "@services/api";
import React from "react";

function FoodItem({
  item,
  isAdmin = false,
  handleDelete = null,
  onAddToCart = null,
}) {
  const token = localStorage.getItem("token");

  const handleAddToCart = (foodItemId) => {
    api
      .post(
        "/orders/cart/items/",
        { food_item: foodItemId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Item added to cart:", response.data);
        if (onAddToCart) onAddToCart(foodItemId);
      })
      .catch((error) => {
        console.error("There was an error adding the item to the cart!", error);
      });
  };

  return (
    <div className="flex flex-col border rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-medium mb-2">{item.name}</h3>
      <p className="text-gray-600 mb-2">{item.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">${item.price}</span>
        <span className="text-gray-600">
          Available: {item.quantity_available}
        </span>
      </div>
      {isAdmin ? (
        <div className="flex flex-row gap-2">
          <Button variant="" size="sm">
            <Link to={`/update-food-item/${item.id}`} className="">
              Update
            </Link>
          </Button>
          <Button
            onClick={() => handleDelete(item.id)}
            variant="destructive"
            size="sm"
          >
            Delete
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleAddToCart(item.id)}
          disabled={item.quantity_available <= 0}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
}

export default FoodItem;
