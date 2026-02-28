import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-4 w-4 rounded-full bg-sky-500"
          animate={{ y: ["0%", "-50%", "0%"] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default Loader;