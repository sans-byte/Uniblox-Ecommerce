import React from "react";
import { Button } from "@/components/ui/button";
import {
  Badge,
  Home,
  LogIn,
  LogOut,
  Package,
  ShoppingBag,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

type Prop = {};

export const Header: React.FC<Prop> = ({}) => {
  const { cart, user, isAuthenticated, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="flex h-16 items-center px-4 md:px-6 shadow-md">
      <div className="font-bold text-xl mr-4 md:mr-8">UniBlox</div>
      <div className="flex items-center gap-3 md:gap-6">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs md:text-sm"
          asChild
        >
          <Link to="/" className="flex items-center gap-1 md:gap-2">
            <Home className="h-3 w-3 md:h-4 md:w-4" />
            <span>Home</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs md:text-sm"
          asChild
        >
          <Link to="/products" className="flex items-center gap-1 md:gap-2">
            <Package className="h-3 w-3 md:h-4 md:w-4" />
            <span>Products</span>
          </Link>
        </Button>
      </div>
      <div className="ml-auto">
        {/* {User Menu} */}
        {!isAuthenticated ? (
          <Button
            variant="outline"
            size="sm"
            className="text-xs md:text-sm px-2 md:px-4 cursor-pointer"
          >
            <Link to="/login" className="flex items-center gap-1 md:gap-2">
              <LogIn className="h-3 w-3 md:h-4 md:w-4" />
              <span>Login</span>
            </Link>
          </Button>
        ) : (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white p-4 rounded-2xl shadow-xl"
              >
                <DropdownMenuItem className="text-muted-foreground my-4">
                  Signed in as {user?.email}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex justify-start items-center"
                >
                  <Button className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
