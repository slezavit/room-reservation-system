import React, { useState, useRef, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Listbox } from "@headlessui/react";
import { differenceInMinutes, format, parseISO } from "date-fns";
import { addEvent } from "../../../store/api";
import { useMutation, useQueryClient } from "react-query";
import sha512 from "crypto-js/sha512";

let timeSlot = [
  { id: 1, name: "08:00", unavailable: false },
  { id: 2, name: "08:30", unavailable: false },
  { id: 3, name: "09:00", unavailable: false },
  { id: 4, name: "09:30", unavailable: false },
  { id: 5, name: "10:00", unavailable: false },
  { id: 6, name: "10:30", unavailable: false },
  { id: 7, name: "11:00", unavailable: false },
  { id: 8, name: "11:30", unavailable: false },
  { id: 9, name: "12:00", unavailable: false },
  { id: 10, name: "12:30", unavailable: false },
  { id: 11, name: "13:00", unavailable: false },
  { id: 12, name: "13:30", unavailable: false },
  { id: 13, name: "14:00", unavailable: false },
  { id: 14, name: "14:30", unavailable: false },
  { id: 15, name: "15:00", unavailable: false },
  { id: 16, name: "15:30", unavailable: false },
  { id: 17, name: "16:00", unavailable: false },
  { id: 18, name: "16:30", unavailable: false },
  { id: 19, name: "17:00", unavailable: false },
  { id: 20, name: "17:30", unavailable: false },
  { id: 21, name: "18:00", unavailable: false },
  { id: 22, name: "18:30", unavailable: false },
  { id: 23, name: "19:00", unavailable: false },
  { id: 24, name: "19:30", unavailable: false },
  { id: 25, name: "20:00", unavailable: false },
  { id: 26, name: "20:30", unavailable: false },
  { id: 27, name: "21:00", unavailable: false },
  { id: 28, name: "21:30", unavailable: false },
  { id: 29, name: "22:00", unavailable: false },
  { id: 30, name: "22:30", unavailable: false },
  { id: 31, name: "23:00", unavailable: false },
];
let timeSlotEnd = JSON.parse(JSON.stringify(timeSlot));

