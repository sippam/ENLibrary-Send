import React, { useEffect, useState } from "react";
import { getUserDataRoom, deleteUserRoom } from "../../data/dataUserAndAdmin";
// import Cookies from "js-cookie";
// import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const request = ({ triggerbook, deleteRoom }) => {
  const router = useRouter();
  // ========== Get user data in database ==========
  const [dataShow, setDataShow] = useState([]);
  const [token, setToken] = useState("");

  const getUserDataFunc = async (token) => {
    const userData = await getUserDataRoom(token);
    setDataShow(userData);
  };

  useEffect(() => {
    // const token = Cookies.get("token");
    // const token = getCookie("token");
    const token = localStorage.getItem("token");
    if (token) {
      getUserDataFunc(token);
    } else {
      router.push("/");
    }
  }, [triggerbook]);

  useEffect(() => {
    // const token = Cookies.get("token");
    // const token = getCookie("token");
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      getUserDataFunc(token);
    } else {
      router.push("/");
    }
  }, []);
  // ===============================================

  // ========== Delete booking ==========
  const deleteBooking = async (id) => {
    deleteRoom();
    setDataShow([]);
    deleteUserRoom(token, id);

    setTimeout(() => {
      router.reload();
    }, 700);
  };
  // ====================================

  return (
    <div
      id="list"
      className="pt-[0px] sm:pt-[0px] py-72 lg:py-52 xl:py-20 dark:bg-[#282a36]"
    >
      <div className="w-full lg:h-[90px]  text-center">
        <div className="max-w-[100%] w-[95%] h-full mx-auto p-2 justify-center items-center">
          <h2 className="md-auto tracking-wide py-6 text-center dark:text-[white]">
            My Booking
          </h2>
          <div className="relative max-w-screen-xl mx-auto">
            <table className="mytable w-full text-gray-500 justify-center items-center text-center dark:text-[white]">
              <thead className="text-sm uppercase text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-[white] shadow-md">
                <tr>
                  <th className="px-2 py-5">Date</th>
                  <th className="px-2 py-5">Name</th>
                  <th className="px-2 py-5">Type</th>
                  <th className="px-2 py-5">Number</th>
                  <th className="px-2 py-5">Period</th>
                  <th className="px-2 py-5">Status</th>
                  <th className="px-2 py-5">Delete</th>
                </tr>
              </thead>
              <tbody>
                {dataShow.length != 0 &&
                  dataShow.map((val, key) => {
                    return (
                      <tr
                        className="bg-white border dark:bg-gray-800 dark:border-gray-700"
                        key={key}
                      >
                        <th className="px-6 py-4">{val.date}</th>
                        <th className="px-6 py-4">{val.roomName}</th>
                        <th className="px-6 py-4">{val.roomType}</th>
                        <th className="px-6 py-4">{val.roomNumber}</th>
                        <th className="px-6 py-4">
                          {val.timeFrom}:00 - {val.timeTo}:00
                        </th>
                        <th className="px-6 py-4">
                          {val.inLibrary ? "Check" : "Uncheck"}
                        </th>
                        <th className="px-6 py-4">
                          <button
                            className="px-2 py-1 rounded-full uppercase cursor-pointer hover:scale-[95%] ease-in duration-100 text-base tracking-widest font-semibold text-white shadow-gray-400 dark:shadow-[black] shadow-xl bg-gradient-to-r from-[#FF0000] to-[#263238]"
                            onClick={() => {
                              deleteBooking(val.id);
                            }}
                          >
                            Cancel
                          </button>
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default request;
