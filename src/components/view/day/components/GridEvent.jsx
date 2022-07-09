import { differenceInHours } from "date-fns";
import React from "react";
import { gridPosition } from "../../../../utils/Utils";
import { useSharedState } from "../../../../store/Context";
function splitTime(time) {
  const timeArray = time.split(":");
  const hour = parseInt(timeArray[0], 10);
  const minute = parseInt(timeArray[1], 10) || 0;

  return { hour, minute };
}

const GridEvent = ({ id, name, date, startTime, endTime }) => {
  const [state, setState] = useSharedState();
  // data formating
  const eventStart = new Date(`${date} ${startTime}`.replace("-", "/"));
  const eventEnd = new Date(`${date} ${endTime}`.replace("-", "/"));

  // actual data
  const duration = differenceInHours(eventEnd, eventStart);

  // styling data
  const { hour, minute } = splitTime(startTime);
  const row = hour + gridPosition.rowStart;
  const offset = `${(minute / 60) * 3}em`;
  const height = duration * 3;
  return (
    <div
      className="flex text-black px-[4px]"
      style={{
        gridColumn: 2,
        gridRow: row - 8,
        height: `calc(${height}em)`,
        width: `calc(100%)`,
        marginTop: offset,
      }}
      onClick={() => setState({ ...state, isDetailOpen: true })}
    >
      <small className="break-all text-clip py-1 bg-[#eff6ff] p-1 w-full h-full rounded-md">
        {name}
      </small>
    </div>
  );
};

export default GridEvent;
