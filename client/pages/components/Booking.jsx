"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uuid from "react-uuid";
import Axios from "axios";
import { addDays } from "date-fns";
// import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import {
  typeRoom,
  numberInRoomConferece,
  numberInRoomMeeting,
} from "../../data/dataRoom";
import { getData, getExamPeriod } from "../../data/dataUserAndAdmin";
import { getTime } from "../../data/localTimezone";
import Switch from "@mui/material/Switch";
import differenceInHours from "date-fns/differenceInHours";
import isEqual from "date-fns/isEqual";

const Booking = ({ sendDataBook }) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [email, setEmail] = useState("");
  const [session, setSession] = useState(null);
  const [roomName, setRoomName] = useState(""); // set state of room name
  const [roomType, setRoomType] = useState("default"); // set state of type room name, default state is default because will use it in value
  const [roomNumber, setRoomNumber] = useState("default"); // set state of room name, default state is default because will use it in value
  const [timeFrom, setTimeFrom] = useState(null); // set state of timeFrom null to not show anything in select and use lectTime to show
  const [getTimeFrom, setGetTimeFrom] = useState(null);

  const [timeTo, setTimeTo] = useState(null);
  const [getTimeTo, setGetTimeTo] = useState(null);

  const [numberRoom, setNumberRoom] = useState(numberInRoomConferece); // set default number of room to select in form
  const [selectRoom, setSelectRoom] = useState(false); // Let user select type of room and will select number of name
  const [inputRoom, setInputRoom] = useState(false); // Check that user select room or not
  const checkTime = getTimeTo - getTimeFrom; // Check time hours between 1-3 hours
  const [checkValid, setCheckValid] = useState(false); // Check all value that filled
  const [canSelectDateTime, setCanSelectDateTime] = useState(false); // If useer select room of number then user can select date and time to booking

  // Collect day from user submit form
  const [day, setDay] = useState(null);
  const [getDay, setGetDay] = useState(null);
  const [getMonth, setGetMonth] = useState(null);
  const [getYear, setGetYear] = useState(null);

  const [checkSelectDay, setCheckSelectDay] = useState(false); // Check that user already select day
  const [collectday, setCollectDay] = useState(getTime()); // Collect dd/mm/yyyy from user submit form

  // Set start day and end of booking
  const [startBookingDay, setStartBookingDay] = useState(getTime());
  const [endBookingDay, setEndBookingDay] = useState(addDays(getTime(), 2));

  // Set min max time
  const [minTime, setMinTime] = useState(new Date("1/1/1111 10:00 AM"));
  const [maxTime, setMaxTime] = useState(new Date("1/1/1111 4:00 PM"));
  const calOneDay = 1000 * 3600 * 24;
  const period =
    endBookingDay.getTime() - startBookingDay.getTime() > 0
      ? (endBookingDay.getTime() - startBookingDay.getTime()) / calOneDay
      : (startBookingDay.getTime() - endBookingDay.getTime()) / calOneDay;

  const today = getTime();
  const tomorrow = addDays(getTime(), 1);
  const inLibrary = false; // Track user booking in library or not
  const [adminBTN, setAdminBTN] = useState(false); // Admin allow exam period
  const [clickButton, setClickButton] = useState(false); // User click booking between 2 days

  // When exam period user want to booking 11:00 pm to 01:00 am
  const [dayTwo, setDayTwo] = useState(null);
  const [between2days, setBetween2days] = useState(false);

  const [minTimeInThisDate, setMinTimeInThisDate] = useState(minTime);

  const hladleDayTwo = (event) => {
    setDayTwo(event);
    setCheckSelectDay(true);
    setBetween2days(true);
  };

  const [userSwitchBookTwoDay, setUserSwitchBookTwoDay] = useState(false);
  const handleToggle = (event) => {
    setUserSwitchBookTwoDay(event.target.checked);
  };

  // ========== Set weekend can't booking and set exam period that can booking ==========
  const weekend = (event) => {
    if (adminBTN == true) {
      return event >= today.setHours(0, 0, 0);
    } else {
      return !(event.getDay() == 6 || event.getDay() == 0);
    }
  };
  // ====================================================================================

  // ========== user fill and submit the form ==========
  // Collect data user type roomName
  const setNameOfRoom = (event) => {
    setRoomName(event.target.value);
    setInputRoom(true);
  };

  // Collect data user select roomType
  const setTypeOfRoom = (event) => {
    setRoomType(event.target.value);
    setSelectRoom(true);
    if (event.target.value === "Conference") {
      setNumberRoom(numberInRoomConferece);
    } else {
      setNumberRoom(numberInRoomMeeting);
    }
  };

  // Collect data user select roomNumber
  const setRoomofNumber = (event) => {
    setRoomNumber(event.target.value);
    setCanSelectDateTime(true);
  };

  // Collect data user select day
  const selectDay = (valueDay) => {
    setCheckSelectDay(true);
    setCollectDay(
      `${valueDay.getFullYear()}/${
        valueDay.getMonth() + 1
      }/${valueDay.getDate()}`
    );
    setDay(valueDay);
    setGetDay(valueDay.getDate());
    setGetMonth(valueDay.getMonth() + 1);
    setGetYear(valueDay.getFullYear());
    setGetTimeTo(null);
    setTimeFrom(null);
    setGetTimeTo(null);
    setTimeTo(null);
    setCheckValid(false);

    if (adminBTN) {
      if (
        isEqual(
          new Date(
            valueDay.getFullYear(),
            valueDay.getMonth(),
            valueDay.getDate()
          ),
          new Date(today.getFullYear(), today.getMonth(), today.getDate())
        )
      ) {
        if (getTime().getHours() == 0) {
          setMinTimeInThisDate(new Date(`1/1/1111 12:00 AM`));
        } else if (getTime().getHours() >= 1 && getTime().getHours() <= 11) {
          setMinTimeInThisDate(
            new Date(
              `1/1/1111 ${differenceInHours(
                new Date(
                  valueDay.getFullYear(),
                  valueDay.getMonth(),
                  valueDay.getDate(),
                  getTime().getHours(),
                  0,
                  0
                ),
                today
              )}:00 AM`
            )
          );
        } else if (getTime().getHours() == 12) {
          setMinTimeInThisDate(new Date(`1/1/1111 12:00 PM`));
        } else if (getTime().getHours() >= 13 && getTime().getHours() <= 23) {
          setMinTimeInThisDate(
            new Date(
              `1/1/1111 ${
                differenceInHours(
                  new Date(
                    valueDay.getFullYear(),
                    valueDay.getMonth(),
                    valueDay.getDate(),
                    getTime().getHours(),
                    0,
                    0
                  ),
                  today
                ) - 12
              }:00 PM`
            )
          );
        }
      } else {
        setMinTimeInThisDate(new Date("1/1/1111 12:00 AM"));
      }
    } else {
      if (
        isEqual(
          new Date(
            valueDay.getFullYear(),
            valueDay.getMonth(),
            valueDay.getDate()
          ),
          new Date(today.getFullYear(), today.getMonth(), today.getDate())
        )
      ) {
        if (getTime().getHours() >= 10 && getTime().getHours() <= 11) {
          setMinTimeInThisDate(
            new Date(
              `1/1/1111 ${differenceInHours(
                new Date(
                  valueDay.getFullYear(),
                  valueDay.getMonth(),
                  valueDay.getDate(),
                  getTime().getHours(),
                  0,
                  0
                ),
                today
              )}:00 AM`
            )
          );
        } else if (getTime().getHours() == 12) {
          setMinTimeInThisDate(new Date(`1/1/1111 12:00 PM`));
        } else if (getTime().getHours() >= 13 && getTime().getHours() <= 16) {
          setMinTimeInThisDate(
            new Date(
              `1/1/1111 ${
                differenceInHours(
                  new Date(
                    valueDay.getFullYear(),
                    valueDay.getMonth(),
                    valueDay.getDate(),
                    getTime().getHours(),
                    0,
                    0
                  ),
                  today
                ) - 12
              }:00 PM`
            )
          );
        } else {
          setMinTimeInThisDate(new Date(`1/1/1111 4:00 PM`));
        }
      } else {
        setMinTimeInThisDate(minTime);
      }
    }
  };

  // Collect data user select timeFrom
  const changeTimeFrom = (valueTime) => {
    setGetTimeFrom(valueTime.getHours());
    setTimeFrom(valueTime);
  };

  // Collect data user select timeTo
  const changeTimeTo = (valueTime) => {
    setGetTimeTo(valueTime.getHours());
    setTimeTo(valueTime);
  };

  // Save data from form
  const saveData = (event) => {
    event.preventDefault();
    sendEmail();
    setClickButton(true);
    sendDataBook(true);
    setCollectDay(getTime());
    setDay(null);
    setGetDay(null);
    setGetMonth(null);
    setGetYear(null);
    setRoomName("");
    setRoomType("default");
    setRoomNumber("default");
    setTimeFrom(null);
    setGetTimeFrom(null);
    setTimeTo(null);
    setGetTimeTo(null);
    setSelectRoom(false);
    setInputRoom(false);
    setDayTwo(null);
  };
  // ====================================================

  // ========== Get user data in database ==========
  const [dataShow, setDataShow] = useState([]);

  // Get data to show
  const getUserData = async () => {
    await getData((data) => {
      // setDataShow(data.fetchedUsers);
      setDataShow(data);
    });
  };
  // ===============================================

  // ========== Check user already booking? If had booking will not allow to booking again ==========
  const [canBookingAgain, setCanBookingAgain] = useState([]);
  function checkCanBookingAgain() {
    if (dataShow.length != 0) {
      setCanBookingAgain(
        dataShow.filter(
          (data) =>
            new Date(getTime().setHours(0, 0, 0)) <=
              new Date(data.date) <=
              new Date(addDays(getTime(), period).setHours(0, 0, 0)) &&
            Buffer.from(data.email, "base64").toString("utf-8") ==
              Buffer.from(
                JSON.parse(localStorage.getItem("dataForm")).email,
                "base64"
              ).toString("utf-8")
        )
      );
    }
  }
  // ===============================================================================================

  useEffect(() => {
    getUserData();
  }, []);

  // ========== Check room booking if have booking can't submit form ==========
  const mapItem =
    dataShow.length != 0
      ? dataShow.map((data) => {
          const calRoomNumberDay =
            String(data.roomType) == roomType &&
            String(data.roomNumber) == roomNumber &&
            Number(data.day) == getDay;
          const calTomeFrom =
            getTimeFrom >= Number(data.timeFrom) &&
            getTimeFrom < Number(data.timeTo);
          const calTimeTo =
            getTimeTo > Number(data.timeFrom) &&
            getTimeTo <= Number(data.timeTo);
          if (calRoomNumberDay) {
            if (calTomeFrom || calTimeTo) {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        })
      : [];
  // ==========================================================================

  // ========================= Send data in form to database =========================
  // Post data into database
  const addData = async () => {
    const title = JSON.parse(localStorage.getItem("dataForm")).title;
    const firstname = JSON.parse(localStorage.getItem("dataForm")).name;
    const surname = JSON.parse(localStorage.getItem("dataForm")).surname;
    await Axios.post("/api/add", {
      date: collectday,
      year: getYear,
      month: getMonth,
      day: getDay,
      title: title,
      firstname: firstname,
      surname: surname,
      email: email,
      cn: JSON.parse(localStorage.getItem("dataForm")).cn,
      roomName: roomName,
      roomType: roomType,
      roomNumber: roomNumber,
      timeFrom: getTimeFrom,
      timeTo: getTimeTo,
      between2days: between2days,
      inLibrary: inLibrary,
    }).then(async () => {
      toast.success("📖 Successfully!", {
        position: "bottom-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setDataShow([
        ...dataShow,
        {
          date: collectday,
          year: getYear,
          month: getMonth,
          day: getDay,
          title: title,
          firstname: firstname,
          surname: surname,
          email: email,
          cn: JSON.parse(localStorage.getItem("dataForm")).cn,
          roomName: roomName,
          roomType: roomType,
          roomNumber: roomNumber,
          timeFrom: getTimeFrom,
          timeTo: getTimeTo,
          between2days: between2days,
          inLibrary: inLibrary,
        },
      ]);
      await Axios.post("/api/addAllCustomer", {
        date: collectday,
        title: title,
        firstname: firstname,
        surname: surname,
        email: email,
        cn: JSON.parse(localStorage.getItem("dataForm")).cn,
        roomType: roomType,
        roomNumber: roomNumber,
        timeFrom: getTimeFrom,
        timeTo: getTimeTo,
      });
    });
  };
  // ==================================================================================

  // ========== Get data exam period in data base and set new day booking ==========
  async function getExamAdmin() {
    await getExamPeriod((data) => {
      const start = new Date(data[0].examStart);
      const end = new Date(data[0].examEnd);
      const boolean = data[0].isEnable;
      setAdminBTN(boolean);
      if (boolean == true) {
        setStartBookingDay(new Date(start));
        setEndBookingDay(new Date(end));
        setMinTime(new Date("1/1/1111 12:00 AM"));
        setMaxTime(new Date("1/1/1111 11:00 PM"));
        if (
          new Date(addDays(getTime(), 1).setHours(0, 0, 0)) ===
          new Date(addDays(end, 1).setHours(0, 0, 0))
        ) {
          setStartBookingDay(getTime());
          setEndBookingDay(addDays(getTime(), 2));
          setMinTime(new Date("1/1/1111 10:00 AM"));
          setMaxTime(new Date("1/1/1111 4:00 PM"));
        }
      } else {
        /* 
      If today is last day in exam period
          day will allow booking between 3 days
          time will allow booking between 10.00 - 16.00
      */
        setStartBookingDay(getTime());
        setEndBookingDay(addDays(getTime(), 2));
        setMinTime(new Date("1/1/1111 10:00 AM"));
        setMaxTime(new Date("1/1/1111 4:00 PM"));
      }
    });
  }
  // ==========================================================================

  if (
    new Date(
      getTime().getFullYear(),
      getTime().getMonth(),
      getTime().getDate()
    ) == day
  ) {
    setMinTime(
      new Date(
        getTime().getFullYear(),
        getTime().getMonth(),
        getTime().getDate(),
        getTime().getHours(),
        0,
        0
      )
    );
  }

  // ========== Set style sunmit btn ==========
  const [BTNCanBook, setBTNCanBook] = useState(false);
  const StyleBTN = BTNCanBook
    ? "bg-gradient-to-r from-[#0a4122] to-[#25a556]"
    : "bg-gradient-to-r from-[#FF0000] to-[#263238]";
  // ==========================================

  useEffect(() => {
    // Check user fill all form
    if (!userSwitchBookTwoDay) {
      const check =
        roomName.trim().length > 0 &&
        roomName.trim().length < 16 &&
        roomType !== "default" &&
        roomNumber !== "default" &&
        getTimeFrom !== null &&
        getTimeTo !== null &&
        checkTime >= 1 &&
        checkTime <= 3 &&
        checkSelectDay === true &&
        mapItem?.indexOf(false) === -1 &&
        clickButton === false &&
        canBookingAgain.length === 0;
      setCheckValid(check);
      if (check) {
        setBTNCanBook(true);
      } else {
        setBTNCanBook(false);
      }
    } else {
      // User toggle btn to booking between 2 days like 11:00 pm to 01:00 am
      const check =
        roomName.trim().length > 0 &&
        roomName.trim().length < 16 &&
        roomType !== "default" &&
        roomNumber !== "default" &&
        getTimeFrom !== null &&
        getTimeTo !== null &&
        day !== null &&
        dayTwo !== null &&
        ((isEqual(day, dayTwo) && checkTime >= 1 && checkTime <= 3) ||
          (!isEqual(day, dayTwo) &&
            Math.abs(
              differenceInHours(
                new Date(
                  day.getFullYear(),
                  day.getMonth(),
                  day.getDate(),
                  timeFrom.getHours(),
                  0,
                  0
                ),
                new Date(
                  dayTwo.getFullYear(),
                  dayTwo.getMonth(),
                  dayTwo.getDate(),
                  timeTo.getHours(),
                  0,
                  0
                )
              )
            ) <= 3)) &&
        checkSelectDay === true &&
        mapItem?.indexOf(false) === -1 &&
        clickButton === false &&
        canBookingAgain.length === 0;
      setCheckValid(check);
      if (check) {
        setBTNCanBook(true);
      } else {
        setBTNCanBook(false);
      }
    }
    // Set session and email
    setSession(JSON.parse(localStorage.getItem("dataForm")));
    setEmail(JSON.parse(localStorage.getItem("dataForm")).email);
    /*
    If admin allow exam peroid
        day will allow booking by admin
        time will allow booking between 00.00 - 23.59
    */
    checkCanBookingAgain();
  }, [
    roomName,
    roomType,
    roomNumber,
    timeFrom,
    getTimeFrom,
    getTimeTo,
    timeTo,
    day,
    dayTwo,
    checkTime,
    checkSelectDay,
    userSwitchBookTwoDay,
  ]);

  useEffect(() => {
    getExamAdmin();
  }, []);

  // ========== Send Email ==========
  const sendEmail = async () => {
    const fullname =
      Buffer.from(
        JSON.parse(localStorage.getItem("dataForm")).title,
        "base64"
      ).toString("utf-8") +
      Buffer.from(
        JSON.parse(localStorage.getItem("dataForm")).name,
        "base64"
      ).toString("utf-8") +
      " " +
      Buffer.from(
        JSON.parse(localStorage.getItem("dataForm")).surname,
        "base64"
      ).toString("utf-8");
    await Axios.post("/api/email", {
      email: Buffer.from(
        JSON.parse(localStorage.getItem("dataForm")).email,
        "base64"
      ).toString("utf-8"),
      name: fullname,
      roomName: roomName,
      roomType: roomType,
      roomNumber: roomNumber,
      date: collectday,
      getTimeFrom: `${getTimeFrom}:00`,
      getTimeTo: `${getTimeTo}:00`,
    });
  };

  // =================================

  // ========== Toastify noti when user had been booking or someone already booking that room ==========
  const [showHaveBooking, setShowHaveBooking] = useState({
    someone: true,
    you: true,
  });

  if (
    canBookingAgain.length === 0 &&
    mapItem?.indexOf(false) !== -1 &&
    showHaveBooking.someone
  ) {
    setShowHaveBooking({ you: true });
    toast.error("❌ Sorry, this room was already booked", {
      position: "bottom-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setShowHaveBooking({ someone: false });
  } else if (canBookingAgain.length !== 0 && showHaveBooking.you) {
    setShowHaveBooking({ someone: true });
    toast.error("❌ You already booked", {
      position: "bottom-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setShowHaveBooking({ you: false });
  }
  // ====================================================================================================

  const checkEN =
    session &&
    Buffer.from(session.faculty, "base64").toString("utf-8") ==
      "คณะวิศวกรรมศาสตร์"
      ? false
      : true;

  return (
    <div className="w-full h-full lg:h-screen dark:bg-[#282a36] uppercase">
      <div
        id="book"
        className="max-w-[90%] m-auto px-2 lg:py-[120px] py-[120px] w-full"
      >
        <p className="text-xl tracking-widest uppercase text-[red]"></p>
        <h2 className=" tracking-wide py-4 text-center dark:text-[white]">
          {" "}
          Booking Page
        </h2>
        <div className="grid lg:grid-cols-5 gap-8 mt-5">
          {/* left */}

          <div className="col-span-3 lg:col-span-2 w-full mx-auto h-full shadow-lg shadow-gray-400 dark:shadow-[black] dark:bg-[#202020] bg-[#F2F2F2] rounded-xl p4">
            <form onSubmit={saveData}>
              <div className="grid md:grid-cols-1 gap-4 w-full py-3">
                <div className="px-3 py-2 ">
                  <label
                    htmlFor="reservationName"
                    className="mx-1 block mb-2 text-base font-medium text-gray-900 dark:text-white"
                  >
                    Reservation Name
                  </label>
                  <input
                    name="Reservation_Name"
                    type="text"
                    id="reservationName"
                    autoComplete="off"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your Reservation's Name (Max length 15)"
                    onChange={setNameOfRoom}
                    value={roomName}
                    disabled={checkEN}
                  />
                  {roomName && roomName.trim().length > 15 && (
                    <div className=" mx-1 block mb-2 text-red-400 -mt-3 text-sm">
                      Reservation Name must less than 15 Characters
                    </div>
                  )}
                  <div className="text-lg dark:text-[white]">
                    <label
                      htmlFor="typeRoom"
                      className="mx-1 block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                      Type Of Room
                    </label>
                    <select
                      name="Type_Of_Room"
                      id="typeRoom"
                      autoComplete="off"
                      className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={setTypeOfRoom}
                      value={roomType}
                      disabled={!inputRoom}
                    >
                      <option value="default" hidden>
                        Select Room Type
                      </option>

                      {typeRoom.map((type) => (
                        <option value={type.value} key={uuid()}>
                          {type.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-lg  dark:text-[white]">
                    <label
                      htmlFor="roomType"
                      className="mx-1 block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    >
                      Number Of Rooms
                    </label>
                    <select
                      name="Number_Of_Room"
                      id="roomType"
                      autoComplete="off"
                      className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={setRoomofNumber}
                      value={roomNumber}
                      disabled={!selectRoom}
                    >
                      <option value="default" hidden>
                        Select Room Number
                      </option>

                      {numberRoom.map((number) => (
                        <option value={number.value} key={uuid()}>
                          {number.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*====================== DATE ========================== */}
                  <div className="text-lg uppercase dark:text-white">
                    <label className="mx-1 block mb-2 text-base font-medium text-gray-900 dark:text-white">
                      Date &#40;MM/DD/YYYY&#41;
                    </label>

                    <div className="max-w-lg ">
                      {!adminBTN ? (
                        <>
                          <DatePicker
                            name="Date"
                            className="relative bg-gray-50 border mb-3 border-gray-300  rounded-lg  bg-transparent  px-4 py-[0.32rem] text-sm leading-[2.1] outline-none  focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholderText="Select Date"
                            autoComplete="off"
                            selected={day}
                            onChange={selectDay}
                            minDate={startBookingDay}
                            maxDate={addDays(startBookingDay, period)}
                            filterDate={weekend}
                            disabled={!canSelectDateTime}
                            datepicker
                          />
                        </>
                      ) : (
                        <>
                          {userSwitchBookTwoDay ? (
                            <div className="flex md:flex-row flex-col">
                              <DatePicker
                                name="Date"
                                className="relative bg-gray-50 border mb-3 border-gray-300 mr-5 rounded-lg  bg-transparent  px-4 py-[0.32rem] text-sm leading-[2.1] outline-none  focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholderText="Select Date"
                                autoComplete="off"
                                selected={day}
                                onChange={selectDay}
                                minDate={startBookingDay}
                                maxDate={addDays(startBookingDay, period)}
                                filterDate={weekend}
                                disabled={!canSelectDateTime}
                                datepicker
                              />
                              <DatePicker
                                name="Date"
                                className="relative bg-gray-50 border mb-3 border-gray-300  rounded-lg  bg-transparent  px-4 py-[0.32rem] text-sm leading-[2.1] outline-none  focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholderText="Select Date"
                                autoComplete="off"
                                selected={dayTwo}
                                onChange={hladleDayTwo}
                                minDate={tomorrow}
                                maxDate={addDays(startBookingDay, period)}
                                filterDate={weekend}
                                disabled={!canSelectDateTime}
                                datepicker
                              />
                              <div className="flex -mt-3 md:mt-0">
                                <Switch
                                  {...label}
                                  onClick={handleToggle}
                                  checked={true}
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex md:flex-row flex-col">
                                <DatePicker
                                  name="Date"
                                  className="relative bg-gray-50 border mb-3 border-gray-300 rounded-lg  bg-transparent  px-4 py-[0.32rem] text-sm leading-[2.1] outline-none  focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholderText="Select Date"
                                  autoComplete="off"
                                  selected={day}
                                  onChange={selectDay}
                                  minDate={startBookingDay}
                                  maxDate={addDays(startBookingDay, period)}
                                  filterDate={weekend}
                                  disabled={!canSelectDateTime}
                                  datepicker
                                />
                                <div className="flex -mt-3 md:mt-0">
                                  <Switch
                                    {...label}
                                    onClick={handleToggle}
                                    checked={false}
                                  />
                                </div>
                              </div>
                              <div className="mx-1 block mb-2 text-red-400 md:-mt-3 text-sm">
                                Toggle for overnight booking example 23:00 -
                                01:00{" "}
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  {/* ====================== DATE COPPY========================== */}

                  <div
                    // date-rangepicker
                    className="flex items-center justify-start"
                  >
                    <div className="relative">
                      <label className="mx-1 block mb-2 text-base font-medium text-gray-900 dark:text-white w-max">
                        Time Start
                      </label>

                      <DatePicker
                        name="Time_Start"
                        className="flex col-12 relative bg-gray-50 border mb-3 border-gray-300 pl-4 rounded-lg  bg-transparent px-3 w-full  py-[0.32rem] text-sm leading-[2.1] outline-none  focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholderText="Time Start (Max 3 Hrs)"
                        autoComplete="off"
                        selected={timeFrom}
                        onChange={changeTimeFrom}
                        showTimeSelect
                        showTimeSelectOnly
                        minTime={minTimeInThisDate}
                        maxTime={maxTime}
                        timeIntervals={60}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        disabled={!canSelectDateTime}
                      />
                    </div>
                    <div>
                      <label className="block mb-5 text-base font-medium text-gray-900 dark:text-white">
                        {" "}
                      </label>
                      <span className="mx-4 text-gray-500 col-2 items-center justify-center dark:text-white">
                        To
                      </span>
                    </div>
                    <div className="relative ">
                      <label className="block mx-1 mb-2 text-base font-medium text-gray-900 dark:text-white w-max">
                        Time End{" "}
                      </label>

                      <DatePicker
                        name="Time_End"
                        type="text"
                        className="flex col-12 relative bg-gray-50 border mb-3 border-gray-300 pl-4 rounded-lg  bg-transparent px-3 w-full  py-[0.32rem] text-sm leading-[2.1] outline-none  focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholderText="Time End (Max 3 Hrs)"
                        autoComplete="off"
                        selected={timeTo}
                        onChange={changeTimeTo}
                        showTimeSelect
                        showTimeSelectOnly
                        minTime={minTime}
                        maxTime={maxTime}
                        timeIntervals={60}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        disabled={!canSelectDateTime}
                      />
                    </div>
                  </div>
                  {(checkTime > 3 ||
                    (userSwitchBookTwoDay &&
                      day &&
                      dayTwo &&
                      timeFrom &&
                      timeTo &&
                      Math.abs(
                        differenceInHours(
                          new Date(
                            day.getFullYear(),
                            day.getMonth(),
                            day.getDate(),
                            timeFrom.getHours(),
                            0,
                            0
                          ),
                          new Date(
                            dayTwo.getFullYear(),
                            dayTwo.getMonth(),
                            dayTwo.getDate(),
                            timeTo.getHours(),
                            0,
                            0
                          )
                        )
                      ) > 3)) && (
                    <div className=" mx-1 block mb-2 text-red-400 -mt-3 text-sm">
                      Max 3 Hours
                    </div>
                  )}
                  {((userSwitchBookTwoDay == false &&
                    checkTime < 1 &&
                    timeFrom &&
                    timeTo &&
                    day) ||
                    (userSwitchBookTwoDay &&
                      day &&
                      dayTwo &&
                      isEqual(day, dayTwo) &&
                      checkTime < 1 &&
                      timeFrom &&
                      timeTo)) && (
                    <div className=" mx-1 block mb-2 text-red-400 -mt-3 text-sm">
                      Please select time properly
                    </div>
                  )}
                </div>
                <div className="px-[30%] text-center -mt-5 md:-mt-5">
                  <button
                    onClick={addData}
                    disabled={!checkValid}
                    className={`w-full p-4 py-4 px-7 rounded-full uppercase cursor-pointer hover:scale-[95%] ease-in duration-100 text-base tracking-widest font-semibold text-white shadow-gray-400 dark:shadow-[black] shadow-xl ${StyleBTN}`}
                    // className="w-full p-4 py-4 px-7 rounded-full uppercase cursor-pointer hover:scale-[95%] ease-in duration-100 text-base tracking-widest font-semibold text-white shadow-gray-400 dark:shadow-[black] shadow-xl  bg-gradient-to-r from-[#0a4122] to-[#25a556]"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* right */}

          <div className="col-span-3 w-full h-auto shadow-lg shadow-gray-400 dark:shadow-[black] rounded-xl md:p-4 dark:bg-[#202020] bg-[#F2F2F2]">
            <div>
              <div>
                <div className="lg:pl-2 h-full m-5">
                  <Image
                    src="../../assets/libranameroomV3.svg"
                    width={780}
                    height={200}
                    style={{ inset: "10px" }}
                    alt="/"
                  ></Image>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
