export type Car = {
  id: number;
  make: string;
  model: string;
  images: string[];
  transmission: string;
  fuelType: string;
  bodyType: string;
  color: string;
  wishlisted: boolean;
  description?: string;
  status: "AVAILABLE" | "UNAVAILABLE" | "SOLD";
  featured?: boolean;
  year: number;
  price: number;
  mileage: number;
  seats?: number;
};

export type CarCardProps = {
  car: Car;
};
