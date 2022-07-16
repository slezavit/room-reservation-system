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

const GridEvent = ({
  id,
  name,
  date,
  startTime,
  endTime,
  description,
  email,
}) => {
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
      className="flex text-black pl-4 pr-2"
      style={{
        gridColumn: 2,
        gridRow: row - 8,
        height: `calc(${height}em)`,
        width: `calc(100%)`,
        marginTop: offset,
      }}
      onClick={selectHandle}
    >
      <small className="break-all leading-[18px] overflow-hidden text-ellipsis py-1 md:p-2 md:font-medium text-xs md:text-sm bg-[#f0f3fd] cursor-pointer border sm:border-[2px] md:border-[3px] border-[#d9dced] p-1 w-full h-full rounded-lg">
        <span className="hidden md:block md:text-[10px] lg:text-xs text-gray-400">
          {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
        </span>
        <span className="text-[#0552C5]">{name}</span>
      </small>
    </div>
  );
};

export default GridEvent;
