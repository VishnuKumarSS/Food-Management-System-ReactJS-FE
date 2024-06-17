import FoodItem from "@/components/FoodItem";
import React from "react";

function Home() {
  const items = [
    {
      id: 1,
      name: "Idli 1",
      description: "Delicious Idli",
      price: "3.99",
      quantity_available: 30,
      quantity_sold: 0,
    },
    {
      id: 2,
      name: "Idli 2",
      description: "Delicious Idli",
      price: "3.99",
      quantity_available: 30,
      quantity_sold: 0,
    },
    {
      id: 3,
      name: "Idli 3",
      description: "Delicious Idli",
      price: "3.99",
      quantity_available: 30,
      quantity_sold: 0,
    },
    {
      id: 4,
      name: "Idli 4",
      description: "Delicious Idli",
      price: "3.99",
      quantity_available: 30,
      quantity_sold: 0,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <FoodItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default Home;
