import React from "react";
import { days } from "../../../../utils/Utils";
import GridDay from "./GridDay";
import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import { useSharedState } from "../../../../store/Context";

const GridTitles = () => {
  const [state] = useSharedState();
  let weekRange = eachDayOfInterval({
    start: startOfWeek(state.currentDate),
    end: endOfWeek(state.currentDate),
  });
  // console.log(x);

  return (
    <>
      {weekRange.map((day, idx) => (
        <GridDay key={idx} day={day} id={idx + 1} />
      ))}
    </>
  );
};

export default GridTitles;
