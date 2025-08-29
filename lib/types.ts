import { Decimal } from "./generated/prisma/runtime/library";

export type Car = {
  id: string;
  make: string;
  model: string;
  images: string[];
  transmission: string;
  fuelType: string;
  bodyType: string;
  color: string;
  wishlisted?: boolean;
  description?: string;
  status: "AVAILABLE" | "UNAVAILABLE" | "SOLD";
  featured?: boolean;
  year: number;
  price: number | Decimal;
  mileage: number;
  seats?: number | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export type CarCardProps = {
  car: Car;
};
