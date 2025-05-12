import * as React from "react";
import { useStore } from "@/store/useStore";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Check, Plus } from "lucide-react";
import { formatPrice } from "@/utils/discount";
import { toast } from "sonner";
import type { Product } from "@/types";

export function HomePageCarousel() {
  const { addToCart } = useStore();
  const [isAdding, setIsAdding] = React.useState(false);
  const { products } = useStore();
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-96"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card className="border-none">
                <CardContent className="flex h-96">
                  <div className="flex flex-row gap-10">
                    <section className="h-full w-3/4">
                      <Link to={`/product/${product.id}`} className="flex h-96">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </Link>
                    </section>

                    <section className="flex flex-col justify-between">
                      <div className="flex flex-col gap-10">
                        <span className="text-4xl font-semibold">
                          {product.name}
                        </span>
                        <p>{product.description}</p>
                        <p>{formatPrice(product.price)}</p>
                      </div>
                      <Button
                        className="w-full transition-all"
                        variant={isAdding ? "outline" : "default"}
                        onClick={() => {
                          setIsAdding(true);
                          addToCart(product);

                          toast.success(`Added ${product.name} to cart`);

                          setTimeout(() => {
                            setIsAdding(false);
                          }, 1500);
                        }}
                        disabled={isAdding}
                      >
                        {isAdding ? (
                          <>
                            <Check className="mr-2 h-4 w-4" /> Added
                          </>
                        ) : (
                          <>
                            <Plus className="mr-2 h-4 w-4" /> Add to Cart
                          </>
                        )}
                      </Button>
                    </section>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
