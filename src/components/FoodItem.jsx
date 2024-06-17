function FoodItem({ item }) {
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
    </div>
  );
}

export default FoodItem;
