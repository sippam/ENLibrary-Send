import Axios from "axios";

// ========== Get admin data in database ==========
// const getAdmin = async (callback) => {
//   try {
//     await Axios.get("/api/getAdmin").then((res) => {
//       const data = res.data;
//       callback(data);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// =================================================

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
// ==========================================================

export { getData, getAllCustomer };