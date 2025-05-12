export function generateDiscountCode(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  // First part - 3 letters
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * 26)); // Only letters
  }

  result += "-";

  // Second part - 3 digits
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * 10) + 26); // Only digits
  }

  result += "-";

  // Third part - 4 alphanumeric
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export function calculateDiscountAmount(
  amount: number,
  percentage: number
): number {
  return (amount * percentage) / 100;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(price);
}
