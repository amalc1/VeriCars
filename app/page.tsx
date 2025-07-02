import HomeSearch from "@/components/header/HomeSearch";

export default function Home() {
  return (
    <div className="pt-20 flex flex-col">
      {/* hero */}
      <section className="relative py-16 md:py-28 dotted-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-8xl mb-4 gradient-title">
              Find <span className="text-blue-500">Your Dream Car</span> with
              VeriCars
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Smart AI-powered search and seamless test drives from thousands of
              top-rated vehicles.
            </p>
          </div>
          {/* search */}
          <HomeSearch />
        </div>
      </section>
    </div>
  );
}
