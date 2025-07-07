import { db } from "./prisma";

type GuestUserData = {
  guestUserId: string;
  role: string;
};

const ensureGuestUser = async (): Promise<GuestUserData> => {
  if (typeof window === "undefined") {
    return { guestUserId: "1234", role: "USER" }; // SSR fallback
  }

  const localStorageKey = "veriCarsUser";
  const storedData = localStorage.getItem(localStorageKey);
  const parsedUser = storedData ? JSON.parse(storedData) : null;

  if (parsedUser?.guestUserId && parsedUser?.role) {
    return {
      guestUserId: parsedUser.guestUserId,
      role: parsedUser.role,
    };
  }

  const generatedGuestId = "1234"; // TODO: Replace with dynamic ID ...crypto.randomUUID()
  const newUserData = {
    guestUserId: generatedGuestId,
    role: "USER",
  };

  localStorage.setItem(localStorageKey, JSON.stringify(newUserData));
  return newUserData;
};

export const checkUser = async () => {
  const localUser = await ensureGuestUser();
  if (!localUser?.guestUserId) return null;

  try {
    const existingUser = await db.user.findUnique({
      where: {
        guestUserId: localUser.guestUserId,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    const newUser = await db.user.create({
      data: {
        guestUserId: localUser.guestUserId,
        name: "testUser",
        imageUrl: "",
        email: "test@gmail.com",
      },
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("veriCarsUser", JSON.stringify(newUser));
    }

    return newUser;
  } catch (error: any) {
    console.error("Error checking/creating user:", error?.message);
    return null;
  }
};
