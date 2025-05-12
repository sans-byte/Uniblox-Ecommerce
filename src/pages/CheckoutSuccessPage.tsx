import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import type { Order } from "@/types";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { OrderSummary } from "@/components/checkout/OrderSummary";

export function CheckoutSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get order from location state
  const order = location.state?.order as Order | undefined;

  // If no order is passed, redirect to home
  useEffect(() => {
    if (!order) {
      navigate("/");
    }
  }, [order, navigate]);

  // If no order, don't render anything (will redirect)
  if (!order) {
    return null;
  }

  return (
    <div className="container px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground mt-2">
            Thank you for your purchase. Your order has been received and is
            being processed.
          </p>
        </div>

        <OrderSummary order={order} />

        <div className="mt-8 space-y-4">
          <div className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
            <h3 className="font-semibold text-lg">What's Next?</h3>
            <p className="text-sm text-muted-foreground">
              You'll receive an email confirmation with your order details
              shortly. We'll notify you when your order has shipped.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" asChild className="flex-1">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
