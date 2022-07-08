import React from "react";
import { days, times, gridPosition } from "../../../../utils/Utils";

const GridLines = () => {
  return (
    <>
      {times.map((row) => (
        <span
          key={row}
          className="border-t border-gray-100"
          style={{
            gridRow: row - 6,
            gridColumn: `${gridPosition.columnStart} / -1`,
          }}
        />
      ))}

      {days.map((day) => (
        <span
          key={day}
          className="border-l border-gray-100"
          style={{
            gridRow: `${gridPosition.allDay} / -1`,
            gridColumn: day + gridPosition.columnStart,
          }}
        />
      ))}
    </>
  );
};

export default GridLines;
