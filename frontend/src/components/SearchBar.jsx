import React from "react";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-2/6 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />

      {value && (
        <button
          onClick={onClearSearch}
          className="text-slate-600 px-2 text-xs md:text-base flex items-center hover:text-slate-900 cursor-pointer"
        >
          &#10005;
        </button>
      )}
      <button
        onClick={handleSearch}
        className="cursor-pointer active:scale-95 "
      >
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
