"use client";
import { processImageSearch } from "@/actions/home";
import useFetch from "@/hooks/useFetch";
import { Camera, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const HomeSearch = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchImage, setSearchImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Use the useFetch hook for image processing
  const {
    loading: isProcessing,
    fn: processImageFn,
    data: processResult,
    error: processError,
  } = useFetch(processImageSearch);

  useEffect(() => {
    if (processError) {
      toast.error(
        "Failed to analyze image: " + (processError.message || "Unknown error")
      );
    }
  }, [processError]);

  const onDrop = (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    // Do something with the files
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5 MB");
        return;
      }

      setIsUploading(true);
      setSearchImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
        setIsUploading(false);
        toast.success("Image uploaded successfully");
      };

      reader.onerror = () => {
        setIsUploading(false);
        toast.error("Failed to read the image");
      };

      reader.readAsDataURL(file);
    }
  };
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      maxFiles: 1,
    });

  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleImageSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchImage) {
      toast.error("Please upload an image first");
      return;
    }
    // Use the processImageFn from useFetch hook
    await processImageFn(searchImage);
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

      {isImageSearchActive && (
        <div className="mt-4">
          <form onSubmit={handleImageSearch}>
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center">
              {imagePreview ? (
                <div className="">
                  <img
                    src={imagePreview}
                    alt="car preview"
                    className="h-30 object-contain mb-4 mx-auto"
                  />

                  <Button
                    variant={"outline"}
                    onClick={() => {
                      setSearchImage(null);
                      setImagePreview(null);
                      toast.info("Image removed");
                    }}
                    className="mb-2"
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div {...getRootProps()} className="cursor-pointer">
                  <input {...getInputProps()} />
                  <Upload className="h-12 w-12 text-gray-400 mb-2 mx-auto" />
                  <p className="text-gray-400">
                    {isDragActive && !isDragReject
                      ? "Leave the file here to upload"
                      : "Drag and drop a car image or click to select"}
                  </p>
                </div>
              )}
              {isDragReject && (
                <p className="text-red-500 mb-2 ">Invalid image type</p>
              )}
              <p className="text-gray-400 text-sm">
                Supports: JPG, PNG, WEBP (max 5MB)
              </p>
            </div>

            {imagePreview && (
              <Button
                type="submit"
                className="w-full mt-2 cursor-pointer"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Search with this Image"}
              </Button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default HomeSearch;
