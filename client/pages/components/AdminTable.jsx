import React, { useState, useEffect } from "react";
import Axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import AdminSetting from "./AdminSetting";
import { getData } from "../../data/dataUserAndAdmin";
import { getTime } from "../../data/localTimezone";
import { addDays } from "date-fns";
import Login from "./Login";
import ConOrMeeting from "./ConOrMeeting";
import YMDSetting from "./YMDSetting";
import CalendarTable from "./CalendarTable";

const AdminTable = (admin) => {
  // ========== Check admin login ==========
  const isAdmin = admin.admin;

  // ========== Calculate how many day to select in dropdown ==========
  const calOneDay = 1000 * 3600 * 24;
  const [startBooking, setStartBooking] = useState(getTime());
  const [endBooking, setEndBooking] = useState(addDays(getTime(), 2));
  const periodBooking =
    endBooking.getTime() - startBooking.getTime() > 0
      ? (endBooking.getTime() - startBooking.getTime()) / calOneDay
      : (startBooking.getTime() - endBooking.getTime()) / calOneDay;
  // ==================================================================

  // ========== Get user data from database ==========
  const [dataShow, setDataShow] = useState([]);

  const getUserData = async () => {
    await getData((data) => {
      setDataShow(data);
    });
  };
  // =================================================

  // ========== Get exam period from database ==========
  async function getExamDay() {
    await Axios.get("/api/examPeriod").then((res) => {
      if (res.data[0].isEnable == true) {
        setStartBooking(new Date(res.data[0].examStart));
        setEndBooking(new Date(res.data[0].examEnd));
      } else {
        setStartBooking(getTime());
        setEndBooking(addDays(getTime(), 2));
      }
    });
  }
  // ===================================================

  useEffect(() => {
    getExamDay();
    getUserData();
  }, []);

  // ========== Show date in dropdown ==========
  const [date, setDate] = useState(getTime().getDate());
  const [month, setMonth] = useState(getTime().getMonth() + 1);
  const [year, setYear] = useState(getTime().getFullYear());

  const handleDateChange = (year, month, date) => {
    setYear(year);
    setMonth(month);
    setDate(date);
  };
  // =======================================================

  // ========== Select type room ==========
  const [alignment, setAlignment] = useState("Conference");

  const changeTypeRoom = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  // ======================================

  // ========== Filter data to show when select day in dropdown and select type room ==========
  const match = alignment == "Conference" ? true : false;
  // ========================================================================================
  if (isAdmin) {
    return (
      <div className="relative max-w-screen-[100%] mx-auto dark:bg-[#282a36]">
        <div className="flex px-0 justify-end items-center dark:bg-[#282a36]">
          <AdminSetting admin={admin.admin} />
        </div>

        <div className="flex px-0 justify-center md:justify-end items-center p-3 dark:bg-[#282a36] ">
          <ConOrMeeting handleChangeTypeRoom={changeTypeRoom} />
          <YMDSetting
            startBooking={startBooking}
            periodBooking={periodBooking}
            onDateChange={handleDateChange}
          />
        </div>

        <div className="flex px-0 justify-center items-center dark:bg-[#282a36] ">
          <CalendarTable
            isConference={match}
            year={year}
            month={month}
            date={date}
            dataShow={dataShow}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    );
  } else {
    return <Login />;
  }
};

export default AdminTable;
