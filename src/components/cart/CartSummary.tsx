import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/utils/discount";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function CartSummary() {
  const { cart, checkout, validateDiscountCode } = useStore();
  const [discountCode, setDiscountCode] = useState("");
  const [isValidCode, setIsValidCode] = useState(false);
  const [isCheckingCode, setIsCheckingCode] = useState(false);
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Simple shipping calculation - free over $100
  const shipping = subtotal > 100 ? 0 : 5.99;

  // 10% discount if valid code
  const discount = isValidCode ? subtotal * 0.1 : 0;

  // Calculate total
  const total = subtotal + shipping - discount;

  const handleApplyCode = () => {
    if (!discountCode.trim()) {
      toast.error("Please enter a discount code");
      return;
    }

    setIsCheckingCode(true);

    // Simulate API call
    setTimeout(() => {
      const isValid = validateDiscountCode(discountCode.trim());

      setIsValidCode(isValid);
      setIsCheckingCode(false);

      if (isValid) {
        toast.success("Discount code applied!");
      } else {
        toast.error("Invalid or expired discount code");
      }
    }, 600);
  };

  const handleCheckout = () => {
    try {
      const order = checkout(isValidCode ? discountCode : undefined);
      toast.success("Order placed successfully!");
      navigate("/checkout/success", { state: { order } });
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

      <div className="space-y-1.5">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>

        {isValidCode && (
          <div className="flex justify-between text-green-600">
            <span>Discount (10%)</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="grid gap-2">
          <div className="flex gap-2">
            <Input
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="flex-1"
              disabled={isCheckingCode || isValidCode}
            />
            <Button
              variant="outline"
              onClick={handleApplyCode}
              disabled={isCheckingCode || isValidCode || !discountCode.trim()}
            >
              {isCheckingCode ? "Checking..." : "Apply"}
            </Button>
          </div>
          {isValidCode && (
            <p className="text-sm text-green-600">Discount code applied!</p>
          )}
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={handleCheckout}
          disabled={cart.length === 0}
        >
          Checkout
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Taxes calculated at checkout. Free shipping on orders over $100.
        </p>
      </div>
    </div>
  );
}
