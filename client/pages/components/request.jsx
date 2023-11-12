import Axios from "axios";
import React, { useEffect, useState } from "react";
import { getData } from "../../data/dataUserAndAdmin";
import { useRouter } from "next/router";

const request = (triggerbook) => {
  // ========== Get user data in database ==========
  const [email, setEmail] = useState("");
  const [dataShow, setDataShow] = useState([]);
  const router = useRouter();

  const getUserData = async () => {
    await getData((data) => {
      setDataShow(data);
    });
  };

  useEffect(() => {
    getUserData();
    setEmail(
      Buffer.from(
        JSON.parse(localStorage.getItem("dataForm")).email,
        "base64"
      ).toString("utf-8")
    );
  }, [triggerbook]);

  // ===============================================
  // ========== Delete booking ==========
  const deleteBooking = async (
    id,
    date,
    email,
    roomType,
    roomNumber,
    timeFrom,
    timeTo
  ) => {
    await Axios.delete(`/api/add?id=${id}`).then(() => {
      setDataShow(
        dataShow.filter((val) => {
          return val._id != id;
        })
      );
    });
    await Axios.delete(
      `/api/addAllCustomer?date=${date}&email=${email}&roomType=${roomType}&roomNumber=${roomNumber}&timeFrom=${timeFrom}&timeTo=${timeTo}`
    );
    router.reload();
  };
  // ====================================

  return (
    <div id="list" className="lg:pt-[100px] sm:pt-[0px] dark:bg-[#282a36]">
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
                  <th className="px-2 py-5">Delete</th>
                </tr>
              </thead>
              <tbody>
                {dataShow.length != 0 &&
                  dataShow.map((val, key) => {
                    if (
                      Buffer.from(val.email, "base64").toString("utf-8") ==
                      email
                    ) {
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
                            <button
                              className="px-2 py-1 rounded-full uppercase cursor-pointer hover:scale-[95%] ease-in duration-100 text-base tracking-widest font-semibold text-white shadow-gray-400 dark:shadow-[black] shadow-xl bg-gradient-to-r from-[#FF0000] to-[#263238]"
                              onClick={() => {
                                deleteBooking(
                                  val._id,
                                  val.date,
                                  val.email,
                                  val.roomType,
                                  val.roomNumber,
                                  val.timeFrom,
                                  val.timeTo
                                );
                              }}
                            >
                              Cancel
                            </button>
                          </th>
                        </tr>
                      );
                    }
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
