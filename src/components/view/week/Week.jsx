import { isSameWeek, parseISO } from "date-fns";
import React from "react";
import GridEvent from "./components/GridEvent";
import GridLabels from "./components/GridLabels";
import GridLines from "./components/GridLines";
import GridTitles from "./components/GridTitles";
import useWidth from "../../../hooks/useWidth";
import { ReactComponent as DocumentIcon } from "../../../assets/icons/document-filled.svg";

const Week = ({ data, state, isLoading }) => {
  const windowWidth = useWidth();
  if (isLoading) {
    return "Loading";
  }
  return (
    <div className="pb-2 sm:px-2 md:px-10">
      <div className="grid sm:border sm:border-gray-100 sm:border-t-0 border-bl-0 sm:rounded-lg overflow-hidden week-cells">
        <span className="row-start-1 col-start-1 bg-gray-100 flex justify-center items-center text-gray-400">
          <DocumentIcon className="w-5 md:w-6" />
        </span>
        <GridLines />
        <GridTitles />
        <GridLabels />

        {data?.map((event) =>
          isSameWeek(parseISO(event.date), state.currentDate) ? (
            <GridEvent
              key={event.id}
              id={event.id}
              name={event.name}
              date={event.date}
              startTime={event.start_time}
              endTime={event.end_time}
              description={event.description}
              windowWidth={windowWidth}
              email={event.email}
            />
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default Week;
