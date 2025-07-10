export type Car = {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  transmission: string;
  fuelType: string;
  bodyType: string;
  mileage: number;
  color: string;
  wishlisted: boolean;
  seats?: number;
  description?: string;
  status?: any;
  featured?: boolean;  
};

export type CarCardProps = {
  car: Car;
};
