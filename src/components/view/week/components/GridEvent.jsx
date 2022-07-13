import { differenceInHours, format } from "date-fns";
import React from "react";
import { gridPosition } from "../../../../utils/Utils";
import { useSharedState } from "../../../../store/Context";
function splitTime(time) {
  const timeArray = time.split(":");
  const hour = parseInt(timeArray[0], 10);
  const minute = parseInt(timeArray[1], 10) || 0;

  return { hour, minute };
}

const GridEvent = ({ id, name, date, startTime, endTime, description }) => {
  const [state, setState] = useSharedState();
  // data formating
  const eventStart = new Date(`${date} ${startTime}`.replace("-", "/"));
  const eventEnd = new Date(`${date} ${endTime}`.replace("-", "/"));

  // actual data
  const duration = differenceInHours(eventEnd, eventStart);
  const day = format(eventStart, "i");

  // styling data
  const { hour, minute } = splitTime(startTime);
  const row = hour + gridPosition.rowStart;
  const offset = `${(minute / 60) * 3}em`;
  const height = duration * 3;

  const selectHandle = () => {
    setState({
      ...state,
      isDetailOpen: true,
      selectedData: {
        name,
        date,
        startTime,
        endTime,
        description,
      },
    });
  };

  return (
    <div
      className="flex text-black md:px-[2px]"
      style={{
        gridColumn: day - 1 + 3,
        gridRow: row - 7,
        height: `calc(${height}em)`,
        width: `calc(100%)`,
        marginTop: offset,
      }}
      onClick={selectHandle}
    >
      <small className="break-all leading-[20px] overflow-hidden text-ellipsis py-1 bg-[#eff6ff] p-1 w-full h-full md:rounded-md">
        {name}
      </small>
    </div>
  );
};

export default GridEvent;
