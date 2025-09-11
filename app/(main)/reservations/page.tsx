import { getUserTestDrives } from "@/actions/test-drive";
import ReservationsList from "./_components/ReservationsList";

export const metadata = {
  title: "My Reservations | Vericars",
  description: "Manage your test drive reservations",
};

const ReservationsPage = async () => {
  // Fetch reservations on the server
  const reservationsResult = await getUserTestDrives();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-6xl mb-6 gradient-title">Your Reservations</h1>
      <ReservationsList initialData={reservationsResult} />
    </div>
  );
};

export default ReservationsPage;
