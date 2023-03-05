import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as api from "../store/api";
import { useSharedState } from "../store/Context";
import { motion } from "framer-motion";
import { fade } from "../utils/animations";
import Loader from "../components/common/Loader";
import Logo from "../assets/img/big-logo.png";
import { format, parseISO } from "date-fns";
import Meeting from "../components/view/month/components/Meeting";
import EventMeeting from "../components/view/month/components/EventMeeting";

const Home = () => {
  const [state, setState] = useSharedState();
  const [activeLink, setActiveLink] = useState("rooms");
  const [isAcademic, setIsAcademic] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const parentRef = useRef(null);

  useEffect(() => {
    if (parentRef.current !== null) {
      const parentDiv = parentRef.current;
      const today = new Date();
      const allDivs = parentDiv.querySelectorAll("[data-date]");
      let closestDivTop = null;
      let closestDivDistance = Infinity;
      allDivs.forEach((div) => {
        const divDate = new Date(div.dataset.date);
        const distance = Math.abs(divDate - today);
        if (distance < closestDivDistance) {
          closestDivTop = div.offsetTop;
          closestDivDistance = distance;
        }
      });
      parentDiv.scrollTop = closestDivTop;
    }
  }, [isSidebarOpen]);

  const sidebarOpenHandler = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.style.overflowY = "hidden";
  };

  useEffect(() => {
    if (!isSidebarOpen) {
      document.body.style.overflowY = "scroll";
    }
  }, [isSidebarOpen]);

  const { data, isLoading, isError } = useQuery("rooms", api.getRooms);
  const { data: cohorts, isLoading: cohortsLoading } = useQuery(
    "cohorts",
    api.getCohorts
  );
  const { data: instructors, isLoading: instructorsLoading } = useQuery(
    "instructors",
    api.getInstructors
  );
  const { data: events, isLoading: eventsLoading } = useQuery(
    "outlook_events",
    api.getEvents
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
  if (isLoading || eventsLoading || cohortsLoading) {
    return <Loader />;
  }

  return (
    <motion.div
      variants={fade}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="px-6 py-4 sm:px-20 xl:px-52 md:py-6  border-b border-gray-100 mb-4 flex relative justify-end md:justify-end">
        <div className="flex ">
          <h3
            onClick={() => {
              setActiveLink("rooms");
              setIsSidebarOpen(false);
            }}
            className={`${
              activeLink === "rooms" ? "border-b-black" : "border-b-white"
            }  mr-2 sm:mr-3 cursor-pointer border-b duration-300`}
          >
            Rooms
          </h3>
          <h3
            onClick={() => {
              setActiveLink("cohorts");
              setIsSidebarOpen(false);
            }}
            className={`${
              activeLink === "cohorts" ? "border-b-black" : "border-b-white"
            } mr-2 sm:mr-3 cursor-pointer border-b duration-300`}
          >
            Cohorts
          </h3>
          <h3
            onClick={() => {
              setActiveLink("instructors");
              setIsSidebarOpen(false);
            }}
            className={`${
              activeLink === "instructors" ? "border-b-black" : "border-b-white"
            } mr-2 sm:mr-3 cursor-pointer border-b duration-300`}
          >
            Instructors
          </h3>
          <h3
            onClick={sidebarOpenHandler}
            className={`${
              isSidebarOpen ? "border-b-black" : "border-b-white"
            } cursor-pointer border-b duration-300`}
          >
            Events
          </h3>
        </div>

        <div
          className={`fixed w-full h-screen top-14 md:top-[4.6rem] duration-200 flex ${
            isSidebarOpen ? "right-0" : "-right-full"
          }`}
        >
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="flex-1 hidden sm:block h-full"
          ></div>
          <div
            className={`sm:w-[30rem] w-full h-full overflow-y-scroll bg-white md:border-l border-dashed pb-24`}
            ref={parentRef}
          >
            {events
              .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
              .map((event, index) => {
                let displayDate = true;
                if (
                  index > 0 &&
                  event.start_time === events[index - 1].start_time
                ) {
                  displayDate = false;
                }
                return (
                  <div
                    data-date={`"${format(
                      parseISO(event.start_time),
                      "yyyy-MM-dd"
                    )}"`}
                    key={index}
                    className="px-4"
                  >
                    {displayDate && (
                      <div className="my-4">
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">
                            {format(parseISO(event.start_time), "MMM d")}
                          </span>
                          <span className="text-xs text-gray-500">
                            {format(parseISO(event.start_time), "EEEE")}
                          </span>
                        </div>
                      </div>
                    )}
                    <div>
                      <EventMeeting key={index} meeting={event} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="absolute left-0 sm:left-16 md:left-19 xl:left-48 -top-3 sm:-top-5 md:-top-2">
          <img className="w-20 sm:w-24" src={Logo} />
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
          <div className="p-2 grid grid-cols-2 sm:px-20 xl:px-52 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
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
          <div className="p-2 grid grid-cols-2 sm:px-20 xl:px-52 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
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
          <div className="p-2 grid grid-cols-2 sm:px-20 xl:px-52 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
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
