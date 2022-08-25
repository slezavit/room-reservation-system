import { isSameWeek, parseISO, isSameISOWeek } from "date-fns";
import React from "react";
import GridEvent from "./components/GridEvent";
import GridLabels from "./components/GridLabels";
import GridLines from "./components/GridLines";
import GridTitles from "./components/GridTitles";
import useWidth from "../../../hooks/useWidth";
import { ReactComponent as DocumentIcon } from "../../../assets/icons/document-filled.svg";
import { fade } from "../../../utils/animations";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../common/Loader";
import { useSwipeable } from "react-swipeable";
import { addWeeks } from "date-fns";
const Week = ({ lectures, events, state, isLoading, setState }) => {
  const windowWidth = useWidth();
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setState({
        ...state,
        currentDate: addWeeks(state.currentDate, 1),
      });
    },
    onSwipedRight: () => {
      setState({
        ...state,
        currentDate: addWeeks(state.currentDate, -1),
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
      className="pb-2 sm:px-2 md:px-10"
      {...handlers}
    >
      <div className="grid sm:border sm:border-gray-100 sm:border-t-0 border-bl-0 sm:rounded-lg overflow-hidden week-cells">
        <span className="row-start-1 col-start-1 bg-gray-100 flex justify-center items-center text-gray-400">
          <DocumentIcon className="w-5 md:w-6" />
        </span>
        <GridLines />
        <GridTitles />
        <GridLabels />

        <AnimatePresence>
          {/* {data?.map((event) =>
            event.type === "class" ? (
              <GridEvent
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                startTime={event.start_time}
                endTime={event.end_time}
                description={event.description}
                windowWidth={windowWidth}
                email={event.email}
                fade={fade}
                isRepeated={true}
              />
            ) : (
              isSameISOWeek(parseISO(event.date), state.currentDate) && (
                <GridEvent
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  startTime={event.start_time}
                  endTime={event.end_time}
                  description={event.description}
                  windowWidth={windowWidth}
                  email={event.email}
                  fade={fade}
                  isRepeated={false}
                />
              )
            )
          )} */}
          {lectures?.map((lecture) => (
            <GridEvent
              key={lecture.id}
              id={lecture.id}
              title={lecture.title}
              day={lecture.day}
              startTime={lecture.start_time}
              endTime={lecture.end_time}
              windowWidth={windowWidth}
              email={lecture.email}
              fade={fade}
              isRepeated={true}
            />
          ))}

          {events?.map(
            (event) =>
              isSameISOWeek(parseISO(event.date), state.currentDate) && (
                <GridEvent
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  startTime={event.start_time}
                  endTime={event.end_time}
                  description={event.description}
                  windowWidth={windowWidth}
                  email={event.email}
                  fade={fade}
                  isRepeated={false}
                />
              )
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Week;
