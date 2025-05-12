import { formatPrice } from "@/utils/discount";
import type { Order } from "@/types";

interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

      <div className="divide-y">
        <div className="pb-4">
          <h4 className="font-medium mb-2">Items</h4>
          <ul className="space-y-3">
            {order.items.map((item) => (
              <li
                key={item.product.id}
                className="flex justify-between text-sm"
              >
                <span className="flex-1">
                  {item.product.name}{" "}
                  <span className="text-muted-foreground">
                    x{item.quantity}
                  </span>
                </span>
                <span className="font-medium">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="py-4 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(order.total)}</span>
          </div>

          {order.discountCode && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({order.discountCode})</span>
              <span>-{formatPrice(order.discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(order.finalTotal)}</span>
          </div>
        </div>

        <div className="pt-4 text-sm">
          <p className="text-muted-foreground mb-1">
            Order ID: <span className="font-mono">{order.id}</span>
          </p>
          <p className="text-muted-foreground">
            Date: {order.createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
