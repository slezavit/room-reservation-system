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
import Error from "./Error";
import Form from "../components/common/form/Form";
const Schedule = () => {
  const [state, setState] = useSharedState();
  let { roomId } = useParams();

  if (!roomId) {
    roomId = 1;
  }

  const { data: cohorts, isLoading: loadingCohorts } = useQuery(
    "cohorts",
    api.getCohorts
  );
  const { data: instructors, isLoading: loadingInstructors } = useQuery(
    "instructors",
    api.getInstructors
  );
  const {
    data: lectures,
    isLoading: loadingLecture,
    isError: lectureError,
  } = useQuery(["lectures", roomId], () => api.getRoomLecture(roomId));

  const {
    data: events,
    isLoading: loadingEvent,
    isError: eventError,
  } = useQuery(["events", roomId], () => api.getRoomEvent(roomId));

  const {
    data: rooms,
    isLoading: loadingRooms,
    isError: roomError,
  } = useQuery("rooms", api.getRooms);
  const isLoading =
    loadingEvent ||
    loadingRooms ||
    loadingLecture ||
    loadingCohorts ||
    loadingInstructors;
  const isError = eventError || lectureError || roomError;
  const currentRoom = rooms?.find((room) => room.id === Number(roomId));
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error />;
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
          <Day
            key="1"
            setState={setState}
            state={state}
            isLoading={isLoading}
            lectures={lectures}
            events={events}
          />
        )}
        {state.currentView === "week" && (
          <Week
            setState={setState}
            state={state}
            key="2"
            isLoading={isLoading}
            lectures={lectures}
            events={events}
          />
        )}
        {state.currentView === "month" && (
          <Month
            setState={setState}
            state={state}
            key="3"
            isLoading={isLoading}
            lectures={lectures}
            events={events}
            instructors={instructors}
            cohorts={cohorts}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {state.isDetailOpen && (
          <Details key="detail" instructors={instructors} cohorts={cohorts} />
        )}
        {state.isFormOpen && (
          <Form
            key="form"
            roomId={roomId}
            lectures={lectures}
            events={events}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Schedule;
