import React, { useEffect, useState, useMemo } from "react";
import Axios from "axios";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Toolbar from "react-big-calendar/lib/Toolbar";
import dayjs from "dayjs";
import { useMediaQuery } from "@mui/material";
import CustomTextInCalendar from "./CustomTextInCalendar";
import { addDays } from "date-fns";
import Swal from "sweetalert2";

const localizer = dayjsLocalizer(dayjs);

const CalendarTable = ({
  isConference,
  year,
  month,
  date,
  dataShow,
  isAdmin,
}) => {
  const isSmallScreen = useMediaQuery("(min-width: 640px)");
  const isMediumScreen = useMediaQuery("(min-width: 768px)");
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const [isEnable, setIsEnable] = useState(false);

  const checkExamPeriodEnable = async () => {
    await Axios.get("/api/examPeriod").then((data) => {
      
      setIsEnable(data.data[0].isEnable);
    });
  };
  useEffect(() => {
    checkExamPeriodEnable();
  }, []);

  if (!year && !month && !date) {
    return <div>Error: Data not available.</div>;
  }

  const userData = isConference
    ? dataShow &&
      dataShow
        .flatMap((data) => {
          if (data.roomType === "Conference") {
            if (data.between2days) {
              // When between2days is true, return an array with two events
              return [
                {
                  id: data._id,
                  start: new Date(
                    data.year,
                    data.month - 1,
                    data.day,
                    data.timeFrom
                  ),
                  end: new Date(
                    data.year,
                    data.month - 1,
                    data.day,
                    23,
                    59,
                    59
                  ),
                  resourceId: data.roomNumber,
                  data: {
                    date: data.date,
                    roomType: data.roomType,
                    roomNumber: data.roomNumber,
                    roomName: data.roomName,
                    timeFrom: data.timeFrom,
                    timeTo: data.timeTo,
                    email: data.email,
                    title: Buffer.from(data.title, "base64").toString(),
                    firstname: Buffer.from(data.firstname, "base64").toString(),
                    surname: Buffer.from(data.surname, "base64").toString(),
                    cn: Buffer.from(data.cn, "base64").toString(),
                  },
                },
                {
                  id: data._id,
                  start: addDays(
                    new Date(data.year, data.month - 1, data.day, 0),
                    1
                  ),
                  end: addDays(
                    new Date(data.year, data.month - 1, data.day, data.timeTo),
                    1
                  ),
                  resourceId: data.roomNumber,
                  data: {
                    date: data.date,
                    roomType: data.roomType,
                    roomNumber: data.roomNumber,
                    roomName: data.roomName,
                    timeFrom: data.timeFrom,
                    timeTo: data.timeTo,
                    email: data.email,
                    title: Buffer.from(data.title, "base64").toString(),
                    firstname: Buffer.from(data.firstname, "base64").toString(),
                    surname: Buffer.from(data.surname, "base64").toString(),
                    cn: Buffer.from(data.cn, "base64").toString(),
                  },
                },
              ];
            }
            // When between2days is false, return a single event
            return [
              {
                id: data._id,
                start: new Date(
                  data.year,
                  data.month - 1,
                  data.day,
                  data.timeFrom
                ),
                end: new Date(data.year, data.month - 1, data.day, data.timeTo),
                resourceId: data.roomNumber,
                data: {
                  date: data.date,
                  roomType: data.roomType,
                  roomNumber: data.roomNumber,
                  roomName: data.roomName,
                  timeFrom: data.timeFrom,
                  timeTo: data.timeTo,
                  email: data.email,
                  title: Buffer.from(data.title, "base64").toString(),
                  firstname: Buffer.from(data.firstname, "base64").toString(),
                  surname: Buffer.from(data.surname, "base64").toString(),
                  cn: Buffer.from(data.cn, "base64").toString(),
                },
              },
            ];
          }
          return null; // Return null for non-Conference data
        })
        .filter(Boolean)
    : dataShow &&
      dataShow
        .flatMap((data) => {
          if (data.roomType === "Meeting") {
            if (data.between2days) {
              // When between2days is true, return an array with two events
              return [
                {
                  id: data._id,
                  start: new Date(
                    data.year,
                    data.month - 1,
                    data.day,
                    data.timeFrom
                  ),
                  end: new Date(
                    data.year,
                    data.month - 1,
                    data.day,
                    23,
                    59,
                    59
                  ),
                  resourceId: data.roomNumber,
                  data: {
                    date: data.date,
                    roomType: data.roomType,
                    roomNumber: data.roomNumber,
                    roomName: data.roomName,
                    timeFrom: data.timeFrom,
                    timeTo: data.timeTo,
                    email: data.email,
                    title: Buffer.from(data.title, "base64").toString(),
                    firstname: Buffer.from(data.firstname, "base64").toString(),
                    surname: Buffer.from(data.surname, "base64").toString(),
                    cn: Buffer.from(data.cn, "base64").toString(),
                  },
                },
                {
                  id: data._id,
                  start: addDays(
                    new Date(data.year, data.month - 1, data.day, 0),
                    1
                  ),
                  end: addDays(
                    new Date(data.year, data.month - 1, data.day, data.timeTo),
                    1
                  ),
                  resourceId: data.roomNumber,
                  data: {
                    date: data.date,
                    roomType: data.roomType,
                    roomNumber: data.roomNumber,
                    roomName: data.roomName,
                    timeFrom: data.timeFrom,
                    timeTo: data.timeTo,
                    email: data.email,
                    title: Buffer.from(data.title, "base64").toString(),
                    firstname: Buffer.from(data.firstname, "base64").toString(),
                    surname: Buffer.from(data.surname, "base64").toString(),
                    cn: Buffer.from(data.cn, "base64").toString(),
                  },
                },
              ];
            }
            // When between2days is false, return a single event
            return [
              {
                id: data._id,
                start: new Date(
                  data.year,
                  data.month - 1,
                  data.day,
                  data.timeFrom
                ),
                end: new Date(data.year, data.month - 1, data.day, data.timeTo),
                resourceId: data.roomNumber,
                data: {
                  date: data.date,
                  roomType: data.roomType,
                  roomNumber: data.roomNumber,
                  roomName: data.roomName,
                  timeFrom: data.timeFrom,
                  timeTo: data.timeTo,
                  email: data.email,
                  title: Buffer.from(data.title, "base64").toString(),
                  firstname: Buffer.from(data.firstname, "base64").toString(),
                  surname: Buffer.from(data.surname, "base64").toString(),
                  cn: Buffer.from(data.cn, "base64").toString(),
                },
              },
            ];
          }
          return null; // Return null for non-Conference data
        })
        .filter(Boolean);
  const resourceMap = isConference
    ? [
        { resourceId: 1, resourceTitle: "Conference 1" },
        { resourceId: 2, resourceTitle: "Conference 2" },
        { resourceId: 3, resourceTitle: "Conference 3" },
      ]
    : [
        { resourceId: 1, resourceTitle: "Meeting 1" },
        { resourceId: 2, resourceTitle: "Meeting 2" },
        { resourceId: 3, resourceTitle: "Meeting 3" },
        { resourceId: 4, resourceTitle: "Meeting 4" },
      ];

  const { defaultDate, views } = useMemo(
    () => ({
      // defaultDate: new Date(),
      views: ["day"],
    }),
    []
  );

  var CustomToolbar = () => {
    return class BaseToolBar extends Toolbar {
      render() {
        return <div className="posr"></div>;
      }
    };
  };

  const [handleClick, setHandleClick] = useState(false);
  const [data, setData] = useState({});
  const handleClickSlot = (slotInfo) => {
    setHandleClick(!handleClick);
    setData(slotInfo);
  };

  // ========== Delete booking ==========
  const handleDeleteBooking = async (
    id,
    date,
    email,
    roomType,
    roomNumber,
    timeFrom,
    timeTo
  ) => {
    Swal.fire({
      title: "Do you want to delete this reserve?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Axios.delete(`/api/add?id=${id}`);
        await Axios.delete(
          `/api/addAllCustomer?date=${date}&email=${email}&roomType=${roomType}&roomNumber=${roomNumber}&timeFrom=${timeFrom}&timeTo=${timeTo}`
        ).then(() => {
          window.location.reload();
        });
      }
    });
  };
  // ====================================

  return (
    <div className="flex flex-col">
      {isEnable ? (
        <div className="flex justify-center ">
          <Calendar
            className="rbc-allday-cell "
            localizer={localizer}
            date={new Date(year, month - 1, date)}
            events={userData}
            onSelectEvent={isAdmin ? (slotInfo) => handleClickSlot(slotInfo) : undefined}
            startAccessor="start"
            endAccessor="end"
            resourceIdAccessor="resourceId"
            resources={resourceMap}
            resourceTitleAccessor="resourceTitle"
            step={30}
            style={{
              height: 500,
              width: isLargeScreen ? 1024 : isMediumScreen ? 700 : 340,
            }}
            view={views}
            components={{
              toolbar: CustomToolbar(),
              event: (props) => <CustomTextInCalendar data={props.event.data} />,
            }}
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <Calendar
            className="rbc-allday-cell "
            localizer={localizer}
            date={new Date(year, month - 1, date)}
            events={userData}
            onSelectEvent={isAdmin ? (slotInfo) => handleClickSlot(slotInfo) : undefined}
            startAccessor="start"
            endAccessor="end"
            resourceIdAccessor="resourceId"
            resources={resourceMap}
            resourceTitleAccessor="resourceTitle"
            step={30}
            style={{
              height: 500,
              width: isLargeScreen ? 1024 : isMediumScreen ? 700 : 340,
            }}
            view={views}
            min={new Date(2018, 0, 29, 10, 0, 0)}
            max={new Date(2018, 0, 29, 16, 0, 0)}
            components={{
              toolbar: CustomToolbar(),
              event: (props) => <CustomTextInCalendar data={props.event.data} />,
            }}
          />
        </div>
      )}
      {handleClick && data && (
        <div className="flex justify-center mt-5 border-y">
          <div className="flex flex-col">
            <div>
              <span className="font-bold">Reserve Name : </span>
              {data.data.roomName}
            </div>
            <div>
              <span className="font-bold">Period : </span>
              {data.data.timeFrom}:00 - {data.data.timeTo}:00
            </div>
            <div>
              <span className="font-bold">Booked by : </span>
              {data.data.title}
              {data.data.firstname} {data.data.surname}
            </div>
            <div>
              <span className="font-bold">ID : </span>
              {data.data.cn}
            </div>
            <div>
              <span className="font-bold">Email : </span>
              {Buffer.from(data.data.email, "base64").toString("utf-8")}
            </div>
            <button
              onClick={() =>
                handleDeleteBooking(
                  data.id,
                  data.data.date,
                  data.data.email,
                  data.data.roomType,
                  data.data.roomNumber,
                  data.data.timeFrom,
                  data.data.timeTo
                )
              }
              className="bg-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarTable;
