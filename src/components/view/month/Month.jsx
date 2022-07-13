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
    <div className="md:border border-gray-100 border-t-0 md:border-t-0 mx-3 lg:mx-10">
      <div className="md:grid md:grid-cols-3 md:divide-x md:divide-gray-100">
        <div className=" col-span-2 border border-t-0 border-gray-100 md:border-none">
          <div className="grid grid-cols-7 text-xs leading-6 text-center text-black ">
            <div className="py-3 border-b border-gray-100">Sun</div>
            <div className="py-3 border-l border-b border-gray-100">Mon</div>
            <div className="py-3 border-l border-b border-gray-100">Tue</div>
            <div className="py-3 border-l border-b border-gray-100">Wed</div>
            <div className="py-3 border-l border-b border-gray-100">Thu</div>
            <div className="py-3 border-l border-b border-gray-100">Fri</div>
            <div className="py-3 border-l border-b border-gray-100">Sat</div>
          </div>
          <div className="grid grid-cols-7 text-sm">
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  data.some((meeting) =>
                    isSameDay(parseISO(meeting.date), day)
                  ) && "bg-gray-100",
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
                      "text-red-500",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-900",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, state.currentDate) &&
                      "text-gray-400",
                    isEqual(day, selectedDay) && isToday(day) && "bg-black",
                    isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
                    !isEqual(day, selectedDay) && "hover:bg-gray-200",
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    "mx-auto flex w-full h-full items-center justify-center py-4 md:py-5"
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>
              </div>
            ))}
          </div>
        </div>
        <section className="pt-8 md:pt-4 md:px-4">
          <h2 className="font-semibold text-gray-900">
            Schedule for{" "}
            <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
              {format(selectedDay, "MMM dd, yyy")}
            </time>
          </h2>
          <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500 pb-4">
            {selectedDayMeetings.length > 0 ? (
              selectedDayMeetings.map((meeting) => (
                <Meeting meeting={meeting} key={meeting.id} />
              ))
            ) : (
              <p>No meetings for today.</p>
            )}
          </ol>
        </section>
      </div>
    </div>
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
