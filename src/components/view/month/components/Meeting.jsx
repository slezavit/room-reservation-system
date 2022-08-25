import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const Meeting = ({ meeting, fade }) => {
  const { title, start_time, end_time, description, email } = meeting;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.li
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={description ? () => setIsOpen(!isOpen) : null}
      className={`flex flex-col ${
        description && "cursor-pointer"
      } px-4 py-2 group rounded-xl mt-2 ${
        meeting.date ? "bg-[#fef4e4]" : "bg-[#f5f7fb]"
      }`}
    >
      <div className="flex-auto">
        <p className="text-gray-900">{title}</p>
        <p className="mt-0.5">
          <time>{start_time.slice(0, 5)}</time> -
          <time> {end_time.slice(0, 5)}</time>
        </p>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="1"
            initial={{ height: 0 }}
            animate={{
              height: "auto",
            }}
            transition={{
              duration: 0.5,
              ease: "circOut",
            }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <p className="">{description}</p>
            <p>
              <span className="font-bold">Email:</span> {email}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default Meeting;
