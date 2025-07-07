"use server";

import { ensureGuestUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";

export async function getAdminDetails() {
  const guestUser = await ensureGuestUser();

  if (!guestUser?.guestUserId) {
    throw new Error("Unauthorized: Guest user ID is missing.");
  }

  const matchedUser = await db.user.findUnique({    
    where: { guestUserId: guestUser.guestUserId },
  });

  if (!matchedUser || matchedUser.role !== "ADMIN") {
    return {
      authorized: false,
      reason: "User is not an admin",
    };
  }

  return {
    authorized: true,
    user: matchedUser,
  };
}
