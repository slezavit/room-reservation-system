import React, { useState } from "react";

const Meeting = ({ meeting }) => {
  const { name, start_time, end_time, description } = meeting;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li
      onClick={() => setIsOpen(!isOpen)}
      className="flex flex-col cursor-pointer px-4 py-2 group rounded-xl focus-within:bg-gray-100 bg-gray-100"
    >
      <div className="flex-auto">
        <p className="text-gray-900">{name}</p>
        <p className="mt-0.5">
          <time dateTime={start_time}>{start_time}</time> -
          <time dateTime={end_time}>{end_time}</time>
        </p>
      </div>
      <div className={`${isOpen ? "block" : "hidden"}`}>{description}</div>
    </li>
  );
};

export default Meeting;
