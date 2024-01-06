import Axios from "axios";

const getUserData = async (token) => {
  try {
    const userData = await Axios.get("/api/getUserData", {
      params: { token: token },
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_TOKEN,
      },
    });
    if (userData.data == "TokenExpried") {
      localStorage.removeItem("token");
      return null;
    }
    return userData.data;
  } catch (error) {
    console.log(error);
  }
};

const getRoomReserve = async (token) => {
  try {
    const userData = await Axios.get("/api/getAllReserveRoom", {
      params: { token: token },
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_TOKEN,
      },
    });
    if (userData.data == "TokenExpried") {
      localStorage.removeItem("token");
      return null;
    }
    return userData.data;
  } catch (error) {
    console.log("getData", error);
  }
};

const reserveRoom = async (token, reserveData) => {
  try {
    const data = await Axios.post(
      "/api/reserveRoom",
      { reserveData },
      {
        params: { token: token },
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.NEXT_PUBLIC_TOKEN,
        },
      }
    );

    if (data.data == "TokenExpried") {
      localStorage.removeItem("token");
      return null;
    }
  } catch (error) {
    console.log("reserveRoom", error);
  }
};

const getUserDataRoom = async (token) => {
  try {
    const userData = await Axios.get("/api/getUserDataRoom", {
      params: { token: token },
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_TOKEN,
      },
    });
    if (userData.data == "TokenExpried") {
      localStorage.removeItem("token");
      return null;
    }
    return userData.data;
  } catch (error) {
    console.log(error);
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
          Authorization: process.env.NEXT_PUBLIC_TOKEN,
        },
      }
    );
  } catch (error) {
    console.log("sendEmail", error);
  }
};

const deleteUserRoom = async (token, id) => {
  const deleteRoom = await Axios.delete(`/api/deleteRoom`, {
    params: { token: token },
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.NEXT_PUBLIC_TOKEN,
    },
    data: {
      id: id,
    },
  });

  if (deleteRoom.data == "TokenExpried") {
    localStorage.removeItem("token");
    return null;
  }
};

// ========== Get all customer to show in datachart ==========
const getExamPeriod = async () => {
  try {
    const exam = await Axios.get("/api/examPeriod", {
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_TOKEN,
      },
    });

    return exam.data;
  } catch (error) {
    console.error(error);
  }
};

const getRole = async (token) => {
  try {
    const role = await Axios.get("/api/getRole", {
      params: {
        token: token,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.NEXT_PUBLIC_TOKEN,
      },
    });
    if (role.data == "TokenExpried") {
      localStorage.removeItem("token");
      return null;
    }

    return role.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getRoomReserve,
  getUserDataRoom,
  reserveRoom,
  getExamPeriod,
  sendEmail,
  deleteUserRoom,
  getRole,
  getUserData,
};
