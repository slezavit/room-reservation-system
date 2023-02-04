import React, { useState } from "react";
import { useSharedState } from "../../../store/Context";
import axios from "axios";
import { ReactComponent as CrossIcon } from "../../../assets/icons/cross.svg";

import { motion } from "framer-motion";
import EventForm from "./EventForm";
const Form = ({ roomId, lectures, events }) => {
  let data = [...lectures, ...events];
  const [state, setState] = useSharedState();
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [step, setStep] = useState(1);
  const handleEmail = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://52.198.226.89/api/verification/",
      { email: userEmail }
    );
    localStorage.setItem("confirmCode", JSON.stringify(response.data));

    setStep(2);
  };
  const emailVerify = (e) => {
    setUserEmail(e);
    let ending = e.split("@")[1];
    if (ending) {
      setEmailError(true);
      if (ending === "ucentralasia.org") {
        setEmailError(false);
      }
    }
  };

  const refresh = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0 }}
      className="w-full h-full z-30 fixed top-0 left-0 bg-transparent"
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-primary opacity-40"
        onClick={() => setState({ ...state, isFormOpen: false })}
      />

      <div className="w-[90vw] h-[80vh] shadow-lg md:w-[600px] rounded-xl bg-white origin-center absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-primary text-white px-4 py-5 flex items-center rounded-t-xl h-[15%] relative">
          <h3>Add event</h3>
          <button
            onClick={() => setState({ ...state, isFormOpen: false })}
            className="absolute right-3"
          >
            <CrossIcon />
          </button>
          <div className="text-sm text-gray-200 mt-2"></div>
        </div>
        <div className="px-4 py-5 h-[85%] overflow-hidden">
          {step === 1 && (
            <>
              <form
                onSubmit={emailError ? refresh : handleEmail}
                className="space-y-3"
              >
                <p>Enter your UCA email to receive a verification code. 
                Check your junk folder!</p>
                {emailError && (
                  <p className="text-red-300">
                    Email should end with @ucentralasia.org
                  </p>
                )}
                <input
                  className="w-full border px-3 py-2 rounded-xl"
                  type="email"
                  placeholder="Email"
                  value={userEmail}
                  onChange={(e) => emailVerify(e.target.value)}
                  required
                />
                <button
                  className="bg-primary text-white w-full py-2 rounded-xl"
                  type="submit"
                  disabled={emailError}
                >
                  Send
                </button>
              </form>
              <button
                onClick={() => setStep(2)}
                className="underline w-full py-2 rounded-xl mt-4"
                type="submit"
              >
                Already got a code
              </button>
            </>
          )}

          {step === 2 && (
            <EventForm data={data} setStep={setStep} roomId={roomId} />
          )}
          {step === 3 && <h3>Your request has been submitted successfully.</h3>}
        </div>
      </div>
    </motion.div>
  );
};

export default Form;
