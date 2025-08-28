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
  price: Decimal;
  mileage: number;
  seats?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CarCardProps = {
  car: Car;
};
