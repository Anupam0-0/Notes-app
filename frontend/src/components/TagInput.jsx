import React from 'react'


const TagInput = ({ tags, setTags }) => {

    const [inputValue, setInputValue] = React.useState('');
    const handleInput = (e) => {
        setInputValue(e.target.value);
    }
    const addNewTag = () => {
        if (inputValue.trim() !== '') {
            setTags([...tags, inputValue]);
            setInputValue('');
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addNewTag();
        }
    }

    const handleRemoveTag = (index) => {
        setTags(tags.filter((tag, i) => i !== index));
    }

    return (
        <div>
            {tags?.length > 0 && (
                <div className='flex items-center gap-2 flex-wrap mt-2'>
                    {tags.map((tag, index) => (
                        <span key={index} className='text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full mr-2'>
                            # {tag}
                            <button onClick={() => {handleRemoveTag(index)}}>
                                <span className='text-xs font-semibold ml-1'>&#10005;</span>
                            </button>
                        </span>
                    ))}
                </div>
            )}


            <div className='flex items-center gap-4 mt-3'>
                <input
                    type="text"
                    className='text-sm bg-transparent border px-3 py-2 rounded outline-none focus:shadow-sm'
                    placeholder='Add Tags'
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                />
                <button className=' text-blue-600 hover:text-blue-700 font-semibold py-1.5 px-3 border border-blue-400 rounded-md active:shadow-md '
                    onClick={addNewTag}
                >
                    &#43;
                </button>


            </div>
        </div>
    )
}

export default TagInput