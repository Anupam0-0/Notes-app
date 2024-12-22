import { data } from "react-router-dom";
import AddEditNotes from "../components/AddEditNotes";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import Modal from "react-modal";
import { useState } from "react";

const Home = () => {

    const [openAddEdit, setOpenAddEdit] = useState({ isShown: false, type: "add", data: null });

    return (
        <>
            <Navbar />

            {/* card component demo */}
            <div className="container mx-auto px-5 ">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                    <NoteCard
                        title="Note Title"
                        date="12/12/2021"
                        content="This is a sample note"
                        tags="#Meeting" //{["tag1", "tag2"]}
                        isPinned={true}
                        onEdit={() => console.log("Edit")}
                        onDelete={() => console.log("Delete")}
                        onPinNote={() => console.log("Pin Note")}
                    />

                </div>
            </div>

            {/* add button */}
            <button
                className="w-16 h-16 text-4xl font-light text-white flex items-center justify-center rounded-xl bg-blue-500 hover:bg-blue-600 shadow-lg active:scale-105 absolute right-10 bottom-10"
                onClick={() => {
                    setOpenAddEdit({ isShown: true, type: "add", data: null });
                }}>
                &#43;
            </button>

            <Modal
                isOpen={openAddEdit.isShown}
                onRequestClose={() => setOpenAddEdit({ isShown: false, type: "add", data: null })}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)"
                    },
                }}
                contentLabel="Add Note"
                className="w-[88%] sm:w-[80%] md:w-[60%] lg:w-[45%] overflow-auto  max-h-3/4 bg-slate-50 rounded-lg shadow-lg p-5 mx-auto mt-[10vh]  "
            >
                <AddEditNotes
                    type={openAddEdit.type}
                    noteData={openAddEdit.data}
                    onClose={() => {
                        setOpenAddEdit({ isShown: false, type: "add", data: null });
                    }} />
            </Modal>

            {/* AddEditNotes component demo */}



        </>
    )
}

export default Home;
