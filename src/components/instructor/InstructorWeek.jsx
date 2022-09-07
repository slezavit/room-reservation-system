import React from "react";
import GridEvent from "../view/week/components/GridEvent";
import GridLabels from "../view/week/components/GridLabels";
import GridLines from "../view/week/components/GridLines";
import GridTitles from "../view/week/components/GridTitles";
import useWidth from "../../hooks/useWidth";
import { ReactComponent as DocumentIcon } from "../../assets/icons/document-filled.svg";

const CohortWeek = ({ instructorData }) => {
  const windowWidth = useWidth();
  return (
    <div className="pb-2 sm:px-2 md:px-10">
      <div className="grid sm:border sm:border-gray-100 sm:border-t-0 border-bl-0 sm:rounded-lg overflow-hidden week-cells">
        <span className="row-start-1 col-start-1 bg-gray-100 flex justify-center items-center text-gray-400">
          <DocumentIcon className="w-5 md:w-6" />
        </span>
        <GridLines />
        <GridTitles />
        <GridLabels />

        {/* {data?.map((event) =>
            event.type === "class" ? (
              <GridEvent
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                startTime={event.start_time}
                endTime={event.end_time}
                description={event.description}
                windowWidth={windowWidth}
                email={event.email}
                fade={fade}
                isRepeated={true}
              />
            ) : (
              isSameISOWeek(parseISO(event.date), state.currentDate) && (
                <GridEvent
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  startTime={event.start_time}
                  endTime={event.end_time}
                  description={event.description}
                  windowWidth={windowWidth}
                  email={event.email}
                  fade={fade}
                  isRepeated={false}
                />
              )
            )
          )} */}
        {instructorData?.map((lecture) => (
          <GridEvent
            key={lecture.id}
            id={lecture.id}
            title={lecture.title}
            day={lecture.day}
            startTime={lecture.start_time}
            endTime={lecture.end_time}
            windowWidth={windowWidth}
            email={lecture.email}
            isRepeated={true}
            cohort={lecture.cohort}
            instructor={lecture.instructor}
            room={lecture.room}
          />
        ))}
      </div>
    </div>
  );
};

export default CohortWeek;
