import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  isAdminPage?: boolean;
}

const Header: React.FC<HeaderProps> = async ({ isAdminPage = false }) => {
  return (
    <header>
      <nav>
        <Link href={""}>
          <Image
            src={"https://dummyimage.com/200x70/000/fff.png&text=Logo"}
            alt="logo"
            width={200}
            height={70}
            className="h-12 w-auto object-contain"
          />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
