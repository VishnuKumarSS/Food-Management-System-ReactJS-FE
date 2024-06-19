import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
    console.log("User signed out");
  };

  return (
    <header className="flex h-16 w-full items-center justify-center px-4 md:px-6 rounded-lg mt-4 bg-gray-100">
      <nav className="hidden items-center gap-6 sm:flex w-full justify-between">
        <Link
          to={"/"}
          className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
        >
          Home
        </Link>
        <div className="flex flex-row gap-4">
          {isAuthenticated ? (
            <>
              {JSON.parse(localStorage.getItem("userData")).is_admin && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-gray-300 border-dashed"
                  >
                    <Link
                      to={"/manage-food-items"}
                      className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    >
                      Manage Food Items
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 border-gray-300 border-dashed"
                  >
                    <Link
                      to={"/all-orders-admin"}
                      className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    >
                      All orders
                    </Link>
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm">
                <Link
                  to={"/cart"}
                  className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                >
                  Cart
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Link
                  to={"/orders"}
                  className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                >
                  Orders
                </Link>
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                onClick={handleSignOut}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm">
                <Link
                  to={"/register"}
                  className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                >
                  Register
                </Link>
              </Button>

              <Button variant="outline" size="sm">
                <Link
                  to={"/login"}
                  className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                >
                  Login
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Link
                  to={"/request-otp"}
                  className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                >
                  Request OTP
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="sm:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-4">
            <div className="flex flex-col gap-4">
              {isAuthenticated ? (
                <>
                  {JSON.parse(localStorage.getItem("userData")).is_admin && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-2 border-gray-300 border-dashed"
                      >
                        <Link
                          to={"/manage-food-items"}
                          className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                        >
                          Manage Food Items
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-2 border-gray-300 border-dashed"
                      >
                        <Link
                          to={"/all-orders-admin"}
                          className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                        >
                          All orders
                        </Link>
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm">
                    <Link
                      to={"/cart"}
                      className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    >
                      Cart
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Link
                      to={"/orders"}
                      className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    >
                      Orders
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    onClick={handleSignOut}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm">
                    <Link
                      to={"/register"}
                      className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    >
                      Register
                    </Link>
                  </Button>

                  <Button variant="outline" size="sm">
                    <Link
                      to={"/login"}
                      className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    >
                      Login
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Link
                      to={"/request-otp"}
                      className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    >
                      Request OTP
                    </Link>
                  </Button>
                </>
              )}
            </div>
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
