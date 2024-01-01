import { React, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Switch from "@mui/material/Switch";
import { getTime } from "../../data/localTimezone";
import { addDays } from "date-fns";
import Axios from "axios";
import Login from "./Login";
import { getExamPeriod } from "@/data/dataUserAndAdmin";

const AdminSetting = (admin) => {
  const isAdmin = admin.admin;

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [startDate, setStartDate] = useState(getTime());
  const [endDate, setEndDate] = useState(addDays(getTime(), 2));
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const today = getTime();

  // ========== troggle switch ==========
  const switchOnOff = async () => {
    setToggleSwitch(!toggleSwitch);
    saveData(!toggleSwitch);
  };
  // ====================================

  useEffect(() => {
    getData();
  }, []);

  // ========== Get exam period from database ==========
  async function getData() {
    const data = await getExamPeriod();
    if (data[0]?.isEnable == true) {
      setStartDate(new Date(data[0].examStart));
      setEndDate(new Date(data[0].examEnd));
      setToggleSwitch(data[0].isEnable);
      // if exam period btn is false will set day booking 2 days
    } else {
      setStartDate(getTime());
      setEndDate(addDays(getTime(), 2));
      setToggleSwitch(false);
    }
  }
  // ==================================================

  // ========== Save exam period to database ==========
  async function saveData(BTN) {
    const data = await getExamPeriod();
    const id = data[0]?._id;
    const start = startDate;
    const end = endDate;
    if (BTN == true) {
      // if not have exam period data in database it will create new one
      if (data.length === 0) {
        Axios.post(
          "/api/examPeriod",
          {
            examStart: start,
            examEnd: end,
            isEnable: BTN,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: process.env.NEXT_PUBLIC_TOKEN,
            },
          }
        );
      } else {
        putData(id, BTN, start, end);
      }
    } else {
      putData(id, BTN, startDate, endDate);
    }
  }
  // =================================================

  // ========== Save exam period to database ==========
  async function putData(id, BTN, start, end) {
    Axios.put(
      `/api/examPeriod?id=${id}`,
      {
        examStart: start,
        examEnd: end,
        isEnable: BTN,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_TOKEN,
        },
      }
    ).then((res) => console.log(res))
  }
  // =================================================

  if (isAdmin) {
    return (
      <div className="flex justify-end items-center gap-2 sm:mb-0 mb-5">
        <div>
          <DatePicker
            className="sm:flex justify-end items-center  bg-gray-50 border  border-gray-300  rounded-lg  bg-transparent  px-2 py-[0.32rem] text-sm leading-[2.1] outline-none  focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:w-40 w-28"
            placeholderText="Exam Start"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={today}
          />
        </div>

        <div>
          <DatePicker
            className="sm:flex justify-end items-center  bg-gray-50 border  border-gray-300  rounded-lg  bg-transparent  px-2 py-[0.32rem] text-sm leading-[2.1] outline-none  focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:w-40 w-28"
            placeholderText="Exam End"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={today}
          />
        </div>

        {toggleSwitch ? (
          <Switch {...label} onClick={switchOnOff} checked={true} />
        ) : (
          <Switch {...label} onClick={switchOnOff} checked={false} />
        )}
      </div>
    );
  } else {
    return <Login />;
  }
};

export default AdminSetting;
