"use server";
import { serializeCarData } from "@/lib/helper";
import { db } from "@/lib/prisma";

/**
 * Get featured cars for the homepage
 */
export async function getFeaturedCars(limit = 3) {
  try {
    const cars = await db.car.findMany({
      where: {
        featured: true,
        status: "AVAILABLE",
      },
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return cars.map((car) => serializeCarData(car));
  } catch (error: any) {
    throw new Error("Error fetching featured cars:" + error.message);
  }
}
