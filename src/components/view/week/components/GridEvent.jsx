import { differenceInMinutes, format } from "date-fns";
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
  title,
  date,
  day,
  startTime,
  endTime,
  description,
  windowWidth,
  email,
  fade,
  isRepeated,
  cohort,
  instructor,
}) => {
  const [state, setState] = useSharedState();
  let eventHeight = windowWidth < 640 ? 3 : 5;
  let duration;

  if (!day) {
    // data formating
    const eventStart = new Date(`${date} ${startTime}`.replace(/-/g, "/"));
    const eventEnd = new Date(`${date} ${endTime}`.replace(/-/g, "/"));

    // actual data
    duration = differenceInMinutes(eventEnd, eventStart);

    day = format(eventStart, "i");
  }

  const eventStart = new Date(`2022-1-1 ${startTime}`.replace(/-/g, "/"));
  const eventEnd = new Date(`2022-1-1 ${endTime}`.replace(/-/g, "/"));

  // actual data
  duration = differenceInMinutes(eventEnd, eventStart);

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
        title,
        date,
        startTime,
        endTime,
        description,
        email,
        isRepeated,
        instructor,
        cohort,
      },
    });
  };

  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="flex text-black px-[1px] sm:px-[3px] md:px-[5px] lg:px-[7px]"
      style={{
        gridColumn: day - 1 + 2,
        gridRow: row - 7,
        height: `calc(${height}em)`,
        width: `calc(100%)`,
        marginTop: offset,
      }}
      onClick={selectHandle}
    >
      <small
        className={`break-all leading-[20px] overflow-hidden text-ellipsis py-1 md:p-2 md:font-medium text-xs md:text-sm cursor-pointer border sm:border-[2px] md:border-[3px] p-1 w-full h-full rounded sm:rounded-md ${
          !isRepeated
            ? "bg-[#fef4e4] border-[#efe5d6]"
            : "bg-[#f5f7fb] border-[#e5e7eb]"
        }`}
      >
        <span className="hidden md:block md:text-[10px] lg:text-xs text-gray-400">
          {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
        </span>
        <p className="text-primary text-[9px] sm:text-[12px] leading-[12px] sm:leading-normal">
          {title}
        </p>
      </small>
    </motion.div>
  );
};

export default GridEvent;
