import { checkUser } from "@/lib/checkUser";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

interface HeaderProps {
  isAdminPage?: boolean;
}

const Header: React.FC<HeaderProps> = async ({ isAdminPage = false }) => {
  const user = await checkUser();
  const isAdmin = user?.role === "ADMIN";
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b ">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={isAdminPage ? "/admin" : "/"}>
          <Image
            src={"https://dummyimage.com/200x70/000/fff.png&text=Logo"}
            alt="logo"
            width={200}
            height={70}
            className="h-12 w-auto object-contain"
          />

          {isAdminPage && (
            <span className="text-xs font-extralight">admin</span>
          )}
        </Link>

        <div className="flex items-center space-x-2">
          {isAdminPage ? (
            <Link href={"/"}>
              <Button variant={"outline"}>
                <ArrowLeft size={18} />
                <span>Back To App</span>
              </Button>
            </Link>
          ) : (
            <>
              <Link href={"/saved-cars"}>
                <Button>
                  <CarFront size={18} />
                  <span className="hidden md:inline ">Saved Cars</span>
                </Button>
              </Link>
              {!isAdmin ? (
                <Link href={"/reservations"}>
                  <Button variant={"outline"}>
                    <Heart size={18} />
                    <span className="hidden md:inline ">My Reservations</span>
                  </Button>
                </Link>
              ) : (
                <Link href={"/admin"}>
                  <Button variant={"outline"}>
                    <Layout size={18} />
                    <span className="hidden md:inline ">Admin Portal</span>
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
