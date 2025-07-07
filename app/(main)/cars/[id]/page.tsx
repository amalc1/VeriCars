interface CarPageProps {
  params: {
    id: string;
  };
}

const CarPage = async ({ params }: CarPageProps) => {
  const { id } = params;
  return <div>CarPage {id}</div>;
};

export default CarPage;
