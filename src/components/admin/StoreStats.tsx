import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/utils/discount';
import { Badge } from '@/components/ui/badge';
import type { StoreStats as StoreStatsType } from '@/types';

interface StoreStatsProps {
  stats: StoreStatsType;
}

export function StoreStats({ stats }: StoreStatsProps) {
  const {
    totalItemsPurchased,
    totalPurchaseAmount,
    usedDiscountCodes,
    totalDiscountAmount
  } = stats;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Items Sold
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M2 12h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalItemsPurchased}</div>
          <p className="text-xs text-muted-foreground">
            Total items purchased
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Revenue
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M2 12h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPrice(totalPurchaseAmount)}</div>
          <p className="text-xs text-muted-foreground">
            Total revenue from all orders
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Discount Codes Used
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M2 12h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usedDiscountCodes.length}</div>
          <p className="text-xs text-muted-foreground">
            Number of discount codes redeemed
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Discounts
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M2 12h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatPrice(totalDiscountAmount)}</div>
          <p className="text-xs text-muted-foreground">
            Total value of all discounts applied
          </p>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Used Discount Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {usedDiscountCodes.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {usedDiscountCodes.map((code, index) => (
                  <Badge key={index} variant="secondary">
                    {code}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No discount codes have been used yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}