import React from "react";
import { addDays, addWeeks, format } from "date-fns";

// icons
import { ReactComponent as RightArrow } from "../../assets/right-arrow.svg";
import { ReactComponent as LeftArrow } from "../../assets/left-arrow.svg";
import { useSharedState } from "../../store/Context";

const Header = ({ roomId }) => {
  const [state, setState] = useSharedState();
  return (
    <div className="p-3 py-2 pb-0 sm:py-2 sm:pb-0 lg:px-10">
      <div className="border border-gray-100 flex justify-between items-center w-full p-2 sm:p-3 rounded rounded-bl-none rounded-br-none bg-white">
        <div>{format(state.currentDate, "LLL do, y")}</div>

        {state.currentView === "day" ? (
          <div>
            <button
              className="p-2 rounded mr-2 bg-[#F3F3F4] hover:bg-gray-200 duration-200"
              onClick={() =>
                setState({
                  ...state,
                  currentDate: addDays(state.currentDate, -1),
                })
              }
            >
              <LeftArrow className="w-4 md:w-5 h-fit" />
            </button>
            <button
              onClick={() =>
                setState({
                  ...state,
                  currentDate: addDays(state.currentDate, 1),
                })
              }
              className="p-2 rounded bg-[#F3F3F4] hover:bg-gray-200 duration-200"
            >
              <RightArrow className="w-4 md:w-5 h-fit" />
            </button>
          </div>
        ) : (
          <div>
            <button
              className="p-2 rounded mr-2 bg-[#F3F3F4] hover:bg-gray-200 duration-200"
              onClick={() =>
                setState({
                  ...state,
                  currentDate: addWeeks(state.currentDate, -1),
                })
              }
            >
              <LeftArrow className="w-4 md:w-5 h-fit" />
            </button>
            <button
              onClick={() =>
                setState({
                  ...state,
                  currentDate: addWeeks(state.currentDate, 1),
                })
              }
              className="p-2 rounded bg-[#F3F3F4] hover:bg-gray-200 duration-200"
            >
              <RightArrow className="w-4 md:w-5 h-fit" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
