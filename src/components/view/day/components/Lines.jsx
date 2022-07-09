import React from "react";
import { times, gridPosition } from "../../../../utils/Utils";

const Lines = () => {
  return (
    <>
      {times.map((row) => (
        <span
          key={row}
          className="border-t border-gray-100"
          style={{
            gridRow: row - 7,
            gridColumn: `${gridPosition.columnStart} / -1`,
          }}
        />
      ))}

      <span
        className="border-l border-gray-100"
        style={{
          gridRow: `${gridPosition.allDay} / -1`,
          gridColumn: 2,
        }}
      />
    </>
  );
};

export default Lines;
