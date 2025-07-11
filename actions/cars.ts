"use server";
import { db } from "@/lib/prisma";
import { createClient } from "@/lib/subabase";
import { Car } from "@/lib/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

// Fn to convert File to base64
async function fileToBase64(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return buffer.toString("base64");
}

export async function processCarImageWithAI(file: File) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini Api key is not configured");
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const base64Image = await fileToBase64(file);
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: file.type,
      },
    };

    // prompt for car detail extraction
    const prompt = `
      Analyze this car image and extract the following information:
      1. Make (manufacturer)
      2. Model
      3. Year (approximately)
      4. Color
      5. Body type (SUV, Sedan, Hatchback, etc.)
      6. Mileage
      7. Fuel type (your best guess)
      8. Transmission type (your best guess)
      9. Price (your best guess)
      9. Short Description as to be added to a car listing

      Format your response as a clean JSON object with these fields:
      {
        "make": "",
        "model": "",
        "year": 0000,
        "color": "",
        "price": "",
        "mileage": "",
        "bodyType": "",
        "fuelType": "",
        "transmission": "",
        "description": "",
        "confidence": 0.0
      }

      For confidence, provide a value between 0 and 1 representing how confident you are in your overall identification.
      Only respond with the JSON object, nothing else.
    `;

    const result = await model.generateContent([imagePart, prompt]);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    // parse json
    try {
      const carDetails = JSON.parse(cleanedText);
      const requiredFields = [
        "make",
        "model",
        "year",
        "color",
        "bodyType",
        "price",
        "mileage",
        "fuelType",
        "transmission",
        "description",
        "confidence",
      ];
      const missingFields = requiredFields.filter(
        (field) => !(field in carDetails)
      );

      if (missingFields.length > 0) {
        throw new Error(
          `AI response missing required fields: ${missingFields.join(", ")}`
        );
      }

      // Return success res
      return {
        success: true,
        data: carDetails,
      };
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.log("Raw response:", text);
      return {
        success: false,
        error: "Failed to parse AI response",
      };
    }
  } catch (error: any) {
    throw new Error("Gemini API error:" + error.message);
  }
}

type AddCarParams = {
  carData: Car;
  images: string[];
};

export async function addCar({
  carData,
  images,
}: AddCarParams): Promise<{ success: boolean }> {
  try {
    const user = await db.user.findUnique({
      where: { guestUserId: "1234" },
    });
    if (!user) throw new Error("User not found");

    const carId = uuidv4();
    const folderPath = `cars/${carId}`;

    // const cookieStore = await cookies();
    const supabase = createClient();
    const imgUrls = [];
    for (let i = 0; i < images.length; i++) {
      const base64Data = images[i];
      // skip if img data not valid
      if (!base64Data || !base64Data.startsWith("data:image/")) {
        console.warn("Skipping invalid image data");
        continue;
      }
      // extract base64 part (remove the data:image/xyz;base64, prefix)
      const base64 = base64Data.split(",")[1];
      const imageBuffer = Buffer.from(base64, "base64");
      // get file ext from the data url
      const mimeMatch = base64Data.match(/data:image\/([a-zA-Z0-9]+);/);
      const fileExt = mimeMatch ? mimeMatch[1] : "jpeg";
      // create file name
      const fileName = `image-${Date.now()}-${i}.${fileExt} `;
      const filePath = `${folderPath}/${fileName}`;

      const { data, error } = await supabase.storage
        .from("car-images")
        .upload(filePath, imageBuffer, {
          contentType: `image/${fileExt}`,
        });
      if (error) {
        console.error("Error uploading image:", error);
        throw new Error(`Failed to upload image: ${error.message}`);
      }

      const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/car-images/${filePath}`;
      imgUrls.push(publicUrl);
    }

    if (imgUrls.length === 0) {
      throw new Error("No valid images were uploaded.");
    }
    // Add car to database
    const car = await db.car.create({
      data: {
        id: carId, // Use same ID  used for  folder
        make: carData.make,
        model: carData.model,
        year: carData.year,
        price: carData.price,
        mileage: carData.mileage,
        color: carData.color,
        fuelType: carData.fuelType,
        transmission: carData.transmission,
        bodyType: carData.bodyType,
        seats: carData.seats,
        description: carData.description ?? "",
        status: carData.status,
        featured: carData.featured,
        images: imgUrls, // Store the array of image URLs
      },
    });

    revalidatePath("/admin/cars");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error adding car:", error);
    return { success: false };
  }
}
