import { differenceInMinutes } from "date-fns";
import React from "react";
import { gridPosition } from "../../../../utils/Utils";
import { useSharedState } from "../../../../store/Context";
import { motion } from "framer-motion";
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
  fade,
  windowWidth,
  isRepeated,
}) => {
  const [state, setState] = useSharedState();
  let eventHeight = windowWidth < 640 ? 3 : 5;
  // data formating
  const eventStart = new Date(`${date} ${startTime}`);
  const eventEnd = new Date(`${date} ${endTime}`);

  // actual data
  const duration = differenceInMinutes(eventEnd, eventStart);

  // styling data
  const { hour, minute } = splitTime(startTime);
  const row = hour + gridPosition.rowStart;
  const offset = `${(minute / 60) * eventHeight}em`;
  const height = (duration / 60) * eventHeight;

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
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="hidden"
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
      <small
        className={`break-all leading-[18px] overflow-hidden text-ellipsis py-1 md:p-2 md:font-medium text-xs md:text-sm cursor-pointer border sm:border-[2px] md:border-[3px] p-1 w-full h-full rounded-lg ${
          !isRepeated
            ? "bg-[#fef4e4] border-[#efe5d6]"
            : "bg-[#f5f7fb] border-[#e5e7eb]"
        }`}
      >
        <span className="hidden md:block md:text-[10px] lg:text-xs text-gray-400">
          {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
        </span>
        <span className="text-primary">{name}</span>
      </small>
    </motion.div>
  );
};

export default GridEvent;
