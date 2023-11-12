import React, { useState } from "react";
import { getTime } from "../../data/localTimezone";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addDays } from "date-fns";
import Tooltip from "@mui/material/Tooltip";

const YMDSetting = ({ startBooking, periodBooking, onDateChange }) => {
  if (!startBooking && !periodBooking) {
    return <div>Error: Data not available.</div>;
  }
  // ========== Show date in dropdown ==========
  const showPeriodDay = [];
  for (let i = 0; i <= periodBooking; i++) {
    showPeriodDay.push(
      [
        addDays(startBooking, i).getMonth() + 1,
        addDays(startBooking, i).getDate(),

        addDays(startBooking, i).getFullYear(),
      ].join("-")
    );
  }

  const [day, setDay] = useState(
    [
      startBooking.getMonth() + 1,
      startBooking.getDate(),
      startBooking.getFullYear(),
    ].join("-")
  );

  const selectday = (event) => {
    setDay(event.target.value);
    onDateChange(
      Number(event.target.value.split("-")[2]), // Year
      Number(event.target.value.split("-")[0]), // Month
      Number(event.target.value.split("-")[1]), // Date
    );
  };
  // ===========================================
  return (
    <div className="flex flex-col">
      <div className="flex justify-center mb-3">
        <FormControl sx={{ width: 150 }}>
          <Tooltip title="Year-Month-Date">
            <InputLabel
              id="demo-simple-select-label"
              className="dark:text-white"
            >
              M/D/Y
            </InputLabel>
          </Tooltip>

          <Select
            className="dark:text-white px-1"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={day}
            label="Date"
            onChange={selectday}
          >
            {showPeriodDay.map((data, key) => {
              return (
                <MenuItem key={key} value={data}>
                  {data}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default YMDSetting;