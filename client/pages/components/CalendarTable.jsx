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
import { getExamPeriod, deleteUserRoom } from "@/data/dataUserAndAdmin";

const localizer = dayjsLocalizer(dayjs);

const CalendarTable = ({
  isConference,
  year,
  month,
  date,
  dataAllRoomServe,
  isAdmin,
}) => {
  const isMediumScreen = useMediaQuery("(min-width: 768px)");
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isExtraLargeScreen = useMediaQuery("(min-width: 1280px)");

  const [isEnable, setIsEnable] = useState(false); // Check exam period enable by admin

  const checkExamPeriodEnable = async () => {
    const data = await getExamPeriod();
    setIsEnable(data[0]?.isEnable);
  };
  useEffect(() => {
    checkExamPeriodEnable();
  }, []);

  if (!year && !month && !date) {
    return <div>Error: Data not available.</div>;
  }
  const userData = isConference
    ? dataAllRoomServe.length != 0
      ? dataAllRoomServe.flatMap((data) => {
          if (data.roomType === "Conference") {
            if (data.between2days) {
              // When between2days is true, return an array with two events
              return [
                {
                  id: data.id,
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
                    status: data.inLibrary,
                    email: data.email,
                    title: data.title,
                    name: data.name,
                    surname: data.surname,
                    cn: data.cn,
                    faculty: data.faculty,
                  },
                },
                {
                  id: data.id,
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
                    status: data.inLibrary,
                    email: data.email,
                    title: data.title,
                    name: data.name,
                    surname: data.surname,
                    cn: data.cn,
                    faculty: data.faculty,
                  },
                },
              ];
            }
            // When between2days is false, return a single event
            return [
              {
                id: data.id,
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
                  status: data.inLibrary,
                  email: data.email,
                  title: data.title,
                  name: data.name,
                  surname: data.surname,
                  cn: data.cn,
                  faculty: data.faculty,
                },
              },
            ];
          }
        })
      : []
    : // .filter(Boolean)
    dataAllRoomServe.length != 0
    ? dataAllRoomServe.flatMap((data) => {
        if (data.roomType === "Meeting") {
          if (data.between2days) {
            // When between2days is true, return an array with two events
            return [
              {
                id: data.id,
                start: new Date(
                  data.year,
                  data.month - 1,
                  data.day,
                  data.timeFrom
                ),
                end: new Date(data.year, data.month - 1, data.day, 23, 59, 59),
                resourceId: data.roomNumber,
                data: {
                  date: data.date,
                  roomType: data.roomType,
                  roomNumber: data.roomNumber,
                  roomName: data.roomName,
                  timeFrom: data.timeFrom,
                  timeTo: data.timeTo,
                  status: data.inLibrary,
                  email: data.email,
                  title: data.title,
                  name: data.name,
                  surname: data.surname,
                  cn: data.cn,
                  faculty: data.faculty,
                },
              },
              {
                id: data.id,
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
                  status: data.inLibrary,
                  email: data.email,
                  title: data.title,
                  name: data.name,
                  surname: data.surname,
                  cn: data.cn,
                  faculty: data.faculty,
                },
              },
            ];
          }
          // When between2days is false, return a single event
          return [
            {
              id: data.id,
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
                status: data.inLibrary,
                email: data.email,
                title: data.title,
                name: data.name,
                surname: data.surname,
                cn: data.cn,
                faculty: data.faculty,
              },
            },
          ];
        }
      })
    : [];

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
  const handleDeleteBooking = async (id) => {
    Swal.fire({
      title: "Do you want to delete this reserve?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteUserRoom(id);
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
            onSelectEvent={
              isAdmin ? (slotInfo) => handleClickSlot(slotInfo) : undefined
            }
            startAccessor="start"
            endAccessor="end"
            resourceIdAccessor="resourceId"
            resources={resourceMap}
            resourceTitleAccessor="resourceTitle"
            step={30}
            style={{
              height: 500,
              width: isExtraLargeScreen
                ? 1200
                : isLargeScreen
                ? 900
                : isMediumScreen
                ? 700
                : 340,
            }}
            view={views}
            components={{
              toolbar: CustomToolbar(),
              event: (props) => (
                <CustomTextInCalendar data={props.event.data} />
              ),
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
            onSelectEvent={
              isAdmin ? (slotInfo) => handleClickSlot(slotInfo) : undefined
            }
            startAccessor="start"
            endAccessor="end"
            resourceIdAccessor="resourceId"
            resources={resourceMap}
            resourceTitleAccessor="resourceTitle"
            step={30}
            style={{
              height: 500,
              width: isExtraLargeScreen
                ? 1200
                : isLargeScreen
                ? 900
                : isMediumScreen
                ? 700
                : 340,
            }}
            view={views}
            min={new Date(2018, 0, 29, 10, 0, 0)}
            max={new Date(2018, 0, 29, 16, 0, 0)}
            components={{
              toolbar: CustomToolbar(),
              event: (props) => (
                <CustomTextInCalendar data={props.event.data} />
              ),
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
              {data.data.name} {data.data.surname}
            </div>
            <div>
              <span className="font-bold">ID : </span>
              {data.data.cn}
            </div>
            <div>
              <span className="font-bold">Email : </span>
              {data.data.email}
            </div>
            <button
              onClick={() => handleDeleteBooking(data.id)}
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
