import axios from "axios";

const api = axios.create({
  baseURL: "https://ilkhom19.pythonanywhere.com",
});

// ----------------
// _Room Table_
// ----------------

// Get rooms
export const getRooms = async () => {
  try {
    const response = await api.get("/rooms/");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Get room events
export const getRoomEvent = async (roomId) => {
  try {
    const response = await api.get(`/room/${roomId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Create event
export const addEvent = async (event) => {
  try {
    await api.post(
      `https://ilkhom19.pythonanywhere.com/room/${event.room}`,
      event
    );
  } catch (err) {
    console.log(err);
  }
};
