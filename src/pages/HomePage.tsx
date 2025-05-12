import {
  CustomerCare,
  EastReturn,
  FastDelivery,
  PremuimQuality,
} from "@/assets/svg";
import { HomePageCarousel } from "@/components/layout/HomePageCarousel";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type Prop = {};

export const HomePage: React.FC<Prop> = ({}) => {
  return (
    <>
      <div className="container px-4 py-12 sm:py-16 md:py-24 mx-auto">
        <HomePageCarousel />
        <section className="py-12 md:py-20">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Shop the Latest Products
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Discover our curated collection of premium products for your
                everyday needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                <img
                  src="https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Featured products showcase"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Featured Products
            </h2>
            <Link
              to="/shop"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          {/* <ProductGrid products={featuredProducts} /> */}
        </section>

        {/* Features section */}
        <section className="py-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="rounded-full bg-primary/10 p-3">
                <FastDelivery />
              </div>
              <h3 className="text-lg font-medium">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Get your order delivered quickly and efficiently to your
                doorstep.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="rounded-full bg-primary/10 p-3">
                <PremuimQuality />
              </div>
              <h3 className="text-lg font-medium">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                We only source the highest quality products for our customers.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="rounded-full bg-primary/10 p-3">
                <CustomerCare />
              </div>
              <h3 className="text-lg font-medium">Customer Care</h3>
              <p className="text-sm text-muted-foreground">
                Dedicated support team available to assist you with any
                questions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="rounded-full bg-primary/10 p-3">
                <EastReturn />
              </div>
              <h3 className="text-lg font-medium">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">
                Hassle-free return policy with a 30-day money-back guarantee.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12">
          <div className="rounded-xl bg-muted/50 py-12 px-6 md:px-12">
            <div className="flex flex-col items-center text-center max-w-md mx-auto space-y-4">
              <h2 className="text-2xl font-bold">Join Our Newsletter</h2>
              <p className="text-muted-foreground">
                Subscribe to get updates on new products, special offers, and
                more.
              </p>
              <div className="w-full flex items-center gap-2">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 h-10 rounded-md border border-input bg-background"
                  />
                </div>
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
