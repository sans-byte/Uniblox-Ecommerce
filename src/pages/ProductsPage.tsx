import { useState } from "react";
import { Search } from "lucide-react";
import { useStore } from "@/store/useStore";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Input } from "@/components/ui/input";

export function ProductsPage() {
  const { products } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container px-4 py-12 m-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Our Products</h1>
          <p className="text-muted-foreground">
            Browse our collection of quality products
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-medium">
            {searchTerm ? `Results for "${searchTerm}"` : "All Products"}{" "}
            <span className="text-muted-foreground">
              ({filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"})
            </span>
          </h2>

          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No products found. Try a different search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
