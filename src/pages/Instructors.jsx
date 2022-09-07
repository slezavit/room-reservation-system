import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSharedState } from "../store/Context";
import { useQuery } from "react-query";
import * as api from "../store/api";
import Details from "../components/common/Details";
import { motion, AnimatePresence } from "framer-motion";
import { fade } from "../utils/animations";
import Loader from "../components/common/Loader";
import Error from "./Error";
import CohortWeek from "../components/cohort/CohortWeek";
const Instructors = () => {
  const [state] = useSharedState();
  let navigate = useNavigate();
  let { cohortId } = useParams();

  if (!cohortId) {
    navigate("/error");
  }

  const {
    data: instructorData,
    isLoading: instructorLoading,
    isError: instructorError,
  } = useQuery(["instructor", cohortId], () => api.getInstructorData(cohortId));

  const { data: instructors, isLoading: loadingInstructors } = useQuery(
    "instructors",
    api.getInstructors
  );
  const {
    data: cohorts,
    isLoading: loadingcohorts,
    isError: roomcohorts,
  } = useQuery("cohorts", api.getCohorts);

  const isLoading = instructorLoading || loadingInstructors || loadingcohorts;
  const isError = instructorError || roomcohorts;
  const currentInstructor = instructors?.find((i) => i.id === Number(cohortId));
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
          Go back
        </Link>
        <span className="font-bold">{currentInstructor.name}</span>
        <a
          href={`https://ilkhom19.pythonanywhere.com/downloadfaculty/${currentInstructor.id}`}
          target="_blank"
          rel="noreferrer noopener"
          className="py-2 px-4 bg-green-100 rounded-lg block text-center"
        >
          Get excel
        </a>
      </div>
      <CohortWeek cohortData={instructorData} />

      <AnimatePresence>
        {state.isDetailOpen && (
          <Details instructors={instructors} cohorts={cohorts} key="detail" />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Instructors;
