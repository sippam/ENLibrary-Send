import React, { useState, useEffect } from "react";
import Axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "react-datepicker/dist/react-datepicker.css";
import AdminSetting from "./AdminSetting";
import { getData } from "../../data/dataUserAndAdmin";
import { getTime } from "../../data/localTimezone";
import { addDays } from "date-fns";
import Login from "./Login";
import { useRouter } from "next/router";

const table = (admin) => {
  // ========== Check admin login ==========
  const router = useRouter();
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
      setDataShow(data.fetchedUsers);
    });
  };
  // =================================================

  // ========== Delete booking ==========
  const deleteBooking = async (
    id,
    date,
    email,
    // roomName,
    roomType,
    roomNumber,
    timeFrom,
    timeTo
  ) => {
    await Axios.delete(`/api/add?id=${id}`).then(() => {
      setDataShow(
        dataShow.filter((val) => {
          return val._id != id;
        })
      );
    });
    await Axios.delete(
      `/api/addAllCustomer?date=${date}&email=${email}&roomType=${roomType}&roomNumber=${roomNumber}&timeFrom=${timeFrom}&timeTo=${timeTo}`
      // &roomName=${roomName}
    );
  };
  // ====================================

  // ========== Get exam period from database ==========
  async function getExamDay() {
    await Axios.get("/api/examPeriod").then((res) => {
      if (res.data.getDataExam[0].isEnable === true) {
        setStartBooking(new Date(res.data.getDataExam[0].examStart));
        setEndBooking(new Date(res.data.getDataExam[0].examEnd));
      } else {
        setStartBooking(getTime());
        setEndBooking(addDays(getTime(), 2));
      }
    });
  }
  // ===================================================

  const [windowwidth,setWindowwidth] = useState(1000)
  useEffect(() => {
    setWindowwidth(window.innerWidth)
  })

  useEffect(() => {
    getExamDay();
    getUserData();
    if (!isAdmin) {
      router.push("/");
    }
  }, []);

  // ========== Show date in dropdown ==========
  const showPeriodDay = [];
  const showPeriodMonth = [];
  for (let i = 0; i <= periodBooking; i++) {
    showPeriodDay.push(addDays(startBooking, i).getDate());
    showPeriodMonth.push(addDays(startBooking, i).getMonth() + 1); // + 1 because month start at 0
  }
  const showMonth = [...new Set(showPeriodMonth)];
  // ===========================================

  // ========== Select date and month in dropdown ==========
  const [date, setDate] = React.useState(getTime().getDate());
  const [month, setMonth] = React.useState(getTime().getMonth() + 1);

  const selectDay = (event) => {
    setDate(event.target.value);
  };
  const selectMonth = (event) => {
    setMonth(event.target.value);
  };
  // =======================================================

  const [alignment, setAlignment] = useState("Conference");

  const changeTypeRoom = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // ========== Filter data to show when select day in dropdown and select type room ==========
  const match = alignment == "Conference" ? true : false;
  let con1,
    con2,
    con3,
    meet1,
    meet2,
    meet3,
    meet4 = [];
  if (dataShow !== undefined) {
    con1 = dataShow.filter((data) => {
      if (
        data.roomType == "Conference" &&
        data.roomNumber == 1 &&
        data.day == date &&
        data.month == month
      ) {
        return data;
      }
    });

    con2 = dataShow.filter((data) => {
      if (
        data.roomType == "Conference" &&
        data.roomNumber == 2 &&
        data.day == date &&
        data.month == month
      ) {
        return data;
      }
    });

    con3 = dataShow.filter((data) => {
      if (
        data.roomType == "Conference" &&
        data.roomNumber == 3 &&
        data.day == date &&
        data.month == month
      ) {
        return data;
      }
    });

    meet1 = dataShow.filter((data) => {
      if (
        data.roomType == "Meeting" &&
        data.roomNumber == 1 &&
        data.day == date &&
        data.month == month
      ) {
        return data;
      }
    });

    meet2 = dataShow.filter((data) => {
      if (
        data.roomType == "Meeting" &&
        data.roomNumber == 2 &&
        data.day == date &&
        data.month == month
      ) {
        return data;
      }
    });

    meet3 = dataShow.filter((data) => {
      if (
        data.roomType == "Meeting" &&
        data.roomNumber == 3 &&
        data.day == date &&
        data.month == month
      ) {
        return data;
      }
    });
    meet4 = dataShow.filter((data) => {
      if (
        data.roomType == "Meeting" &&
        data.roomNumber == 4 &&
        data.day == date &&
        data.month == month
      ) {
        return data;
      }
    });
  }
  // ========================================================================================
  if (isAdmin) {
    return (
      <div className="relative max-w-screen-[100%] mx-auto dark:bg-[#282a36]">
        {windowwidth > 628 ? (
          <div className="flex px-0 justify-end items-center dark:bg-[#282a36]">
            <div className="m-10 dark:bg-[#282a36]">
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={changeTypeRoom}
                aria-label="Platform"
              >
                <ToggleButton value="Conference" className="dark:text-white">
                  Conference
                </ToggleButton>
                <ToggleButton value="Meeting" className="dark:text-white">
                  Meeting
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className="mr-10 flex">
              <Box sx={{ minWidth: 80 }}>
                <FormControl>
                  <InputLabel
                    id="demo-simple-select-label"
                    className="dark:text-white"
                  >
                    Month
                  </InputLabel>

                  <Select
                    className="dark:text-white px-1"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    label="Date"
                    onChange={selectMonth}
                  >
                    {showMonth.map((data, key) => {
                      return (
                        <MenuItem key={key} value={data}>
                          {data}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ minWidth: 80 }}>
                <FormControl>
                  <InputLabel
                    id="demo-simple-select-label"
                    className="dark:text-white"
                  >
                    Date
                  </InputLabel>

                  <Select
                    className="dark:text-white"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={date}
                    label="Date"
                    onChange={selectDay}
                  >
                    {showPeriodDay.map((data, key) => {
                      return (
                        <MenuItem value={data} key={key}>
                          {data}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <AdminSetting admin={admin.admin} />
          </div>
        ) : (
          <>
            <div className="flex px-0 justify-end items-center dark:bg-[#282a36]">
              <div className="m-5 dark:bg-[#282a36]">
                <ToggleButtonGroup
                  orientation="vertical"
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={changeTypeRoom}
                  aria-label="Platform"
                >
                  <ToggleButton value="Conference" className="dark:text-white">
                    Conference
                  </ToggleButton>
                  <ToggleButton value="Meeting" className="dark:text-white">
                    Meeting
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              <div className="mr-2 flex">
                <Box sx={{ minWidth: 80 }}>
                  <FormControl>
                    <InputLabel
                      id="demo-simple-select-label"
                      className="dark:text-white"
                    >
                      Month
                    </InputLabel>

                    <Select
                      className="dark:text-white px-1"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={month}
                      label="Date"
                      onChange={selectMonth}
                    >
                      {showMonth.map((data, key) => {
                        return (
                          <MenuItem key={key} value={data}>
                            {data}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ minWidth: 80 }}>
                  <FormControl>
                    <InputLabel
                      id="demo-simple-select-label"
                      className="dark:text-white"
                    >
                      Date
                    </InputLabel>

                    <Select
                      className="dark:text-white"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={date}
                      label="Date"
                      onChange={selectDay}
                    >
                      {showPeriodDay.map((data, key) => {
                        return (
                          <MenuItem value={data} key={key}>
                            {data}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <AdminSetting admin={admin.admin} />
          </>
        )}

        <div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-[white]">
            <tbody>
              {match ? (
                <>
                  <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
                    <th className="border justify-center items-center text-center py-4">
                      Conference 1
                    </th>
                    {con1 !== undefined &&
                      con1.map((data, key) => {
                        return (
                          <div key={key}>
                            <td className="px-3 py-2 border justify-center items-center text-center">
                              <div className="header">
                                <h4>Reservation Name : {data.roomName}</h4>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
                                <span className="description">
                                  <p>Date : {data.day}</p>
                                  <p>Name : {data.name}</p>
                                  <p>Email : {data.email}</p>
                                  <button
                                    className="px-2 py-1 rounded-full cursor-pointer text-sm tracking-widest font-semibold text-white shadow-gray-400 dark:shadow-[black] shadow-xl bg-gradient-to-r from-[#FF0000] to-[#263238] uppercase"
                                    onClick={() => {
                                      deleteBooking(
                                        data._id,
                                        data.date,
                                        data.email,
                                        // data.roomName,
                                        data.roomType,
                                        data.roomNumber,
                                        data.timeFrom,
                                        data.timeTo
                                      );
                                    }}
                                  >
                                    delete
                                  </button>
                                </span>
                              </div>
                            </td>
                          </div>
                        );
                      })}
                  </tr>
                  <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
                    <th className="border justify-center items-center text-center py-4">
                      Conference 2
                    </th>
                    {con2 !== undefined &&
                      con2.map((data, key) => {
                        return (
                          <div key={key}>
                            <td className=" px-3 py-2 border justify-center items-center text-center">
                              <div className="header">
                                <h4>Reservation Name : {data.roomName}</h4>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
                                <span className="description">
                                  <p>Date : {data.day}</p>
                                  <p>Name : {data.name}</p>
                                  <p>Email : {data.email}</p>
                                  <button
                                    className="px-2 py-1 rounded-full cursor-pointer text-sm tracking-widest font-semibold text-white shadow-gray-400 dark:shadow-[black] shadow-xl bg-gradient-to-r from-[#FF0000] to-[#263238] uppercase"
                                    onClick={() => {
                                      deleteBooking(
                                        data._id,
                                        data.date,
                                        data.email,
                                        // data.roomName,
                                        data.roomType,
                                        data.roomNumber,
                                        data.timeFrom,
                                        data.timeTo
                                      );
                                    }}
                                  >
                                    delete
                                  </button>
                                </span>
                              </div>
                            </td>
                          </div>
                        );
                      })}
                  </tr>
                  <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
                    <th className="border justify-center items-center text-center py-4">
                      Conference 3
                    </th>
                    {con3 !== undefined &&
                      con3.map((data, key) => {
                        return (
                          <div key={key}>
                            <td className=" px-3 py-2 border justify-center items-center text-center">
                              <div className="header">
                                <h4>Reservation Name : {data.roomName}</h4>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
                                <span className="description">
                                  <p className="py-0">Date : {data.day}</p>
                                  <p className="py-0">Name : {data.name}</p>
                                  <p className="py-0">Email : {data.email}</p>
                                  <button
                                    className="px-2 py-1 hover:scale-[95%] ease-in rounded-full cursor-pointer text-sm tracking-widest font-semibold text-white shadow-gray-400 dark:shadow-[black] shadow-xl bg-gradient-to-r from-[#FF0000] to-[#263238] uppercase"
                                    onClick={() => {
                                      deleteBooking(
                                        data._id,
                                        data.date,
                                        data.email,
                                        // data.roomName,
                                        data.roomType,
                                        data.roomNumber,
                                        data.timeFrom,
                                        data.timeTo
                                      );
                                    }}
                                  >
                                    delete
                                  </button>
                                </span>
                              </div>
                            </td>
                          </div>
                        );
                      })}
                  </tr>
                </>
              ) : (
                <>
                  <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
                    <th className="border justify-center items-center text-center py-4">
                      Meeting 1
                    </th>
                    {meet1 !== undefined &&
                      meet1.map((data, key) => {
                        return (
                          <div key={key}>
                            <td className=" px-3 py-2 border justify-center items-center text-center">
                              <div className="header">
                                <h4>Reservation Name : {data.roomName}</h4>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
                                <span className="description">
                                  <p>Date : {data.day}</p>
                                  <p>Name : {data.name}</p>
                                  <p>Email : {data.email}</p>
                                  <button
                                    className="px-2 py-1 rounded-full cursor-pointer text-sm tracking-widest font-semibold text-white shadow-gray-400 dark:shadow-[black] shadow-xl bg-gradient-to-r from-[#FF0000] to-[#263238] uppercase"
                                    onClick={() => {
                                      deleteBooking(
                                        data._id,
                                        data.date,
                                        data.email,
                                        // data.roomName,
                                        data.roomType,
                                        data.roomNumber,
                                        data.timeFrom,
                                        data.timeTo
                                      );
                                    }}
                                  >
                                    delete
                                  </button>
                                </span>
                              </div>
                            </td>
                          </div>
                        );
                      })}
                  </tr>
                  <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
                    <th className="border justify-center items-center text-center py-4">
                      Meeting 2
                    </th>
                    {meet2 !== undefined &&
                      meet2.map((data, key) => {
                        return (
                          <div key={key}>
                            <td className=" px-3 py-2 border justify-center items-center text-center">
                              <div className="header">
                                <h4>Reservation Name : {data.roomName}</h4>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
                                <span className="description">
                                  <p>Date : {data.day}</p>
                                  <p>Name : {data.name}</p>
                                  <p>Email : {data.email}</p>
                                  <button
                                    className="px-2 py-1 rounded-full cursor-pointer text-sm tracking-widest font-semibold text-white shadow-gray-400 dark:shadow-[black] shadow-xl bg-gradient-to-r from-[#FF0000] to-[#263238] uppercase"
                                    onClick={() => {
                                      deleteBooking(
                                        data._id,
                                        data.date,
                                        data.email,
                                        // data.roomName,
                                        data.roomType,
                                        data.roomNumber,
                                        data.timeFrom,
                                        data.timeTo
                                      );
                                    }}
                                  >
                                    delete
                                  </button>
                                </span>
                              </div>
                            </td>
                          </div>
                        );
                      })}
                  </tr>
                  <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
                    <th className="border justify-center items-center text-center py-4">
                      Meeting 3
                    </th>
                    {meet3 !== undefined &&
                      meet3.map((data, key) => {
                        return (
                          <div key={key}>
                            <td className=" px-3 py-2 border justify-center items-center text-center">
                              <div className="header">
                                <h4>Reservation Name : {data.roomName}</h4>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
                                <span className="description">
                                  <p>Date : {data.day}</p>
                                  <p>Name : {data.name}</p>
                                  <p>Email : {data.email}</p>
                                  <button
                                    className="px-2 py-1 rounded-full cursor-pointer text-sm tracking-widest font-semibold text-white shadow-gray-400 dark:shadow-[black] shadow-xl bg-gradient-to-r from-[#FF0000] to-[#263238] uppercase"
                                    onClick={() => {
                                      deleteBooking(
                                        data._id,
                                        data.date,
                                        data.email,
                                        // data.roomName,
                                        data.roomType,
                                        data.roomNumber,
                                        data.timeFrom,
                                        data.timeTo
                                      );
                                    }}
                                  >
                                    delete
                                  </button>
                                </span>
                              </div>
                            </td>
                          </div>
                        );
                      })}
                  </tr>
                  <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
                    <th className="border justify-center items-center text-center py-4">
                      Meeting 4
                    </th>
                    {meet4 !== undefined &&
                      meet4.map((data, key) => {
                        return (
                          <div key={key}>
                            <td className=" px-3 py-2 border justify-center items-center text-center">
                              <div className="header ">
                                <h4>Reservation Name : {data.roomName}</h4>
                                <p>
                                  Period : {data.timeFrom}:00 - {data.timeTo}
                                  :00
                                </p>
                                <span className="description">
                                  <p>Date : {data.day}</p>
                                  <p>Name : {data.name}</p>
                                  <p>Email : {data.email}</p>
                                  <button
                                    className="px-2 py-1 rounded-full cursor-pointer text-sm tracking-widest font-semibold text-white shadow-gray-400 dark:shadow-[black] shadow-xl bg-gradient-to-r from-[#FF0000] to-[#263238] uppercase"
                                    onClick={() => {
                                      deleteBooking(
                                        data._id,
                                        data.date,
                                        data.email,
                                        // data.roomName,
                                        data.roomType,
                                        data.roomNumber,
                                        data.timeFrom,
                                        data.timeTo
                                      );
                                    }}
                                  >
                                    delete
                                  </button>
                                </span>
                              </div>
                            </td>
                          </div>
                        );
                      })}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return <Login />;
  }

  // return (
  //   <>
  //     {isAdmin ? (
  //       <div className="relative max-w-screen-[100%] mx-auto dark:bg-[#282a36]">
  //         <div className="flex px-0 justify-end items-center dark:bg-[#282a36]">
  //           <div className="m-10 dark:bg-[#282a36]">
  //             <ToggleButtonGroup
  //               color="primary"
  //               value={alignment}
  //               exclusive
  //               onChange={changeTypeRoom}
  //               aria-label="Platform"
  //             >
  //               <ToggleButton value="Conference" className="dark:text-white">
  //                 Conference
  //               </ToggleButton>
  //               <ToggleButton value="Meeting" className="dark:text-white">
  //                 Meeting
  //               </ToggleButton>
  //             </ToggleButtonGroup>
  //           </div>
  //           <div className="mr-10 flex">
  //             <Box sx={{ minWidth: 80 }}>
  //               <FormControl>
  //                 <InputLabel
  //                   id="demo-simple-select-label"
  //                   className="dark:text-white"
  //                 >
  //                   Month
  //                 </InputLabel>

  //                 <Select
  //                   className="dark:text-white px-1"
  //                   labelId="demo-simple-select-label"
  //                   id="demo-simple-select"
  //                   value={month}
  //                   label="Date"
  //                   onChange={selectMonth}
  //                 >
  //                   {showMonth.map((data, key) => {
  //                     return (
  //                       <MenuItem key={key} value={data}>
  //                         {data}
  //                       </MenuItem>
  //                     );
  //                   })}
  //                 </Select>
  //               </FormControl>
  //             </Box>

  //             <Box sx={{ minWidth: 80 }}>
  //               <FormControl>
  //                 <InputLabel
  //                   id="demo-simple-select-label"
  //                   className="dark:text-white"
  //                 >
  //                   Date
  //                 </InputLabel>

  //                 <Select
  //                   className="dark:text-white"
  //                   labelId="demo-simple-select-label"
  //                   id="demo-simple-select"
  //                   value={date}
  //                   label="Date"
  //                   onChange={selectDay}
  //                 >
  //                   {showPeriodDay.map((data, key) => {
  //                     return (
  //                       <MenuItem value={data} key={key}>
  //                         {data}
  //                       </MenuItem>
  //                     );
  //                   })}
  //                 </Select>
  //               </FormControl>
  //             </Box>
  //           </div>
  //           <AdminSetting admin={admin.admin}/>
  //         </div>

  //         <div>
  //           <table className="w-full text-sm text-left text-gray-500 dark:text-[white]">
  //             <tbody>
  //               {match ? (
  //                 <>
  //                   <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
  //                     <th className="border justify-center items-center text-center">
  //                       Conference 1
  //                     </th>
  //                     {con1 !== undefined &&
  //                       con1.map((data, key) => {
  //                         return (
  //                           <div key={key}>
  //                             <td className="px-3 py-2 border justify-center items-center text-center">
  //                               <div className="header">
  //                                 <h4>Reservation Name : {data.roomName}</h4>
  //                                 <p>
  //                                   Period : {data.timeFrom}:00 - {data.timeTo}
  //                                   :00
  //                                 </p>
  //                                 <span className="description">
  //                                   <p>Date : {data.day}</p>
  //                                   <p>Name : {data.name}</p>
  //                                   <p>Email : {data.email}</p>
  //                                   <button
  //                                     className="delete-btn uppercase"
  //                                     onClick={() => {
  //                                       deleteBooking(
  //   val._id,
  //   val.date,
  //   val.email,
  //   val.roomName,
  //   val.roomType,
  //   val.roomNumber,
  //   val.timeFrom,
  //   val.timeTo
  // );
  //                                     }}
  //                                   >
  //                                     delete
  //                                   </button>
  //                                 </span>
  //                               </div>
  //                             </td>
  //                           </div>
  //                         );
  //                       })}
  //                   </tr>
  //                   <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
  //                     <th className="border justify-center items-center text-center">
  //                       Conference 2
  //                     </th>
  //                     {con2 !== undefined &&
  //                       con2.map((data, key) => {
  //                         return (
  //                           <div key={key}>
  //                             <td className=" px-3 py-2 border justify-center items-center text-center">
  //                               <div className="header">
  //                                 <h4>Reservation Name : {data.roomName}</h4>
  //                                 <p>
  //                                   Period : {data.timeFrom}:00 - {data.timeTo}
  //                                   :00
  //                                 </p>
  //                                 <span className="description">
  //                                   <p>Date : {data.day}</p>
  //                                   <p>Name : {data.name}</p>
  //                                   <p>Email : {data.email}</p>
  //                                   <button
  //                                     className="delete-btn uppercase"
  //                                     onClick={() => {
  //                                       deleteBooking(
  //   val._id,
  //   val.date,
  //   val.email,
  //   val.roomName,
  //   val.roomType,
  //   val.roomNumber,
  //   val.timeFrom,
  //   val.timeTo
  // );
  //                                     }}
  //                                   >
  //                                     delete
  //                                   </button>
  //                                 </span>
  //                               </div>
  //                             </td>
  //                           </div>
  //                         );
  //                       })}
  //                   </tr>
  //                   <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
  //                     <th className="border justify-center items-center text-center">
  //                       Conference 3
  //                     </th>
  //                     {con3 !== undefined &&
  //                       con3.map((data, key) => {
  //                         return (
  //                           <div key={key}>
  //                             <td className=" px-3 py-2 border justify-center items-center text-center">
  //                               <div className="header">
  //                                 <h4>Reservation Name : {data.roomName}</h4>
  //                                 <p>
  //                                   Period : {data.timeFrom}:00 - {data.timeTo}
  //                                   :00
  //                                 </p>
  //                                 <span className="description">
  //                                   <p>Date : {data.day}</p>
  //                                   <p>Name : {data.name}</p>
  //                                   <p>Email : {data.email}</p>
  //                                   <button
  //                                     className="delete-btn uppercase"
  //                                     onClick={() => {
  //                                       deleteBooking(
  //   val._id,
  //   val.date,
  //   val.email,
  //   val.roomName,
  //   val.roomType,
  //   val.roomNumber,
  //   val.timeFrom,
  //   val.timeTo
  // );
  //                                     }}
  //                                   >
  //                                     delete
  //                                   </button>
  //                                 </span>
  //                               </div>
  //                             </td>
  //                           </div>
  //                         );
  //                       })}
  //                   </tr>
  //                 </>
  //               ) : (
  //                 <>
  //                   <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
  //                     <th className="border justify-center items-center text-center">
  //                       Meeting 1
  //                     </th>
  //                     {meet1 !== undefined &&
  //                       meet1.map((data, key) => {
  //                         return (
  //                           <div key={key}>
  //                             <td className=" px-3 py-2 border justify-center items-center text-center">
  //                               <div className="header">
  //                                 <h4>Reservation Name : {data.roomName}</h4>
  //                                 <p>
  //                                   Period : {data.timeFrom}:00 - {data.timeTo}
  //                                   :00
  //                                 </p>
  //                                 <span className="description">
  //                                   <p>Date : {data.day}</p>
  //                                   <p>Name : {data.name}</p>
  //                                   <p>Email : {data.email}</p>
  //                                   <button
  //                                     className="delete-btn uppercase"
  //                                     onClick={() => {
  //                                       deleteBooking(
  //   val._id,
  //   val.date,
  //   val.email,
  //   val.roomName,
  //   val.roomType,
  //   val.roomNumber,
  //   val.timeFrom,
  //   val.timeTo
  // );
  //                                     }}
  //                                   >
  //                                     delete
  //                                   </button>
  //                                 </span>
  //                               </div>
  //                             </td>
  //                           </div>
  //                         );
  //                       })}
  //                   </tr>
  //                   <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
  //                     <th className="border justify-center items-center text-center">
  //                       Meeting 2
  //                     </th>
  //                     {meet2 !== undefined &&
  //                       meet2.map((data, key) => {
  //                         return (
  //                           <div key={key}>
  //                             <td className=" px-3 py-2 border justify-center items-center text-center">
  //                               <div className="header">
  //                                 <h4>Reservation Name : {data.roomName}</h4>
  //                                 <p>
  //                                   Period : {data.timeFrom}:00 - {data.timeTo}
  //                                   :00
  //                                 </p>
  //                                 <span className="description">
  //                                   <p>Date : {data.day}</p>
  //                                   <p>Name : {data.name}</p>
  //                                   <p>Email : {data.email}</p>
  //                                   <button
  //                                     className="delete-btn uppercase"
  //                                     onClick={() => {
  //                                       deleteBooking(
  //   val._id,
  //   val.date,
  //   val.email,
  //   val.roomName,
  //   val.roomType,
  //   val.roomNumber,
  //   val.timeFrom,
  //   val.timeTo
  // );
  //                                     }}
  //                                   >
  //                                     delete
  //                                   </button>
  //                                 </span>
  //                               </div>
  //                             </td>
  //                           </div>
  //                         );
  //                       })}
  //                   </tr>
  //                   <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
  //                     <th className="border justify-center items-center text-center">
  //                       Meeting 3
  //                     </th>
  //                     {meet3 !== undefined &&
  //                       meet3.map((data, key) => {
  //                         return (
  //                           <div key={key}>
  //                             <td className=" px-3 py-2 border justify-center items-center text-center">
  //                               <div className="header">
  //                                 <h4>Reservation Name : {data.roomName}</h4>
  //                                 <p>
  //                                   Period : {data.timeFrom}:00 - {data.timeTo}
  //                                   :00
  //                                 </p>
  //                                 <span className="description">
  //                                   <p>Date : {data.day}</p>
  //                                   <p>Name : {data.name}</p>
  //                                   <p>Email : {data.email}</p>
  //                                   <button
  //                                     className="delete-btn uppercase"
  //                                     onClick={() => {
  //                                       deleteBooking(
  //   val._id,
  //   val.date,
  //   val.email,
  //   val.roomName,
  //   val.roomType,
  //   val.roomNumber,
  //   val.timeFrom,
  //   val.timeTo
  // );
  //                                     }}
  //                                   >
  //                                     delete
  //                                   </button>
  //                                 </span>
  //                               </div>
  //                             </td>
  //                           </div>
  //                         );
  //                       })}
  //                   </tr>
  //                   <tr className="bg-white border dark:bg-[#202020] dark:border-gray-700">
  //                     <th className="border justify-center items-center text-center">
  //                       Meeting 4
  //                     </th>
  //                     {meet4 !== undefined &&
  //                       meet4.map((data, key) => {
  //                         return (
  //                           <div key={key}>
  //                             <td className=" px-3 py-2 border justify-center items-center text-center">
  //                               <div className="header ">
  //                                 <h4>Reservation Name : {data.roomName}</h4>
  //                                 <p>
  //                                   Period : {data.timeFrom}:00 - {data.timeTo}
  //                                   :00
  //                                 </p>
  //                                 <span className="description">
  //                                   <p>Date : {data.day}</p>
  //                                   <p>Name : {data.name}</p>
  //                                   <p>Email : {data.email}</p>
  //                                   <button
  //                                     className="delete-btn uppercase"
  //                                     onClick={() => {
  //                                       deleteBooking(
  //   val._id,
  //   val.date,
  //   val.email,
  //   val.roomName,
  //   val.roomType,
  //   val.roomNumber,
  //   val.timeFrom,
  //   val.timeTo
  // );
  //                                     }}
  //                                   >
  //                                     delete
  //                                   </button>
  //                                 </span>
  //                               </div>
  //                             </td>
  //                           </div>
  //                         );
  //                       })}
  //                   </tr>
  //                 </>
  //               )}
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     ) : (
  //       <Login />
  //     )}
  //   </>
  // );
};

export default table;
