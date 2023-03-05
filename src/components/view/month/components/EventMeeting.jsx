import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { parseISO, format } from "date-fns";
const EventMeeting = ({ meeting, defaultMeeting, fade }) => {
  const { title, description, start_time, end_time, organizer, location } =
    meeting;

  const modifiedDescription = description;
  const meetingLink = description.match(/(?<=<)[^<>]*(?=>)/g);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.li
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={() => setIsOpen(!isOpen)}
      className={`flex flex-col cursor-pointer px-4 py-2 group rounded-xl mt-2 ${
        !meeting.date || defaultMeeting ? "bg-[#f5f7fb]" : "bg-[#fef4e4]"
      } ${defaultMeeting && "text-sm"}`}
    >
      <div className="flex-auto">
        <p className="text-gray-900">{title}</p>
        <p className="mt-0.5">
          <time>{format(parseISO(start_time), "HH:mm")}</time> -
          <time> {format(parseISO(end_time), "HH:mm")}</time>
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
            {
              <>
                <div
                  dangerouslySetInnerHTML={{ __html: modifiedDescription }}
                />

                <p>
                  <span className="font-bold">Organizer: </span>
                  {organizer}
                </p>

                <p>
                  <span className="font-bold">Location: </span>
                  {location}
                </p>

                <p>
                  <span className="font-bold">Link: </span>
                  {meetingLink ? (
                    <a className=" underline" href={meetingLink}>
                      Join Meeting
                    </a>
                  ) : (
                    "Not Available"
                  )}
                </p>
              </>
            }
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default EventMeeting;
