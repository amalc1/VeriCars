import CarsList from "./_components/CarsList";

export const metadata = {
  title: "Cars | Vericars Admin",
  description: "Manage cars in your marketplace",
};

const CarsPage = () => {
  return (
    <div className="mt-15 px-5">
      <h1 className="text-2xl font-bold mb-6 ">Cars Management</h1>
      <CarsList />
    </div>
  );
};

export default CarsPage;
