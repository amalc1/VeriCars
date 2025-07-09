import AddCarForm from "../_components/AddCarForm";

export const metadata = {
  title: "Add New Car | Vericars Admin",
  description: "Add a new car to the market place",
};

const AddCarPage = () => {
  return (
    <div className="mt-15 px-5">
      <h1 className="text-2xl font-bold mb-6 ">Add New Car</h1>
      <AddCarForm />
    </div>
  );
};

export default AddCarPage;
