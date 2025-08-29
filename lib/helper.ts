import { Car } from "./types";

// Helper function to serialize car data
export const serializeCarData = (car: Car, wishlisted: boolean = false) => {
  return {
    ...car,
    price: car.price ? parseFloat(car.price.toString()) : 0,
    createdAt: car.createdAt
      ? new Date(car.createdAt).toISOString()
      : undefined,
    updatedAt: car.updatedAt
      ? new Date(car.updatedAt).toISOString()
      : undefined,
    wishlisted: wishlisted,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Fn to convert File to base64
export async function fileToBase64(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return buffer.toString("base64");
}
