import axios from "axios";

const api = axios.create({
  baseURL: "https://ilkhom19.pythonanywhere.com",
  // baseURL: "http://127.0.0.1:8000",
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
    const response = await api.get(`/events/${roomId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Get room lectures
export const getRoomLecture = async (roomId) => {
  try {
    const response = await api.get(`/lectures/${roomId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Create event
export const addEvent = async (event) => {
  try {
    await api.post(
      `https://ilkhom19.pythonanywhere.com/events/${event.room}`,
      event
    );
  } catch (err) {
    console.log(err);
  }
};

// Get room lectures
export const getCohorts = async () => {
  try {
    const response = await api.get("/cohorts/");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCohortData = async (cohortId) => {
  try {
    const response = await api.get(`/cohort/${cohortId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Get instructors
export const getInstructors = async () => {
  try {
    const response = await api.get("/instructors/");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getInstructorData = async (instructorId) => {
  try {
    const response = await api.get(`/instructor/${instructorId}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
