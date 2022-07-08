import { format, isSameDay, isToday, parseISO } from "date-fns";
import React from "react";
import { gridPosition } from "../../../../utils/Utils";

const dictionary = {
  1: "Sun",
  2: "Mon",
  3: "Tue",
  4: "Wed",
  5: "Thu",
  6: "Fri",
  7: "Sat",
};
const GridDay = ({ day, id }) => {
  const title = dictionary[id];

  if (!title) return null;

  return (
    <div
      className={`flex items-center justify-center ${
        isToday(day) ? "bg-black text-white" : ""
      }`}
      style={{ gridRow: 1, gridColumn: id + gridPosition.columnStart }}
    >
      <small className="flex justify-center items-center flex-col font-light text-[10px] md:text-xs">
        {title} <span>{format(day, "d")}</span>
      </small>
    </div>
  );
};

export default GridDay;
