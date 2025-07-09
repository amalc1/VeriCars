"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CarsList = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

};

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-grow sm:flex-row gap-4 items-start sm:text-center justify-between">
        <Button
          onClick={() => {
            router.push("/admin/cars/create");
          }}
          className="flex items-center"
        >
          <Plus className="h-4 w-4" />
          Add Car
        </Button>

        <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto">
          <div className="flex space-x-1 items-center relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              className="pl-9 w-full sm:w-60"
              type="search"
              placeholder="Search Cars..."
            />
          </div>
        </form>
      </div>

      {/* cars table */}
    </div>
  );
};

export default CarsList;
