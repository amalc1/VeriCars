import { getCarById } from "@/actions/car-listing";
import { notFound } from "next/navigation";
import CarDetails from "./_components/CarDetails";

interface CarPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: CarPageProps) {
  const { id } = await params;
  const result = await getCarById(id);

  if (!result.success) {
    return {
      title: "Car Not Found | Vericars",
      description: "The requested car could not be found",
    };
  }

  const car: any = result.data;

  return {
    title: `${car.year} ${car.make} ${car.model} | Vericars`,
    description: car.description.substring(0, 160),
    openGraph: {
      images: car.images?.[0] ? [car.images[0]] : [],
    },
  };
}

const CarPage = async ({ params }: CarPageProps) => {
  const { id } = params;
  const result: any = await getCarById(id);

  // If car not found, show 404
  if (!result.success) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CarDetails car={result.data} testDriveInfo={result.data.testDriveInfo} />
    </div>
  );
};

export default CarPage;
