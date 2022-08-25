import React from "react";
import { Link, useParams } from "react-router-dom";
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
import CohortWeek from "../components/cohort/CohortWeek";
import { ReactComponent as WindowsIcon } from "../assets/icons/windows.svg";
const Cohorts = () => {
  const [state, setState] = useSharedState();
  let { cohortId } = useParams();

  if (!cohortId) {
    cohortId = 1;
  }

  const {
    data: cohortData,
    isLoading: cohortLoading,
    isError: cohortError,
  } = useQuery(["cohort", cohortId], () => api.getCohortData(cohortId));

  const {
    data: cohorts,
    isLoading: loadingcohorts,
    isError: roomcohorts,
  } = useQuery("cohorts", api.getCohorts);
  const isLoading = loadingcohorts || cohortLoading;
  const isError = cohortError || roomcohorts;
  const currentRoom = cohorts?.find((room) => room.id === Number(cohortId));
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
      <div className="flex justify-between items-center px-2 md:px-12 py-3">
        <Link className="block" to="/">
          <WindowsIcon className="w-5" /> Rooms
        </Link>
        <span className="font-bold">
          {currentRoom.major} {currentRoom.year}
        </span>
        <a
          href={`http://127.0.0.1:8000/downloadcohort/${currentRoom.id}`}
          target="_blank"
          rel="noreferrer noopener"
          className="py-2 px-4 bg-green-100 rounded-lg block text-center"
        >
          Get excel
        </a>
      </div>
      <CohortWeek cohortData={cohortData} />

      <AnimatePresence>
        {state.isDetailOpen && <Details key="detail" />}
      </AnimatePresence>
    </motion.div>
  );
};

export default Cohorts;
