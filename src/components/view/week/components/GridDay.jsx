import { format, isToday } from "date-fns";
import React from "react";
import { gridPosition } from "../../../../utils/Utils";
import { useSharedState } from "../../../../store/Context";

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
  const [state, setState] = useSharedState();
  const title = dictionary[id];

  if (!title) return null;

  const dayRedirect = (e) => {
    setState({ ...state, currentDate: e, currentView: "day" });
  };

  return (
    <div
      onClick={() => dayRedirect(day)}
      className={`flex items-center justify-center border-l border-gray-200 cursor-pointer ${
        isToday(day) ? "bg-gray-300" : "bg-gray-100 text-gray-400"
      }`}
      style={{ gridRow: 1, gridColumn: id + gridPosition.columnStart }}
    >
      <small className="flex justify-center items-center flex-col text-[10px] md:text-xs">
        {title} <span>{format(day, "d")}</span>
      </small>
    </div>
  );
};

export default GridDay;
