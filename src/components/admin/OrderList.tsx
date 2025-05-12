import type { Order } from "@/types";
import { formatPrice } from "@/utils/discount";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrdersListProps {
  orders: Order[];
}

export function OrdersList({ orders }: OrdersListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Final Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs">
                  {order.id.split("-")[1]}
                </TableCell>
                <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  {order.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </TableCell>
                <TableCell>{formatPrice(order.total)}</TableCell>
                <TableCell>
                  {order.discountCode ? (
                    <div className="flex flex-col gap-1">
                      <Badge variant="outline" className="w-fit">
                        {order.discountCode}
                      </Badge>
                      <span className="text-sm text-green-600">
                        -{formatPrice(order.discountAmount)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">None</span>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  {formatPrice(order.finalTotal)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center h-24 text-muted-foreground"
              >
                No orders have been placed yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
