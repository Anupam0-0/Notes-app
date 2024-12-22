import React from 'react'
import TagInput from './TagInput'


const AddEditNotes = ({noteData, type, onClose}) => {

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState([]);
  // const [isPinned, setIsPinned] = React.useState(false);
  const [error, setError] = React.useState(null);

  //Add Note
  const addNewNote = async() => {}

  //Edit Note
  const editNote = async() => {}

  const handleAddNote = () => { 
    if(!title || !content){
      setError("Title and Content are required");
      return;
    }

    if(!title){
      setError("Title is required");
      return;
    }
    if(!content){
      setError("Content is required");
      return;
    }
    setError("");
    if(type === "edit"){
      editNote();
    }else {
      addNewNote();
    }
  }

  return (
    <div div className='py-3 bg-slate-50 flex flex-col gap-6 sm:px-2 md:px-4' >

      {/* <button className='' onClick={onClose}>
        <span className='text-xl text-slate-400'>X</span>
      </button> */}

      <div className='flex flex-col gap-2'>
        <label className="input-label  tracking-wide text-lg "> TITLE </label>
        <input
          type="text"
          className='text-sm lg:text-base py-2 px-3 text-slate-950 outline-none rounded-lg focus:shadow-sm placeholder:opacity-80'
          placeholder='Wake up at 6am'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      </div>

      <div className='flex flex-col gap-2'>
        <label className='input-label'>CONTENT</label>
        <textarea
          type='text'
          placeholder='Content...'
          rows={8}
          className='input-field text-sm py-2 px-3 placeholder:opacity-80 text-slate-950 outline-none rounded-md focus:shadow-sm' 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          />
          
      </div>

      <div className='mt-3'>
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags}/>
      </div>

      {error && <div className='text-red-500 text-sm'>{error}</div>}

      <button
        type="button"
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded active:shadow-md"
        onClick={handleAddNote}
      >
        ADD
      </button>


    </div>
  )
}

export default AddEditNotes