import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

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

import FoodItem from "./FoodItem";
import { Button } from "./ui/button";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const token = localStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const pageSize = 10;

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
      .get(`/food/food-items/?page=${currentPage}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFoodItems(response.data.results);
        const cartData = response.data;
        console.log("cartData", cartData);

        setPreviousPage(cartData?.previous);
        setNextPage(cartData?.next);
        setTotalPages(Math.ceil(cartData.count / pageSize));
      })
      .catch((error) => {
        console.error("There was an error fetching the food items!", error);
      });
  }, [token, currentPage]);

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

export default FoodItemList;
