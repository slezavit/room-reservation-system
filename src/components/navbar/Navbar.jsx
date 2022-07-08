import React from "react";
import { useSharedState } from "../../store/Context";

const viewButtons = ["day", "week", "month"];
const Navbar = () => {
  const [state, setState] = useSharedState();
  return (
    <div className="flex justify-between items-center p-3 sm:p-6 lg:px-10">
      <div className="hidden md:block">
        <h3 className="text-2xl font-bold">Calendar</h3>
      </div>
      <div>
        {viewButtons.map((btn, id) => (
          <button
            key={id}
            onClick={() => setState({ ...state, currentView: btn })}
            className={`p-1 relative capitalize ${
              state.currentView === btn ? "text-[#333]" : "text-[#b7b7b7]"
            }`}
          >
            <span
              className={`absolute w-full h-[1px] bg-black left-0 duration-200 ${
                state.currentView === btn
                  ? "opacity-100 bottom-0"
                  : "opacity-0 -bottom-2"
              }`}
            />
            {btn}
          </button>
        ))}
      </div>
      <div>
        <button className="border-b border-black">+ Add Event</button>
      </div>
    </div>
  );
};

export default Navbar;
