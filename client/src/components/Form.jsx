import React, { useRef } from 'react';
import { Trash2 } from 'lucide-react';

const Form = ({ data, isEditing, setFormData, onDelete }) => {
  const textareaRef = useRef(null);

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Auto resize logic
    if (name === 'description') {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  };

  return (
    <div className="relative w-full min-w-xl overflow-hidden rounded-3xl bg-zinc-900/90 text-white">
      <div className="flex flex-col space-y-4 px-8 py-10">
        <input
          name="title"
          value={data.title}
          onChange={handleOnChange}
          placeholder="Title"
          className="text-2xl leading-tight font-semibold focus:outline-none"
        />
        <textarea
          ref={textareaRef}
          name="description"
          value={data.description}
          onChange={handleOnChange}
          placeholder="Take a note..."
          autoFocus
          className="resize-none overflow-hidden text-lg leading-snug text-zinc-200 focus:outline-none"
        />
      </div>
      {/* foobar */}
      {isEditing && (
        <div className="flex flex-row-reverse items-center justify-between p-4">
          <button
            type="button"
            className="group cursor-pointer rounded-full p-2 hover:bg-zinc-50/20"
            title="Delete"
            onClick={onDelete}
          >
            <Trash2 className="text-zinc-200" />
          </button>

          <button
            type="button"
            className="w-fit cursor-pointer rounded-full bg-green-500 px-4 py-2 font-semibold text-white hover:-translate-y-0.5 hover:bg-green-600 focus:outline-2 focus:outline-offset-2 focus:outline-green-500 active:bg-green-700"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                isCompleted: !prev.isCompleted,
              }))
            }
          >
            {data.isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
          </button>
        </div>
      )}
      {/* {isEditing && (
        <div
          className={`py-4 ${
            data.isCompleted ? 'bg-green-500' : 'bg-sky-500'
          } text-center text-sm font-semibold`}
        >
          <p>{data.isCompleted ? 'Completed' : 'Pending'}</p>
        </div>
      )} */}
    </div>
  );
};

export default Form;
