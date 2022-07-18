import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col px-3 py-10 sm:p-10 items-center">
      <h2 className="font-extrabold text-2xl mb-3 text-center">
        Whoops! This page doesn't exist.
      </h2>
      <p className="text-gray-400 text-sm">
        You were probably looking for{" "}
        <Link className="underline text-primary" to="/">
          rooms...
        </Link>
      </p>
      <h1 className="text-9xl font-extrabold mt-28">404</h1>
    </div>
  );
};

export default Error;
