import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import "./assets/style/global-styles.css";

import { SharedStateProvider } from "./store/Context";

function App() {
  return (
    <SharedStateProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="schedule/:roomId" element={<Schedule />} />
      </Routes>
    </SharedStateProvider>
  );
}

export default App;
