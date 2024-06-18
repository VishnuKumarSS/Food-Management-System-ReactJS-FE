import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { api } from "@services/api";

function FoodItem({ item, isAdmin = false, handleDelete = null }) {
  return (
    <div className="flex flex-col border rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-medium mb-2">{item.name}</h3>
      <p className="text-gray-600 mb-2">{item.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">${item.price}</span>
        <span className="text-gray-600">
          Available: {item.quantity_available}
        </span>
      </div>
      {isAdmin && (
        <div className="flex flex-row gap-2 my-4">
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
      )}
    </div>
  );
}

export default FoodItem;
