import React from "react";
import { gridPosition, times } from "../../../../utils/Utils";
const GridLabels = () => {
  return (
    <>
      {times.map((time) => (
        <small
          key={time}
          className="flex items-center justify-center relative font-medium text-gray-400 text-xs border-t border-green-100"
          style={{
            gridRow: time - 7 + gridPosition.rowStart,
            gridColumn: gridPosition.labels,
          }}
        >{`${time}`}</small>
      ))}
    </>
  );
};

export default GridLabels;
