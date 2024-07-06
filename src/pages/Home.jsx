import React, { useState, useEffect } from "react";
import FoodItem from "@/components/FoodItem";
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

function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const token = localStorage.getItem("token");
  const pageSize = 4;

  const fetchData = async (page, pageSize) => {
    try {
      const [foodResponse, cartResponse] = await Promise.all([
        api.get(`/food/food-items/?page=${page}&page_size=${pageSize}`, {
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
      setPreviousPage(foodData?.previous);
      setNextPage(foodData?.next);

      // Merge the cart quantities into the food items
      const itemsWithQuantity = foodData.results.map((item) => {
        const cartItem = cartData.items.find(
          (cartItem) => cartItem.food_item.id === item.id
        );
        return {
          ...item,
          quantity: cartItem ? cartItem.quantity : 0,
        };
      });

      setFoodItems(itemsWithQuantity);
      setTotalPages(Math.ceil(foodData.count / pageSize));
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [token, currentPage]);

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
}

export default Home;
