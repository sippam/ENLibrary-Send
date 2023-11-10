import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useMediaQuery } from "@mui/material";

const ConOrMeeting = ({ handleChangeTypeRoom }) => {
    
  // Set COnference and Meeting to vertical andd horizontal follow device user
  const isMediumScreen = useMediaQuery("(min-width: 768px)");
  // ========================================================================

  const [alignment, setAlignment] = useState("Conference");

  const changeTypeRoom = (event, newAlignment) => {
    setAlignment(newAlignment);
    handleChangeTypeRoom(newAlignment);
  };

  return (
    <div className="m-4 mr-7 dark:bg-[#282a36]">
      <ToggleButtonGroup
        orientation={isMediumScreen ? "horizontal" : "vertical"}
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
  );
};

export default ConOrMeeting;
