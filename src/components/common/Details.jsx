import React from "react";
import { useSharedState } from "../../store/Context";

import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
const Details = ({ instructors, cohorts }) => {
  const [state, setState] = useSharedState();
  let instructor =
    state.selectedData.instructor &&
    instructors.find((i) => i.id == state.selectedData.instructor);
  let cohort =
    state.selectedData.cohort &&
    cohorts.find((i) => i.id == state.selectedData.cohort);

  if (!state.selectedData) {
    return "No details for this event";
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0 }}
      className="w-full h-full z-30 fixed top-0 left-0 bg-transparent"
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-primary opacity-40"
        onClick={() => setState({ ...state, isDetailOpen: false })}
      />

      <div className="w-[90vw] shadow-lg md:w-[600px] rounded-xl overflow-hidden bg-white origin-center absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-primary text-white px-4 py-5">
          <h3>{state.selectedData.title}</h3>
          <div className="text-sm text-gray-200 mt-2">
            {state.selectedData.date &&
              format(parseISO(state.selectedData.date), "EEEE, MMM do,")}

            <span> {state.selectedData.startTime.slice(0, 5)}</span>
            <span> - {state.selectedData.endTime.slice(0, 5)}</span>
          </div>
        </div>
        {state.selectedData.description ? (
          <div className="px-4 py-5">
            <h3>Description:</h3>
            <p className="text-sm text-gray-400 break-words">
              {state.selectedData.description}
            </p>
            {state.selectedData.email && (
              <>
                <h3 className="mt-4">Organizer:</h3>
                <p className="text-sm text-gray-400 mt-2 break-words">
                  {state.selectedData.email}
                </p>
                <h3 className="mt-4">Room:</h3>
                <p className="text-sm text-gray-400 break-words">
                  {state.selectedData.room}
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="px-4 py-5">
            <h3>Cohort:</h3>
            <p className="text-sm text-gray-400 break-words">
              {cohort.year === 1999
                ? "All cohorts"
                : cohort.major + " " + cohort.year}
            </p>
            <h3 className="mt-4">Faculty:</h3>
            <p className="text-sm text-gray-400 break-words">
              {instructor.name}
            </p>
            <h3 className="mt-4">Room:</h3>
            <p className="text-sm text-gray-400 break-words">
              {state.selectedData.room === 0
                ? "Online"
                : state.selectedData.room}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Details;
