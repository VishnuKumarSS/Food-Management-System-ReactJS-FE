import { Button } from "@components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="text-9xl font-black">404</h1>
      <h2 className="text-gray-500 font-primary font-semibold">
        Page Not Found
      </h2>
      <Button className="border-2 border-dashed border-black">
        <Link to={"/"}>Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
