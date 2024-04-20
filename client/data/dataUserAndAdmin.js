import Axios from "axios";

const getUserData = async (token) => {
  try {
    const userData = await Axios.get("/api/getUserData", {
      // params: { token: token },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    // if (userData.status != 200) {
    //   console.log("delete token in getUserData");
    //   localStorage.removeItem("token");
    //   router.push("/");
    //   return null;
    // }
    return userData.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getRoomReserve = async (token) => {
  try {
    const userData = await Axios.get("/api/getAllReserveRoom", {
      // params: { token: token },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (userData.data == "TokenExpried") {
      localStorage.removeItem("token");
      return [];
    }
    return userData.data;
  } catch (error) {
    console.log("getData", error);
    throw error;
  }
};

const getStatsRoomReserve = async (token) => {
  try {
    const userData = await Axios.get("/api/getStatsRoomReserve", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return userData.data;
  } catch (error) {
    console.log("getData", error);
    throw error;
  }
};

const reserveRoom = async (token, reserveData) => {
  try {
    const data = await Axios.post(
      "/api/reserveRoom",
      { reserveData },
      {
        // params: { token: token },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (data.data == "TokenExpried") {
      localStorage.removeItem("token");
      return [];
    }
  } catch (error) {
    console.log("reserveRoom", error);
    throw error;
  }
};

const getUserDataRoom = async (token) => {
  try {
    const userData = await Axios.get("/api/getUserDataRoom", {
      // params: { token: token },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    // if (userData.data == "TokenExpried") {
    //   localStorage.removeItem("token");
    //   return [];
    // }
    return userData.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// ===================================================

// Send email
const sendEmail = async (token, dataRoom) => {
  try {
    const userData = await getUserData(token);

    await Axios.post(
      "/api/email",
      { userData: userData, dataRoom: dataRoom },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.log("sendEmail", error);
    throw error;
  }
};

const sendEmailDelete = async (token, userData) => {
  try {
    await Axios.post(
      "/api/emailDelete",
      { userData: userData },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    console.log("sendEmail", error);
    throw error;
  }
};

const deleteUserRoom = async (token, roomId) => {
  try {
    // const deleteRoom = 
    await Axios.delete(`/api/deleteRoom`, {
      // params: { token: token },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: {
        roomId: roomId,
      },
    });

  } catch (error) {
    console.log("deleteUserRoom", error);
    throw error;
  }

  // if (deleteRoom.data == "TokenExpried") {
  //   localStorage.removeItem("token");
  //   return null;
  // }
};

const deleteRoomByAdmin = async (token, roomId) => {
  try {
    await Axios.delete(`/api/deleteRoomByAdmin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: {
        roomId: roomId,
      },
    });
  } catch (error) {
    console.log("deleteRoomByAdmin", error);
    throw error;
  }
};

// ========== Get all customer to show in datachart ==========
const getExamPeriod = async (token) => {
  try {
    const exam = await Axios.get("/api/examPeriod", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    return exam.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRole = async (token) => {
  try {
    const role = await Axios.get("/api/getRole", {
      // params: {
      //   token: token,
      // },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    // if (role.data == "TokenExpried") {
    //   localStorage.removeItem("token");
    //   console.log("testtttt");
    //   redirect("/");
    //   // return null;
    // }

    return role.data;
  } catch (error) {
    console.log(error);
    // localStorage.removeItem("token");
    throw error;
  }
};

export {
  getRoomReserve,
  getUserDataRoom,
  reserveRoom,
  getExamPeriod,
  sendEmail,
  sendEmailDelete,
  deleteUserRoom,
  getRole,
  getUserData,
  deleteRoomByAdmin,
  getStatsRoomReserve,
};
