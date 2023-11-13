import Axios from "axios";

// ========== Get data to show in datachart ==========
const getData = async (callback) => {
  try {
    await Axios.get("/api/add").then((res) => {
      const data = res.data;
      callback(data);
    });
  } catch (error) {
    console.log(error);
  }
};
// ===================================================

// ========== Get all customer to show in datachart ==========
const getAllCustomer = async (callback) => {
  try {
    await Axios.get("/api/addAllCustomer").then((res) => {
      const data = res.data;
      callback(data);
    });
  } catch (error) {
    console.log(error);
  }
};

// ========== Get all customer to show in datachart ==========
// const getExamPeriod = async (callback) => {
//   try {
//     await Axios.get("/api/examPeriod").then((res) => {
//       const data = res.data;
//       callback(data);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
const getExamPeriod = async (callback) => {
  try {
    const response = await Axios.get("/api/examPeriod");
    const data = response.data;
    callback(data);
  } catch (error) {
    console.error("Error fetching exam period:", error);
  }
};
// ==========================================================

export { getData, getAllCustomer, getExamPeriod };