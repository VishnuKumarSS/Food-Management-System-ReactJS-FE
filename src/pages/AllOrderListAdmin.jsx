import React, { useState, useEffect } from "react";
import { api } from "@services/api";

const AllOrderListAdmin = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const currentUserId = JSON.parse(localStorage.getItem("userData")).user_id;

  useEffect(() => {
    api
      .get("/orders/admin/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const ordersWithTotal = response.data.map((order) => {
          const total = order.items_list.reduce((sum, item) => {
            return sum + item.quantity * item.price;
          }, 0);
          return { ...order, total };
        });
        setOrders(ordersWithTotal);
      })
      .catch((error) => {
        console.error("There was an error fetching the orders!", error);
      });
  }, [token]);

  return (
    <div className="container mx-auto px-4 flex flex-col gap-8">
      <h1>All Orders</h1>
      {orders.length === 0 ? (
        <p>There is no orders.</p>
      ) : (
        <ul className="flex flex-col gap-8">
          {orders.map((order) => (
            <li key={order.id}>
              <div className="flex flex-col border rounded-lg p-4 shadow-md outline-dashed outline-2 gap-4">
                <h2 className="flex flex-row items-center gap-2">
                  Order #{order.id}{" "}
                  {currentUserId === order.user && (
                    // To show the admin user, if the order is placed by them itself.
                    <span className="text-sm px-2 py-1 font-bold bg-foreground text-background rounded-lg">
                      You
                    </span>
                  )}
                </h2>
                <ul>
                  {order.items_list.map((item) => (
                    <li key={item.id}>
                      <div className="space-8">
                        <h4 className="font-bold">{item.food_name}</h4>
                        <p>
                          Quantity:{" "}
                          <span className="px-2 py-1 font-bold bg-gray-100 rounded-lg">
                            {item.quantity}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className=" bg-gray-100 rounded-lg w-fit px-2">
                  Order Total:{" "}
                  <span className="px-2 py-1 font-bold">
                    ₹{order.total.toFixed(2)}{" "}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllOrderListAdmin;
