import { motion, useDragControls } from 'framer-motion';
import { Grip } from 'lucide-react';
import { useRef, useState } from 'react';

const Card = ({ todo, reference, onClick }) => {
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
      onDragStart={() => setWasDragging(true)}
      onDragEnd={() => {
        // small timeout to avoid immediate click trigger
        setTimeout(() => setWasDragging(false), 0);
      }}
      onClick={() => {
        if (!wasDragging) {
          onClick(todo);
        }
      }}
      className="relative h-72 w-64 cursor-pointer overflow-hidden rounded-3xl bg-zinc-900/90 px-8 py-10 text-white select-none"
    >
      {/* Drag Handle */}
      <div
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => controls.start(e)}
        className="absolute top-1 left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing"
      >
        <Grip className="text-zinc-400" />
      </div>

      {/* Title */}
      {title?.trim().length > 0 && (
        <h1 className="mb-4 text-xl leading-tight font-semibold">{title}</h1>
      )}

      {/* Description */}
      <p className="line-clamp-6 text-sm leading-snug text-zinc-200">
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
