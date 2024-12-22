import React from "react";
import ProfileInfo from "./ProfileCard";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Navbar = () => {
  const [SearchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };
  
  const handleSearch = () => {
    console.log(SearchQuery);
  };

    const onClearSearch = () => {
    setSearchQuery("");
    }

  return (
    <div>
      <div className="bg-slate-50 flex items-center justify-between px-6 md:px-12 lg:px-24 py-3 ">
        <h2 className="text-xl lg:text-2xl font-medium text-black py-2">Notes </h2>

        <SearchBar value={SearchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
        />
        <ProfileInfo onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Navbar;
