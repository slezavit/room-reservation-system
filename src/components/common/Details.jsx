import React from "react";
import { useSharedState } from "../../store/Context";
const Details = () => {
  const [state, setState] = useSharedState();
  if (!state.selectedData) {
    return "No details for this event";
  }
  return (
    <div className="w-full md:w-[400px] h-screen bg-white border fixed top-0 left-0">
      <div className="p-3">
        <div className="flex justify-between items-center pr-3 mb-5">
          <h3 className="text-lg">Details</h3>
          <button
            className="text-lg"
            onClick={() => setState({ ...state, isDetailOpen: false })}
          >
            x
          </button>
        </div>
        <div>
          <h3 className="text-lg">Title:</h3>
          <p>{state.selectedData.name}</p>
          <h3 className="text-lg">Time:</h3>
          <p>{`${state.selectedData.startTime.slice(
            0,
            5
          )} - ${state.selectedData.endTime.slice(0, 5)}`}</p>
          <h3 className="text-lg">Description:</h3>

          <p>{state.selectedData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
