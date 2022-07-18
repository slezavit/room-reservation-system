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
import { motion, AnimatePresence } from "framer-motion";
import { fade } from "../utils/animations";
import Loader from "../components/common/Loader";
const Schedule = () => {
  const [state] = useSharedState();
  let { roomId } = useParams();

  if (!roomId) {
    roomId = 1;
  }

  const { data, isLoading: loadingRoom } = useQuery(["room", roomId], () =>
    api.getRoomEvent(roomId)
  );

  const { data: rooms, isLoading: loadingRooms } = useQuery(
    "rooms",
    api.getRooms
  );
  const isLoading = loadingRoom || loadingRooms;
  const currentRoom = rooms?.find((room) => room.id === Number(roomId));
  if (isLoading) {
    return <Loader />;
  }
  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <Navbar currentRoom={currentRoom} />
      <Header roomId={roomId} />

      <AnimatePresence exitBeforeEnter>
        {state.currentView === "day" && (
          <Day key="1" state={state} isLoading={isLoading} data={data} />
        )}
        {state.currentView === "week" && (
          <Week key="2" state={state} isLoading={isLoading} data={data} />
        )}
        {state.currentView === "month" && (
          <Month key="3" state={state} isLoading={isLoading} data={data} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {state.isDetailOpen && <Details key="detail" />}
      </AnimatePresence>
    </motion.div>
  );
};

export default Schedule;
