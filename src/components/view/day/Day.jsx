import React from "react";
import GridLabels from "./components/GridLabels";
import GridEvent from "./components/GridEvent";
import Lines from "./components/Lines";
import { isSameDay, parseISO, format, addDays } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { fade } from "../../../utils/animations";
import useWidth from "../../../hooks/useWidth";
import Loader from "../../common/Loader";
import { useSwipeable } from "react-swipeable";
const Day = ({ lectures, events, data, state, setState, isLoading }) => {
  const windowWidth = useWidth();
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setState({
        ...state,
        currentDate: addDays(state.currentDate, 1),
      });
    },
    onSwipedRight: () => {
      setState({
        ...state,
        currentDate: addDays(state.currentDate, -1),
      });
    },
  });
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
      {...handlers}
    >
      <div className="grid border border-x-0 sm:border-x border-gray-100 border-bl-0 border-t-0 sm:rounded-lg rounded-tr-none rounded-tl-none overflow-hidden day-cells">
        <Lines />
        <GridLabels />
        <AnimatePresence exitBeforeEnter>
          {lectures.map(
            (event) =>
              format(state.currentDate, "e") - 1 === Number(event.day) && (
                <GridEvent
                  fade={fade}
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  day={event.day}
                  startTime={event.start_time}
                  endTime={event.end_time}
                  description={event.description}
                  email={event.email}
                  windowWidth={windowWidth}
                  cohort={event.cohort}
                  instructor={event.instructor}
                  isRepeated={true}
                  room={event.room}
                />
              )
          )}

          {events.map(
            (event) =>
              isSameDay(parseISO(event.date), state.currentDate) && (
                <GridEvent
                  fade={fade}
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  startTime={event.start_time}
                  endTime={event.end_time}
                  description={event.description}
                  email={event.email}
                  windowWidth={windowWidth}
                  isRepeated={false}
                  room={event.room}
                />
              )
          )}

          {/* {data?.map((event) =>
            event.type === "class"
              ? format(state.currentDate, "eeee") ===
                  format(parseISO(event.date), "eeee") && (
                  <GridEvent
                    fade={fade}
                    key={event.id}
                    id={event.id}
                    title={event.title}
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
                    title={event.title}
                    date={event.date}
                    startTime={event.start_time}
                    endTime={event.end_time}
                    description={event.description}
                    email={event.email}
                    windowWidth={windowWidth}
                    isRepeated={false}
                  />
                )
          )} */}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Day;
