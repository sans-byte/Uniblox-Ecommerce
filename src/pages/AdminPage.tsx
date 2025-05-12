import { useStore } from "@/store/useStore";
import { StoreStats } from "@/components/admin/StoreStats";
import { DiscountCodeGenerator } from "@/components/admin/DiscountCodeGenerator";
import { OrdersList } from "@/components/admin/OrdersList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldAlert } from "lucide-react";

export function AdminPage() {
  const { orders, getStoreStats } = useStore();
  const stats = getStoreStats();

  return (
    <div className="container px-4 py-12">
      <div className="flex items-center gap-2 mb-8">
        <ShieldAlert className="h-6 w-6" />
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Store Statistics</h2>
          <StoreStats stats={stats} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <DiscountCodeGenerator />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">
                <strong>Total Orders:</strong> {orders.length}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Last Order:</strong>{" "}
                {orders.length > 0
                  ? new Date(
                      orders[orders.length - 1].createdAt
                    ).toLocaleString()
                  : "No orders yet"}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Active Discount Codes:</strong>{" "}
                {stats.usedDiscountCodes.length}
              </p>
            </div>
          </div>
        </div>

        <div>
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="discounts">Discounts</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="pt-4">
              <OrdersList orders={orders} />
            </TabsContent>
            <TabsContent value="discounts" className="pt-4">
              <p className="text-muted-foreground mb-4">
                View all discount codes, their usage status, and total discount
                amounts.
              </p>
              <p className="text-center py-8 text-muted-foreground">
                This section is under development.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
