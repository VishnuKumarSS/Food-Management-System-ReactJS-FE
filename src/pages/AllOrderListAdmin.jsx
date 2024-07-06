import React, { useEffect, useState } from "react";

import { api } from "@services/api";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const AllOrderListAdmin = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const currentUserId = JSON.parse(localStorage.getItem("userData")).user_id;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const pageSize = 5;

  const handlePageChange = ({
    newPage,
    previousPageClicked = false,
    nextPageClicked = false,
  }) => {
    if (
      (previousPageClicked === true && previousPage !== null) ||
      (nextPageClicked === true && nextPage !== null) ||
      (newPage > 0 && newPage <= totalPages)
    ) {
      setCurrentPage(newPage);
    }
  };

  const renderPaginationLinks = () => {
    let links = [];
    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === currentPage}
            onClick={() => handlePageChange({ newPage: i })}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    console.log("links", links);
    return links;
  };

  useEffect(() => {
    api
      .get(`/orders/admin/orders/?page=${currentPage}&page_size=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const ordersData = response.data;
        const ordersWithTotal = ordersData.results.map((order) => {
          const total = order.items_list.reduce((sum, item) => {
            return sum + item.quantity * item.price;
          }, 0);
          return { ...order, total };
        });
        setOrders(ordersWithTotal);

        setPreviousPage(ordersData?.previous);
        setNextPage(ordersData?.next);
        setTotalPages(Math.ceil(ordersData.count / pageSize));
      })
      .catch((error) => {
        console.error("There was an error fetching the orders!", error);
      });
  }, [token, currentPage]);

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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() =>
                handlePageChange({
                  newPage: currentPage - 1,
                  previousPageClicked: true,
                })
              }
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {renderPaginationLinks()}
          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                handlePageChange({
                  newPage: currentPage + 1,
                  nextPageClicked: true,
                })
              }
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AllOrderListAdmin;
