import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as api from "../store/api";
const Home = () => {
  const { data, isLoading } = useQuery("rooms", api.getRooms);

  if (isLoading) {
    return "loading";
  }

  return (
    <div className="flex justify-center items-center flex-col w-full h-screen">
      <h1 className="mb-10">Select room</h1>
      <div className="flex gap-10 justify-center items-center">
        {data?.map((room) => (
          <Link
            className="px-7 py-4 border block w-fit"
            to={`schedule/${room.id}`}
            key={room.id}
          >
            {room.id}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
