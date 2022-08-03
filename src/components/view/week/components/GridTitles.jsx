import React from "react";
import GridDay from "./GridDay";
import {
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
  endOfISOWeek,
  startOfISOWeek,
} from "date-fns";
import { useSharedState } from "../../../../store/Context";

const GridTitles = () => {
  const [state] = useSharedState();
  let weekRange = eachDayOfInterval({
    start: startOfISOWeek(state.currentDate),
    end: endOfISOWeek(state.currentDate),
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
