import React from "react";
import { getInitials } from "../utils/helper";

const ProfileCard = ({ onLogout }) => {
  return (
    <div className="flex  items-center  gap-4">
      <div className="sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100  ">
       {getInitials("John William")}
      </div>
      <div className="">
        <p className="text-xs ms:text-sm font-medium">John William</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
