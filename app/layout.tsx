import Header from "@/components/header/Header";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./global.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VeriCars",
  description: "Find your dream car with VeriCars",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;  
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Toaster richColors />
        <footer className="bg-blue-50 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>Made with ❤️ by VeriCars</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
