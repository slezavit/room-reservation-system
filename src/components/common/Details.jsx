import React from "react";
import { useSharedState } from "../../store/Context";

import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
const Details = () => {
  const [state, setState] = useSharedState();
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

      <div className="w-[90vw] h-[80vh] shadow-lg md:w-[600px] rounded-xl overflow-hidden bg-white origin-center absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-primary text-white px-4 py-5">
          <h3>{state.selectedData.title}</h3>
          <div className="text-sm text-gray-200 mt-2">
            <span>
              {format(parseISO(state.selectedData.date), "EEEE, MMM do,")}
            </span>
            <span> {state.selectedData.startTime.slice(0, 5)}</span>
            <span> - {state.selectedData.endTime.slice(0, 5)}</span>
          </div>
        </div>
        <div className="px-4 py-5">
          <h3>Description</h3>
          <p className="text-sm text-gray-400">
            {state.selectedData.description}
          </p>
          <h3 className="mt-4">Author</h3>
          <p className="text-sm text-gray-400 mt-2">
            {state.selectedData.email}
          </p>
        </div>
        <div className="absolute w-full bottom-0 0 py-2 px-3 text-right border-t border-gray-100">
          <button
            onClick={() => setState({ ...state, isDetailOpen: false })}
            className="border border-gray-300 px-4 py-1 rounded-lg duration-300 hover:bg-gray-100 "
          >
            Close
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Details;