const EventForm = ({ roomId, setStep, data }) => {
  const [startTime, setStartTime] = useState(timeSlot[0]);
  const [endTime, setEndTime] = useState(timeSlot[1]);
  const { mutateAsync } = useMutation(addEvent);

  const [confirmInfo, setConfirmInfo] = useState(null);
  const [verification, setVerification] = useState("");
  const [verificationError, setVerificationError] = useState(true);

  const handleTimeSlot = useCallback(
    (e) => {
      const sortedData = data
        ?.filter((d) =>
          d.day
            ? d.day == format(parseISO(e), "i")
            : format(parseISO(d.date), "eeee") === format(parseISO(e), "eeee")
        )
        ?.filter((d) => {
          return d.date ? d.date === e : d;
        });

      const a = sortedData?.map((d) => [d.start_time, d.end_time]);

      if (a.length !== 0) {
        timeSlot.map((t, idxx) => {
          timeSlot[idxx].unavailable = false;
          let slot = Number(t.name.slice(0, 2)) * 60;
          if (t.name.slice(3, 4) === "3") {
            slot += 30;
          }

          a.map((sl, idx) => {
            let start = Number(sl[0].slice(0, 2)) * 60;

            if (sl[0].slice(3, 4) === "3") {
              start += 30;
            }
            let end = Number(sl[1].slice(0, 2)) * 60;
            if (sl[1].slice(3, 4) === "3") {
              end += 30;
            }

            if (start < slot && slot < end) {
              timeSlot[idxx].unavailable = true;
            }
            return true;
          });
          return true;
        });
      } else {
        timeSlot = timeSlot.map((d) => ({ ...d, unavailable: false }));
        timeSlotEnd = timeSlot.map((d) => ({ ...d, unavailable: false }));
      }
      setStartTime(timeSlot.find((d) => d.unavailable === false));
      setEndTime(timeSlot.find((d) => d.unavailable === false));
    },
    [data]
  );

  const flagDet = (e) => {
    timeSlotEnd = JSON.parse(JSON.stringify(timeSlot));
    let flag = false;
    timeSlotEnd.map((slot, idx) => {
      if (slot.name === e.name) {
        flag = true;
        slot.unavailable = false;
        setEndTime(slot);
      }
      if (flag === false) {
        slot.unavailable = true;
      }
      if (flag === true && slot.unavailable === true) {
        flag = false;
      }

      return slot;
    });
  };

  const dateRef = useRef(new Date());
  // console.log(dateRef.current);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("confirmCode"));
    if (items) {
      setConfirmInfo(items);
    }
    handleTimeSlot(format(dateRef.current, "yyyy-LL-dd"));
  }, []);

  const queryClient = useQueryClient();

  const eventStart = new Date(`${"2022/07/05"} ${startTime.name}`);
  const eventEnd = new Date(`2022/07/05 ${endTime.name}`);
  const diffInMin = differenceInMinutes(eventEnd, eventStart);

  const verifyHandle = (e) => {
    setVerification(e);

    if (sha512(e + "sugar").toString() === confirmInfo[1]) {
      setVerificationError(false);
    } else {
      setVerificationError(true);
    }
  };

  const refresh = (e) => {
    e.preventDefault();
    alert("Not valid confirmtion code or timeslot");
  };

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: format(new Date(), "yyyy-MM-dd"),
      start_time: startTime.name,
      end_time: endTime.name,
      type: "event",
      email: "",
      room: Number(roomId),
      status: "pending",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Too short")
        .max(60, "Too many words, shorten it")
        .required("Please, fill this field"),
      description: Yup.string()
        .min(6, "Too short")
        .max(400, "Too many details, shorten it")
        .required("Please, fill this field"),
      date: Yup.date().required("Date should be empty"),
    }),
    onSubmit: async (values) => {
      setStep(3);
      const newValues = {
        ...values,
        start_time: startTime.name + ":00",
        end_time: endTime.name + ":00",
        email: confirmInfo[0],
        status: "pending",
      };
      await mutateAsync(newValues);
      queryClient.invalidateQueries("room", `"${roomId}"`);
      localStorage.removeItem("confirmCode");
      resetForm();
    },
  });

  if (confirmInfo === null) {
    return (
      <>
        <h3>Please, send your email first</h3>
        <button className="underline" onClick={() => setStep(1)}>
          Go back
        </button>
      </>
    );
  }

  let notError = verificationError === true || diffInMin <= 0 ? true : false;

  // format(state.currentDate, "eeee") === format(parseISO(event.date), "eeee");

  return (
    <form
      onSubmit={notError ? refresh : handleSubmit}
      className="space-y-2 h-full overflow-y-scroll hide-scroll text-sm"
    >
      <div>
        <label className="mb-2 block" htmlFor="code">
          Verify code
          {verificationError && (
            <span className="text-red-600"> Enter a valid code</span>
          )}
        </label>
        <input
          value={verification}
          onChange={(e) => verifyHandle(e.target.value)}
          type="text"
          className="border rounded-xl w-full p-2"
          placeholder="Enter code"
        />
      </div>
      <div>
        <label className="mb-2 block" htmlFor="title">
          Title
          {touched.title && errors.title ? (
            <span className="text-red-400 block">{errors.title}</span>
          ) : null}
        </label>
        <input
          id="title"
          onChange={handleChange}
          value={values.title}
          onBlur={handleBlur}
          type="text"
          className="border rounded-xl w-full p-2"
          placeholder="Type title"
          required
        />
      </div>
      <div>
        <label className="mb-2 block" htmlFor="description">
          Description
          {touched.description && errors.description ? (
            <span className="text-red-400 block">{errors.description}</span>
          ) : null}
        </label>
        <textarea
          id="description"
          onChange={handleChange}
          value={values.description}
          onBlur={handleBlur}
          type="text"
          className="border rounded-xl w-full p-2 min-h-[7rem] max-h-[12rem]"
          placeholder="Type Description"
          required
        ></textarea>
      </div>
      <div>
        <label className="mb-2 block text-sm" htmlFor="date">
          Date of an event
          {touched.date && errors.date ? (
            <span className="text-red-400 block">{errors.date}</span>
          ) : null}
        </label>
        <input
          ref={dateRef}
          id="date"
          onChange={(e) => {
            handleChange(e);
            handleTimeSlot(e.target.value);
          }}
          value={values.date}
          onBlur={handleBlur}
          type="date"
          className="border rounded-xl w-full p-2"
        />
      </div>
      {diffInMin <= 0 && (
        <h1 className="text-red-500">Enter a valid time range</h1>
      )}
      <div>
        <label className="mb-2 block">Start time</label>
        <Listbox
          value={startTime}
          onChange={(e) => {
            setStartTime(e);
            flagDet(e);
          }}
        >
          <Listbox.Button className=" w-full rounded-xl p-2 border text-left">
            {startTime.name}
          </Listbox.Button>
          <Listbox.Options className="border mt-2 rounded-xl p-1 gap-1 grid grid-cols-4 sm:grid-cols-7">
            {timeSlot.map((time) => (
              <Listbox.Option
                key={time.id}
                value={time}
                disabled={time.unavailable}
                className={`text-center py-2 cursor-pointer rounded-xl ${
                  time.unavailable
                    ? "bg-red-200 hover:cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-100"
                }`}
              >
                {time.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
      <div>
        <label className="mb-2 block">End time</label>
        <Listbox value={endTime} onChange={setEndTime}>
          <Listbox.Button className=" w-full rounded-xl p-2 border text-left">
            {endTime.name}
          </Listbox.Button>
          <Listbox.Options className="border mt-2 rounded-xl p-1 gap-1 grid grid-cols-4 sm:grid-cols-7">
            {timeSlotEnd.map((time) => (
              <Listbox.Option
                key={time.id}
                value={time}
                disabled={time.unavailable}
                className={`text-center py-2 cursor-pointer rounded-xl ${
                  time.unavailable
                    ? "bg-red-200 hover:cursor-not-allowed"
                    : "bg-gray-100 hover:bg-gray-100"
                }`}
              >
                {time.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>

      <button
        className="w-full py-3 bg-primary rounded-xl text-white"
        type="submit"
        disabled={notError ? true : false}
      >
        Submit
      </button>
    </form>
  );
};

export default EventForm;
