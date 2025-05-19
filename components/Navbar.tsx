import { UserButton } from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <header className="relative z-50 w-full flex justify-between items-center py-2 px-4 h-16 bg-gray-200">
      <div className="">Codeforces</div>
      <div className="">
        <UserButton />
      </div>
    </header>
  );
};

export default Navbar;
