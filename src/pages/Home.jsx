import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as api from "../store/api";
import { useSharedState } from "../store/Context";
import { motion } from "framer-motion";
import { fade } from "../utils/animations";
import Loader from "../components/common/Loader";
import Logo from "../assets/img/big-logo.png";

const Home = () => {
  const [state, setState] = useSharedState();
  const [activeLink, setActiveLink] = useState("rooms");
  const [isAcademic, setIsAcademic] = useState(true);
  const { data, isLoading, isError } = useQuery("rooms", api.getRooms);
  const { data: cohorts, isLoading: cohortsLoading } = useQuery(
    "cohorts",
    api.getCohorts
  );
  const { data: instructors, isLoading: instructorsLoading } = useQuery(
    "instructors",
    api.getInstructors
  );
  const [filteredData, setFilteredData] = useState();
  useEffect(() => {
    setFilteredData(data?.filter((room) => room.academic === true));
  }, [isLoading, data]);

  const filterRooms = (e) => {
    setIsAcademic(e);
    const newData = data.filter((room) => room.academic === e);
    setFilteredData(newData);
  };
  if (isError) {
    return "Someting went wrong";
  }
  if (isLoading) {
    return <Loader />;
  }
  if (cohortsLoading) {
    return <Loader />;
  }

  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="px-6 py-4 md:px-10 md:py-6 border-b border-gray-100 mb-4 flex relative justify-end md:justify-center">
        <h3
          onClick={() => setActiveLink("rooms")}
          className={`${
            activeLink === "rooms" ? "border-b-black" : "border-b-white"
          }  mr-3 cursor-pointer border-b duration-300`}
        >
          Rooms
        </h3>
        <h3
          onClick={() => setActiveLink("cohorts")}
          className={`${
            activeLink === "cohorts" ? "border-b-black" : "border-b-white"
          } mr-3 cursor-pointer border-b duration-300`}
        >
          Cohorts
        </h3>
        <h3
          onClick={() => setActiveLink("instructors")}
          className={`${
            activeLink === "instructors" ? "border-b-black" : "border-b-white"
          } cursor-pointer border-b duration-300`}
        >
          Instructors
        </h3>

        <div className="absolute left-0 md:left-4 -top-5 md:-top-2">
          <img className="w-24" src={Logo} />
        </div>
      </div>
      {activeLink === "rooms" && (
        <>
          {" "}
          <div className="flex justify-center my-2">
            <div className="p-1 bg-gray-100 rounded-xl space-x-1">
              <button
                onClick={() => filterRooms(true)}
                className={`p-2 rounded-xl ${
                  isAcademic && "bg-white duration-300"
                }`}
              >
                Academic
              </button>
              <button
                onClick={() => filterRooms(false)}
                className={`p-2 rounded-xl ${
                  !isAcademic && "bg-white duration-300"
                }`}
              >
                Others
              </button>
            </div>
          </div>
          <div className="p-2 grid grid-cols-2 sm:px-28 md:px-36 lg:px-52 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {filteredData?.map(
              (room) =>
                room.id !== 0 && (
                  <Link
                    onClick={() =>
                      setState({
                        ...state,
                        currentDate: new Date(),
                      })
                    }
                    style={{ backgroundColor: `#${room.color}` }}
                    className="block py-4 px-2 rounded-lg duration-300 border"
                    to={`schedule/${room.id}`}
                    key={room.id}
                  >
                    {room.academic && (
                      <h3 className="font-semibold mb-1">{room.id}</h3>
                    )}

                    <p
                      className={`${
                        room.academic ? "text-xs" : "font-semibold mb-1"
                      }`}
                    >
                      {room.name}
                    </p>
                    <p className="text-xs mb-1">{room.seats} seats</p>
                    <p className="text-gray-400 text-xs">{room.information}</p>
                  </Link>
                )
            )}
          </div>
        </>
      )}

      {activeLink === "cohorts" && (
        <>
          <div className="p-2 grid grid-cols-2 sm:px-28 md:px-36 lg:px-52 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {cohorts?.map(
              (cohort) =>
                cohort.id !== 15 && (
                  <Link
                    className="block bg-[#e7e7e74b] py-4 px-2 rounded-lg duration-300 hover:bg-[#e7e7e7]"
                    to={`cohort/${cohort.id}`}
                    key={cohort.id}
                  >
                    <h3 className="font-semibold">
                      {cohort.major} {cohort.year}
                    </h3>
                  </Link>
                )
            )}
          </div>
        </>
      )}

      {activeLink === "instructors" && (
        <>
          <div className="p-2 grid grid-cols-2 sm:px-28 md:px-36 lg:px-52 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {instructors?.map(
              (instructor) =>
                instructor.id !== 32 &&
                instructor.id !== 33 && (
                  <Link
                    className="block bg-[#e7e7e74b] py-4 px-2 rounded-lg duration-300 hover:bg-[#e7e7e7]"
                    to={`instructor/${instructor.id}`}
                    key={instructor.id}
                  >
                    <h3 className="font-semibold">{instructor.name}</h3>
                  </Link>
                )
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Home;
