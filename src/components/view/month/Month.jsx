import React from "react";
import "./style.css";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useState } from "react";
import { startOfMonth } from "date-fns/esm";
import Meeting from "./components/Meeting";
import { motion } from "framer-motion";
import { fade } from "../../../utils/animations";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Month = ({ data, state, isLoading }) => {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  const currentMonth = format(today, "MMM-yyyy");
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  if (isLoading) {
    return "Loading";
  }
  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(state.currentDate)),
    end: endOfWeek(endOfMonth(state.currentDate)),
  });

  let selectedDayMeetings = data.filter((meeting) =>
    isSameDay(parseISO(meeting.date), selectedDay)
  );

  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="pb-4 sm:px-2 md:px-10"
    >
      <div className="sm:border sm:border-t-0 sm:border-gray-100 rounded-lg">
        <div className="md:grid md:grid-cols-3 md:divide-x md:divide-gray-100">
          <div className=" col-span-2 border border-t-0 border-gray-100 md:border-none">
            <div className="grid grid-cols-7 text-xs leading-6 text-center bg-gray-100 sm:rounded-tl-lg">
              <div className="py-3 border-b border-gray-100">Sun</div>
              <div className="py-3 border-l border-gray-200">Mon</div>
              <div className="py-3 border-l border-gray-200">Tue</div>
              <div className="py-3 border-l border-gray-200">Wed</div>
              <div className="py-3 border-l border-gray-200">Thu</div>
              <div className="py-3 border-l border-gray-200">Fri</div>
              <div className="py-3 border-l border-gray-200">Sat</div>
            </div>

            <div className="grid grid-cols-7 text-sm">
              {days.map((day, dayIdx) => (
                <motion.div
                  variants={fade}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  style={
                    data.some(
                      (meeting) =>
                        isSameDay(parseISO(meeting.date), day) &
                        !meeting.is_repeated
                    )
                      ? {
                          backgroundColor: "#ffffff",
                          opacity: (0.6).toExponential,
                          background:
                            "repeating-linear-gradient(-45deg, rgb(243 244 246), rgb(243 244 246) 10px, rgb(255, 255, 255) 0, rgb(255, 255, 255) 20px)",
                        }
                      : {}
                  }
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],

                    "border-l border-b border-gray-100 dayCell dayCellBottom"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-gray-100",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, state.currentDate) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) && isToday(day) && "bg-primary",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-primary",
                      !isEqual(day, selectedDay) && "hover:bg-gray-200",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex w-full h-full items-center justify-center py-8 lg:py-10 relative"
                    )}
                  >
                    <time
                      className="absolute top-2 left-2 font-medium"
                      dateTime={format(day, "yyyy-MM-dd")}
                    >
                      {format(day, "d")}
                    </time>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
          <section className="pt-8 md:pt-4 px-4 md:border-t md:rounded-tr-lg">
            <h2 className="font-semibold text-gray-900">
              Schedule for{" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "MMM dd, yyy")}
              </time>
            </h2>

            <ol className="mt-4 text-sm leading-6 text-gray-500">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting meeting={meeting} key={meeting.id} fade={fade} />
                ))
              ) : (
                <p>No meetings for today.</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default Month;
