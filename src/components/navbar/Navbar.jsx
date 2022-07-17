// export default Navbar;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSharedState } from "../../store/Context";
import { format } from "date-fns";

// icons
import { ReactComponent as WindowsIcon } from "../../assets/icons/windows.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/hamburger.svg";
import { ReactComponent as CrossIcon } from "../../assets/icons/cross.svg";
import { motion, AnimatePresence } from "framer-motion";
const Navbar = ({ currentRoom }) => {
  const [isExpand, setIsExpand] = useState(false);
  const [state] = useSharedState();
  return (
    <div className="px-2 md:px-10 sticky top-0 sm:static bg-white z-20 border-b border-gray-100">
      <div className="w-full py-3 sm:px-6 sm:py-4">
        <div className="flex justify-between items-center">
          <button onClick={() => setIsExpand(!isExpand)} className="sm:hidden">
            {isExpand ? <CrossIcon /> : <MenuIcon />}
          </button>
          <Link className="hidden sm:block" to="/">
            <WindowsIcon className="w-5" /> Classes
          </Link>
          <span className="font-medium hidden sm:block">
            {currentRoom.name} #{currentRoom.id}
          </span>
          <span className="sm:hidden font-medium">
            {state.currentView === "month" &&
              format(state.currentDate, "LLLL, y")}
            {state.currentView === "day" &&
              format(state.currentDate, "eee, LLLL do")}
            {state.currentView === "week" &&
              format(state.currentDate, "LLLL do, y")}
          </span>
          <button className="bg-primary py-1 px-2 sm:py-2 rounded-lg text-white">
            <PlusIcon className="w-5 h-5 sm:mr-2" />
            <span className="hidden sm:inline">Add event</span>
          </button>
        </div>
        <AnimatePresence>
          {isExpand && (
            <motion.div
              key="1"
              initial={{ height: 0 }}
              animate={{
                height: "auto",
              }}
              transition={{
                duration: 0.5,
                ease: "circOut",
              }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <h3 className="text-gray-500 font-light text-sm text-center mb-2 mt-4">
                {currentRoom.name} #{currentRoom.id}
              </h3>
              <Link
                to="/"
                className="py-2 px-4 bg-gray-100 rounded-lg block text-center"
              >
                Back to rooms
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
