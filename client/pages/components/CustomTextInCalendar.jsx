import React from "react";
import { useMediaQuery } from "@mui/material";

const CustomTextInCalendar = ({ data }) => {
  const isMediumScreen = useMediaQuery("(min-width: 1px)");

  if (!data) {
    return <div>Error: Data not available.</div>;
  }

  const statusText = data && data.status == 1 ? "Check" : "Uncheck";

  return (
    <div className="flex flex-col leading-relaxed">
      <div className="text-sm ml-1">
        <span className="font-bold">Name : </span>
        {isMediumScreen ? (
          data.roomName
        ) : (
          <>
            <br /> {data.roomName}
          </>
        )}
      </div>
      <div className="text-sm ml-1">
        <span className="font-bold ">Period : </span>
        {isMediumScreen ? (
          <>
            {data.timeFrom}:00 - {data.timeTo}:00
          </>
        ) : (
          <>
            <br /> {data.timeFrom}:00 - {data.timeTo}:00
          </>
        )}
      </div>
      <div className="text-sm ml-1">
        <span className="font-bold">Status : </span>
        {isMediumScreen ? (
          statusText
        ) : (
          <>
            <br /> {statusText}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomTextInCalendar;
