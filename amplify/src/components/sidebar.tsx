"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
// import Image from "next/image";

export default function Sidebar() {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="w-1/5 flex md:w-1/6 h-screen flex-col items-center justify-between bg-white fixed top-0 border-[2px] border-black ">
      {/* Top Container */}
      <div className="w-full pt-8">
        <div
          className="font-bold text-black text-2xl md:text-4xl w-full flex justify-center pb-3 cursor-pointer hover:text-[#a287e7] transition-[0.5s] "
          onClick={() => router.replace("/")}
        >
          <span className="text-[#000000]">clarify</span>
        </div>
        <div className="flex flex-col mt-5 items-center space-y-2">
          <div
            className="sidebar__item"
            onClick={() => router.replace("/upload")}
          >
            Upload
          </div>
          <div
            className="sidebar__item"
            onClick={() => router.replace("/documents")}
          >
            Your documents
          </div>
          <div className="sidebar__item" onClick={() => router.replace("/")}>
            About
          </div>
        </div>
      </div>

      {/* Bottom Container */}
      <div className="pb-6">
        <div className="flex flex-col items-center space-y-1 mb-5">
          <span className="text-sm text-black font-semibold">
            {"Logged in as " + session?.data?.user?.name!}
          </span>
        </div>
        <div
          className="flex items-center justify-center space-x-2 border-[2px] border-black rounded-md p-1 cursor-pointer hover:bg-[#d3d3d3] transition-[0.5s]"
          onClick={() => signOut()}
        >
          <LogoutIcon className="text-lg text-black" />
          <span className="text-black text-base font-semibold">Logout</span>
        </div>
      </div>
    </div>
  );
}
