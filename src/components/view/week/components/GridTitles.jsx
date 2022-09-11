import React from "react";
import GridDay from "./GridDay";
import { eachDayOfInterval, endOfISOWeek, startOfISOWeek } from "date-fns";
import { useSharedState } from "../../../../store/Context";

const GridTitles = ({ pathName }) => {
  const [state] = useSharedState();
  let weekRange = eachDayOfInterval({
    start: startOfISOWeek(state.currentDate),
    end: endOfISOWeek(state.currentDate),
  });
  // console.log(x);

  return (
    <>
      {weekRange.map((day, idx) => (
        <GridDay pathName={pathName} key={idx} day={day} id={idx + 1} />
      ))}
    </>
  );
};

export default GridTitles;
