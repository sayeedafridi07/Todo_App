import { motion, useDragControls } from 'framer-motion';
import { Grip } from 'lucide-react';
import { useRef, useState } from 'react';

const Card = ({ todo, reference, onClick, isFront, onFocus }) => {
  const { title, description, isCompleted } = todo;

  const controls = useDragControls();
  const cardRef = useRef(null);
  const [wasDragging, setWasDragging] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      drag
      dragListener={false}
      dragControls={controls}
      dragConstraints={reference}
      whileDrag={{ scale: 1.08 }}
      style={{ zIndex: isFront ? 10 : 1 }}
      onDragStart={() => {
        setWasDragging(true);
        onFocus();
      }}
      onDragEnd={() => {
        // small timeout to avoid immediate click trigger
        setTimeout(() => setWasDragging(false), 0);
      }}
      onClick={() => {
        if (!wasDragging) {
          onFocus();
          onClick(todo);
        }
      }}
      className="relative h-72 w-64 cursor-pointer overflow-hidden rounded-3xl bg-white text-zinc-800 dark:bg-zinc-900 dark:text-white px-8 py-10 select-none transition-colors duration-300"
    >
      {/* Drag Handle */}
      <div
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => controls.start(e)}
        className="absolute top-0 right-0 cursor-grab active:cursor-grabbing"
      >
        <Grip className="text-zinc-300 dark:text-zinc-400" />
      </div>

      {/* Title */}
      {title?.trim().length > 0 && (
        <h1 className="mb-4 text-xl leading-tight font-semibold">{title}</h1>
      )}

      {/* Description */}
      <p className="line-clamp-6 text-sm leading-snug text-zinc-500 dark:text-zinc-200">
        {description}
      </p>

      {/* Footer */}
      <div
        className={`absolute inset-x-0 bottom-0 py-4 ${
          isCompleted ? 'bg-green-500' : 'bg-sky-500'
        } text-center text-sm font-semibold`}
      >
        <p>{isCompleted ? 'Completed' : 'Pending'}</p>
      </div>
    </motion.div>
  );
};

export default Card;
