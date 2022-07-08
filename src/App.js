import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";

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
