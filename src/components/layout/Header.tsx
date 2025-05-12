import React from "react";
import { Button } from "@/components/ui/button";
import { Home, LogIn, Package } from "lucide-react";
import { Link } from "react-router-dom";

type Prop = {};

export const Header: React.FC<Prop> = ({}) => {
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
      </div>
    </nav>
  );
};
