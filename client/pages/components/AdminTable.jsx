import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AdminSetting from "./AdminSetting";
import {
  getData,
  getExamPeriod,
  getRoomReserve,
} from "../../data/dataUserAndAdmin";
import { getTime } from "../../data/localTimezone";
import { addDays } from "date-fns";
import Login from "./Login";
import ConOrMeeting from "./ConOrMeeting";
import YMDSetting from "./YMDSetting";
import CalendarTable from "./CalendarTable";
// import Cookies from "js-cookie";
import { getCookie } from "cookies-next";

const AdminTable = () => {
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

  const getUserData = async (token) => {
    const allRoomReserve = await getRoomReserve(token);
    setDataShow(allRoomReserve);
  };
  // =================================================

  // ========== Get exam period from database ==========
  async function getExamDay() {
    const data = await getExamPeriod();
    if (data[0]?.isEnable == true) {
      setStartBooking(new Date(data[0].examStart));
      setEndBooking(new Date(data[0].examEnd));
    } else {
      setStartBooking(getTime());
      setEndBooking(addDays(getTime(), 2));
    }
  }
  // ===================================================

  useEffect(() => {
    getExamDay();
    // const token = Cookies.get("token");
    const token = getCookie("token");
    if (token) {
      getUserData(token);
    }
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

  const changeTypeRoom = (newAlignment) => {
    setAlignment(newAlignment);
  };
  // =================================================================================

  // ========== Filter data to show when select day in dropdown and select type room ==========
  const match = alignment == "Conference" ? true : false; // Check user toggle to Conference or Meeting
  // ========================================================================================
  const isAdmin = true; // Check admin

  if (isAdmin) {
    return (
      <div className="relative max-w-screen-[100%] mx-auto dark:bg-[#282a36]">
        <div className="flex px-0 justify-end items-center dark:bg-[#282a36]">
          <AdminSetting admin={isAdmin} />
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
            dataAllRoomServe={dataShow}
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
