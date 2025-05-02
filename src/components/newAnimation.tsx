import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react"; // or any check icon you prefer
import { useState, useEffect } from "react";

export default function SlideText() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((prev) => !prev);
    }, 3000); // Toggle every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center overflow-hidden w-40 h-10 bg-gray-100 ">
      <div className="relative w-full">
        <AnimatePresence>
          {showText && (
            <motion.span
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "10%", opacity: 1 }}
              exit={{ x: "150%", opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 font-medium text-gray-800"
            >
              Update now
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <Check className="text-green-500 z-10 border bg-black" size={24} />
    </div>
  );
}
