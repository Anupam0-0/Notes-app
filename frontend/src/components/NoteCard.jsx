import React from "react";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="w-full sm:w-96  border rounded-lg p-4 bg-blue-50 shadow-sm hover:shadow-lg hover:bg-slate-100 transition-all duration-300 ease-in-out">
      <div className=" flex items-center justify-between">
        <div>
          <h6 className="text-sm lg:text-lg font-medium">{title}</h6>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <button className={`icon-btn active:scale-150 cursor-pointer  ${isPinned ? '-rotate-45 scale-125' : 'drop-shadow-md'} transition-all duration-300 ease-in-out`} onClick={onPinNote}> {/*41:20 */}
          📌
        </button>
      </div>
      <p className="text-xs text-slate-600 py-3 "> {content?.slice(0, 60)}</p>


      <div className=" flex flex-col md:flex-row  md:items-center justify-between gap-2 my-2">

        <div className="text-xs  text-slate-500">{tags}</div>

        <div className="flex justify-start gap-2">
          <button className="shadow-md text-xs md:text-sm lg:text-base flex items-center justify-center px-3 py-1   rounded-md bg-blue-50 hover:bg-blue-200 active:scale-95 active:bg-blue-50 " onClick={onEdit}>
            Edit
          </button>
          <button className="shadow-md text-xs md:text-sm lg:text-base flex items-center justify-center px-3 py-1    rounded-md bg-red-50 hover:bg-red-200 active:scale-95 active:bg-blue-50 " onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>




    </div>
  );
};

export default NoteCard;
