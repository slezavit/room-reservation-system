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

const GridEvent = ({
  id,
  name,
  date,
  startTime,
  endTime,
  description,
  windowWidth,
  email
}) => {
  const [state, setState] = useSharedState();
  let eventHeight = windowWidth < 640 ? 3 : 5;

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
  const height = duration * eventHeight;

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
        email,
      },
    });
  };

  return (
    <div
      className="flex text-black sm:px-[3px] md:px-[5px] lg:px-[7px]"
      style={{
        gridColumn: day - 1 + 3,
        gridRow: row - 7,
        height: `calc(${height}em)`,
        width: `calc(100%)`,
        marginTop: offset,
      }}
      onClick={selectHandle}
    >
      <small className="break-all leading-[20px] overflow-hidden text-ellipsis py-1 md:p-2 md:font-medium text-xs md:text-sm bg-[#f0f3fd] cursor-pointer border sm:border-[2px] md:border-[3px] border-[#afb7e1] p-1 w-full h-full sm:rounded-md">
        <span className="hidden md:block md:text-[10px] lg:text-xs text-gray-400">
          {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
        </span>
        <span className="text-[#0552C5]">{name}</span>
      </small>
    </div>
  );
};

export default GridEvent;
