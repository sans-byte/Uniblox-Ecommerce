import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export function DiscountCodeGenerator() {
  const { discountCodes, generateDiscountCode, orders, nthOrder } = useStore();
  const [loading, setLoading] = useState(false);

  const ordersRemaining = nthOrder - (orders.length % nthOrder);
  const canGenerate = (orders.length % nthOrder === 0) && orders.length > 0;
  
  const activeCodes = discountCodes.filter(code => !code.isUsed);

  const handleGenerateCode = () => {
    if (!canGenerate) {
      toast.error(`Cannot generate a code yet. Need ${ordersRemaining} more orders.`);
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newCode = generateDiscountCode();
      setLoading(false);
      
      if (newCode) {
        toast.success(`New discount code generated: ${newCode.code}`);
      }
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Discount Code Generator</CardTitle>
        <CardDescription>
          A new discount code is available every {nthOrder} orders.
          {!canGenerate && ordersRemaining > 0 && ` Need ${ordersRemaining} more orders.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Active Discount Codes</h3>
          <div className="flex flex-wrap gap-2">
            {activeCodes.length > 0 ? (
              activeCodes.map((code) => (
                <Badge key={code.code} variant="secondary" className="font-mono text-xs py-1">
                  {code.code} ({code.percentage}% off)
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No active discount codes available.</p>
            )}
          </div>
        </div>
        
        <Button 
          onClick={handleGenerateCode} 
          disabled={!canGenerate || loading}
          className="w-full"
        >
          {loading ? 'Generating...' : 'Generate Discount Code'}
        </Button>
        
        <div className="text-sm text-muted-foreground">
          <p>Total orders: {orders.length}</p>
          <p>Total discount codes: {discountCodes.length}</p>
          <p>Used discount codes: {discountCodes.filter(code => code.isUsed).length}</p>
        </div>
      </CardContent>
    </Card>
  );
}