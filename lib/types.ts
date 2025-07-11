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
  year: string;
  price: string;
  mileage: string;
  seats?: string;
};

export type CarCardProps = {
  car: Car;
};
