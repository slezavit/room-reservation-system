import React from "react";
import { useSharedState } from "../../store/Context";
import { format, addDays, addMonths, addWeeks } from "date-fns";

//icons
import { ReactComponent as ArrowLeftIcon } from "../../assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "../../assets/icons/arrow-right.svg";

// utils
const views = ["day", "week", "month"];
const Header = () => {
  // states
  const [state, setState] = useSharedState();

  // methods
  const changeView = (e) => {
    setState({
      ...state,
      currentView: e,
    });
  };

  const dateHandler = ({ view, type }) => {
    switch (view) {
      case "day":
        setState({
          ...state,
          currentDate: addDays(state.currentDate, type),
        });
        break;
      case "week":
        setState({
          ...state,
          currentDate: addWeeks(state.currentDate, type),
        });
        break;
      case "month":
        setState({
          ...state,
          currentDate: addMonths(state.currentDate, type),
        });
        break;

      default:
        console.log("This method expects string: day, week, or month");
        break;
    }
  };
  return (
    <div className="px-2 md:px-10 py-0">
      <div className="flex justify-between items-stretch my-3 sm:my-6 sm:px-6">
        <h3 className="font-bold text-xl hidden sm:block">
          {state.currentView === "day"
            ? format(state.currentDate, "eeee, LLLL d, y")
            : format(state.currentDate, "LLLL d, y")}
        </h3>
        <div className="p-1 bg-gray-100 rounded-lg ml-0 sm:-ml-16">
          {views.map((view, idx) => (
            <button
              key={idx}
              className={`px-2 sm:px-4 py-1 rounded-lg duration-300 capitalize ${
                state.currentView === view ? "bg-white" : ""
              }`}
              onClick={() => changeView(view)}
              disabled={state.currentView === view ? true : false}
            >
              {view}
            </button>
          ))}
        </div>
        <div className="flex">
          <button
            onClick={() => dateHandler({ view: state.currentView, type: -1 })}
            className="flex justify-center hover:bg-gray-200 duration-300 items-center bg-gray-100 p-2 h-full rounded-lg rounded-tr-none rounded-br-none"
          >
            <ArrowLeftIcon className="w-4 sm:w-5 h-fit" />
          </button>
          <button
            onClick={() =>
              setState({
                ...state,
                currentDate: new Date(),
              })
            }
            className="flex justify-center hover:bg-gray-200 duration-300 items-center bg-gray-100 p-2 h-full"
          >
            Today
          </button>
          <button
            onClick={() => dateHandler({ view: state.currentView, type: 1 })}
            className="flex justify-center hover:bg-gray-200 duration-300 items-center bg-gray-100 p-2 h-full rounded-lg rounded-tl-none rounded-bl-none"
          >
            <ArrowRightIcon className="w-4 sm:w-5 h-fit" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
