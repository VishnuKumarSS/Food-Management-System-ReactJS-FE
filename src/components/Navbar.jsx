import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="flex h-16 w-full items-center justify-center px-4 md:px-6">
      <nav className="hidden items-center gap-6 md:flex">
        <Link
          to={"/"}
          className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
        >
          Home
        </Link>
        <Link
          to={"/register"}
          className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
        >
          Register
        </Link>
        <Link
          to={"/login"}
          className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
        >
          Login
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-4">
            <Link
              to={"/"}
              className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
            >
              Home
            </Link>
            <Link
              to={"/"}
              className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
            >
              About
            </Link>
            <Link
              to={"/"}
              className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
            >
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
