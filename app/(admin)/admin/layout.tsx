import { getAdminDetails } from "@/actions/admin";
import Header from "@/components/header/Header";
import { notFound } from "next/navigation";
import React from "react";
import SideBar from "./_components/SideBar";

const AdmiinLayout = async ({ children }: { children: React.ReactNode }) => {
  const admin = await getAdminDetails();

  if (!admin.authorized) {
    return notFound();
  }

  return (
    <div className="h-full relative">
      <Header isAdminPage={true} />
      <div className="flex h-full w-56 flex-col top-20 fixed inset-y-0 z-50">
        <SideBar />
      </div>
      <main className="md:pl-56 pt-[40px] h-full">{children}</main>
    </div>
  );
};

export default AdmiinLayout;
