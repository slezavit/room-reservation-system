import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as api from "../store/api";
import { useSharedState } from "../store/Context";
import { motion } from "framer-motion";
import { fade } from "../utils/animations";
import Loader from "../components/common/Loader";

const Home = () => {
  const [state, setState] = useSharedState();
  const { data, isLoading } = useQuery("rooms", api.getRooms);
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
      <div className="px-6 py-4 md:px-10 md:py-6 border-b border-gray-100 mb-4">
        <h3 className="font-semibold md:text-xl">All rooms</h3>
      </div>
      <div className="p-2 grid grid-cols-2 sm:px-28 md:px-36 lg:px-52 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((room) => (
          <Link
            onClick={() =>
              setState({
                ...state,
                currentDate: new Date(),
              })
            }
            className="block bg-[#e7e7e74b] py-4 px-2 rounded-lg duration-300 hover:bg-[#e7e7e7]"
            to={`schedule/${room.id}`}
            key={room.id}
          >
            <h3 className="font-semibold mb-1">{room.id}02</h3>
            <p className="text-gray-400 text-xs">{room.name}</p>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Home;
