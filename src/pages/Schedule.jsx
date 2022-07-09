import React from "react";
import { useParams } from "react-router-dom";
import { useSharedState } from "../store/Context";
import Day from "../components/view/day/Day";
import Month from "../components/view/month/Month";
import Week from "../components/view/week/Week";
import Navbar from "../components/navbar/Navbar";
import Header from "../components/header/Header";
import { useQuery } from "react-query";
import * as api from "../store/api";
import Details from "../components/common/Details";
const Schedule = () => {
  const [state] = useSharedState();
  let { roomId } = useParams();

  if (!roomId) {
    roomId = 1;
  }

  const { data, isLoading } = useQuery(["room", roomId], () =>
    api.getRoomEvent(roomId)
  );

  return (
    <>
      <Navbar />
      <Header roomId={roomId} />
      {state.currentView === "day" && (
        <Day state={state} isLoading={isLoading} data={data} />
      )}
      {state.currentView === "week" && (
        <Week state={state} isLoading={isLoading} data={data} />
      )}
      {state.currentView === "month" && <Month />}

      {state.isDetailOpen && <Details />}
    </>
  );
};

export default Schedule;
