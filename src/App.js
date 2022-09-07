import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import "./assets/style/global-styles.css";
import { AnimatePresence } from "framer-motion";

import { SharedStateProvider } from "./store/Context";
import Error from "./pages/Error";
import Cohorts from "./pages/Cohorts";
import Instructors from "./pages/Instructors";

function App() {
  const location = useLocation();
  return (
    <>
      <SharedStateProvider>
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            <Route index element={<Home />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="schedule/:roomId" element={<Schedule />} />
            <Route path="cohort/:cohortId" element={<Cohorts />} />
            <Route path="instructor/:cohortId" element={<Instructors />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </AnimatePresence>
      </SharedStateProvider>
    </>
  );
}

export default App;
