import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const Meeting = ({ meeting, fade, cohorts, instructors }) => {
  const {
    title,
    start_time,
    end_time,
    description,
    email,
    cohort,
    instructor,
  } = meeting;
  let instructorData =
    instructor && instructors.find((i) => i.id == instructor);
  let cohortData = cohort && cohorts.find((i) => i.id == cohort);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.li
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={() => setIsOpen(!isOpen)}
      className={`flex flex-col cursor-pointer px-4 py-2 group rounded-xl mt-2 ${
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
            {description ? (
              <>
                <p className="">{description}</p>
                <p>
                  <span className="font-bold">Email:</span> {email}
                </p>
              </>
            ) : (
              <>
                <p>
                  <span className="font-bold">Cohort: </span>
                  {cohortData.major} {cohortData.year}
                </p>
                <p>
                  <span className="font-bold">Faculty: </span>{" "}
                  {instructorData.name}
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default Meeting;
