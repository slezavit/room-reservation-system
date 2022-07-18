import React from "react";
import GridLabels from "./components/GridLabels";
import GridEvent from "./components/GridEvent";
import Lines from "./components/Lines";
import { isSameDay, parseISO, format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { fade } from "../../../utils/animations";
import useWidth from "../../../hooks/useWidth";
import Loader from "../../common/Loader";
const Day = ({ data, state, isLoading }) => {
  const windowWidth = useWidth();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="sm:px-2 md:px-10"
    >
      <div className="grid border border-x-0 sm:border-x border-gray-100 border-bl-0 border-t-0 sm:rounded-lg rounded-tr-none rounded-tl-none overflow-hidden day-cells">
        <Lines />
        <GridLabels />
        <AnimatePresence exitBeforeEnter>
          {data?.map((event) =>
            event.is_repeated
              ? format(state.currentDate, "eeee") ===
                  format(parseISO(event.date), "eeee") && (
                  <GridEvent
                    fade={fade}
                    key={event.id}
                    id={event.id}
                    name={event.name}
                    date={event.date}
                    startTime={event.start_time}
                    endTime={event.end_time}
                    description={event.description}
                    email={event.email}
                    windowWidth={windowWidth}
                    isRepeated={true}
                  />
                )
              : isSameDay(parseISO(event.date), state.currentDate) && (
                  <GridEvent
                    fade={fade}
                    key={event.id}
                    id={event.id}
                    name={event.name}
                    date={event.date}
                    startTime={event.start_time}
                    endTime={event.end_time}
                    description={event.description}
                    email={event.email}
                    windowWidth={windowWidth}
                    isRepeated={false}
                  />
                )
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Day;
