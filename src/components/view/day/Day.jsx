import React from "react";
import GridLabels from "./components/GridLabels";
import GridEvent from "./components/GridEvent";
import Lines from "./components/Lines";
import { isSameDay, parseISO } from "date-fns";

const Day = ({ data, state, isLoading }) => {
  if (isLoading) {
    return "Loading";
  }
  return (
    <div className="p-3 pt-0 md:pt-0 lg:px-10">
      <div
        className="grid border border-gray-100 border-bl-0 border-t-0 rounded rounded-tr-none rounded-tl-none overflow-hidden"
        style={{
          gridTemplateColumns: "2em repeat(1, minmax(0, 1fr))",
          gridTemplateRows: "3em repeat(14, 3em)",
        }}
      >
        <Lines />
        <GridLabels />

        {data?.map((event) =>
          isSameDay(parseISO(event.date), state.currentDate) ? (
            <GridEvent
              key={event.id}
              id={event.id}
              name={event.name}
              date={event.date}
              startTime={event.start_time}
              endTime={event.end_time}
            />
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default Day;
