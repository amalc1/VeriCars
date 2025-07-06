"use client";
import { Camera } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const HomeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);
  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleTextSubmit}>
        <div className="relative flex items-center">
          <Input
            type="text"
            value={searchTerm}
            placeholder="Enter make, model, or use AI search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-12 py-6 w-full  rounded-full border-gray-300 bg-white/95 backdrop-blur-md"
          />

          <div className="absolute right-[90px] top-1/2 transform -translate-y-1/2">
            <Camera
              size={35}
              onClick={() => setIsImageSearchActive(!isImageSearchActive)}
              className="cursor-pointer rounded-xl  px-1.5"
              style={{
                backgroundColor: isImageSearchActive ? "black" : "",
                color: isImageSearchActive ? "white" : "",
                transition: "background-color 0.3s ease",
              }}
            />
          </div>
          <Button
            type="submit"
            className="absolute right-2 rounded-full cursor-pointer"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HomeSearch;
