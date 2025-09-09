"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Books a test drive for a car
 */

// Types for function input
interface BookTestDriveParams {
  carId: string;
  bookingDate: string | Date;
  startTime: string;
  endTime: string;
  notes?: string;
  userId: string; 
}

// Types for response
interface BookTestDriveResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function bookTestDrive({
  carId,
  bookingDate,
  startTime,
  endTime,
  notes,
  userId,
}: BookTestDriveParams): Promise<BookTestDriveResponse> {
  try {
    // Check if car exists and is available
    const car = await db.car.findUnique({
      where: { id: carId, status: "AVAILABLE" },
    });

    if (!car) {
      throw new Error("Car not available for test drive");
    }

    // Check if slot is already booked
    const existingBooking = await db.testDriveBooking.findFirst({
      where: {
        carId,
        bookingDate: new Date(bookingDate),
        startTime,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    });

    if (existingBooking) {
      throw new Error(
        "This time slot is already booked. Please select another time."
      );
    }

    // Create the booking
    const booking = await db.testDriveBooking.create({
      data: {
        carId,
        userId,
        bookingDate: new Date(bookingDate),
        startTime,
        endTime,
        notes: notes ?? null,
        status: "PENDING",
      },
    });

    // Revalidate relevant paths
    revalidatePath(`/test-drive/${carId}`);
    revalidatePath(`/cars/${carId}`);

    return {
      success: true,
      data: booking,
    };
  } catch (error) {
    console.error("Error booking test drive:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to book test drive",
    };
  }
}
