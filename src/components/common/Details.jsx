import React from "react";
import { useSharedState } from "../../store/Context";
const Details = () => {
  const [state, setState] = useSharedState();
  return (
    <div className="w-[300px] h-screen bg-white border fixed top-0 left-0">
      Details
      <button onClick={() => setState({ ...state, isDetailOpen: false })}>
        x
      </button>
      <p></p>
    </div>
  );
};

export default Details;
