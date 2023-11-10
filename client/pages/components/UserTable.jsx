import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getData } from "../../data/dataUserAndAdmin";
import { getTime } from "../../data/localTimezone";
import { addDays } from "date-fns";
import Axios from "axios";
import CalendarTable from "./CalendarTable";
import YMDSetting from "./YMDSetting";
import ConOrMeeting from "./ConOrMeeting";

const UserTable = (triggerbook) => {
  // ========== Get user data in database ==========
  const [dataShow, setDataShow] = useState([]);

  const getUserData = async () => {
    await getData((data) => {
      setDataShow(data);
    });
  };

  useEffect(() => {
    getUserData();
  }, [triggerbook]);
  // ===============================================

  // ========== cal date between two day ==========
  const calOneDay = 1000 * 3600 * 24;
  const [startBooking, setStartBooking] = useState(getTime());
  const [endBooking, setEndBooking] = useState(addDays(getTime(), 2));
  const periodBooking =
    endBooking.getTime() - startBooking.getTime() > 0
      ? (endBooking.getTime() - startBooking.getTime()) / calOneDay
      : (startBooking.getTime() - endBooking.getTime()) / calOneDay;

  // ===============================================

  // =========== Get exam period from database =============
  async function getExamDay() {
    await Axios.get("/api/examPeriod").then((res) => {
      if (res.data[0].isEnable == true) {
        console.log(new Date(res.data[0].examStart));
        setStartBooking(new Date(res.data[0].examStart));
        setEndBooking(new Date(res.data[0].examEnd));
      } else {
        setStartBooking(getTime());
        setEndBooking(addDays(getTime(), 2));
      }
    });
  }

  useEffect(() => {
    getExamDay();
  }, []);
  // =======================================================

  // ========== Select date at dropdrow to show info room booking ==========
  const [date, setDate] = useState(getTime().getDate());
  const [month, setMonth] = useState(getTime().getMonth() + 1);
  const [year, setYear] = useState(getTime().getFullYear());
  
  const handleDateChange = (year, month, date) => {
    setYear(year);
    setMonth(month);
    setDate(date);
  };
  // =======================================================================

  // ========== Select type room at toggle button to show info room booking ==========
  const [alignment, setAlignment] = useState("Conference");

  const changeTypeRoom = (newAlignment) => {
    setAlignment(newAlignment);
  };
  // =================================================================================

  const match = alignment == "Conference" ? true : false; // Check user toggle to Conference or Meeting

  const isAdmin = false; // Check admin
  // =================================================================================

  return (
    <div className="flex flex-col justify-center  dark:bg-[#282a36] sm:mt-[50px] w-full">
      <div className="flex px-0 justify-center lg:justify-end items-center dark:bg-[#282a36] lg:max-w-[90%] sm:max-w-[100%] w-full">
        <ConOrMeeting handleChangeTypeRoom={changeTypeRoom} />
        <YMDSetting
          startBooking={startBooking}
          periodBooking={periodBooking}
          onDateChange={handleDateChange}
        />
      </div>

      <div className="flex px-0 justify-center items-center dark:bg-[#282a36]">
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
};

export default UserTable;
