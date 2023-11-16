"use client";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";
import Axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { React, useState, useEffect } from "react";
import Main from "./Main";
import Booking from "./Booking";
import Footer from "./Footer";
import Request from "./request";
import UserTable from "./UserTable";
import { getData } from "../../data/dataUserAndAdmin";
import { getTime } from "../../data/localTimezone";
import Announce from "./Announce";

const Login = () => {

  const [session, setSession] = useState(null);

  // ========== Get user position ==========
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };
  // =======================================

  // ========== Get user time if user not around at library in 30 minutes room will delete ==========
  const today = getTime().getDate();
  const thisHour = getTime().getHours();
  // Minute unit
  const setUserTimeOutRoomNotInLibrary = 15;

  const [user, setUser] = useState([]);

  // ========== Get user data in database ==========
  const getUserData = async (storedData) => {
    await getData((data) => {
      let users = data.filter(
        (data) =>
          Number(data.day) === today &&
          data.timeFrom === thisHour &&
          Buffer.from(data.email, "base64").toString("utf-8") ===
            Buffer.from(storedData.email, "base64").toString("utf-8")
      );
      setUser(users);
    });
  };

  function checkLocationLibrary(data, x, y) {
    if (data.length > 0) {
      const startHours = new Date(
        new Date().setHours(data[0].timeFrom, 0, 0, 0)
      );
      const endHours = new Date(
        new Date().setHours(
          data[0].timeFrom,
          setUserTimeOutRoomNotInLibrary,
          0,
          0
        )
      );
      if (
        data &&
        x >= 16.472419882673314 &&
        x <= 16.47391226944115 &&
        y >= 102.82285520076572 &&
        y <= 102.82387015776939 &&
        startHours <= getTime() <= endHours
      ) {
        updateStutsInLibrary(data[0]._id, true);
      }
    }
  }

  function updateStutsInLibrary(id, stuts) {
    Axios.put(`/api/add?id=${id}`, {
      inLibrary: stuts,
    });
  }
  // ===============================================================================================

  // ========== Call all function (get user location, get id that user didn't come to room)==========
  const callAllFunc = (data) => {
    getLocation();
    if (data.length > 0) {
      checkLocationLibrary(data, latitude, longitude);
    }
    setTimeout(callAllFunc, 60 * 1000, data);
  };

  useEffect(() => {
    callAllFunc(user);
  }, [user]);
  // ===============================================================================================

  // ========== Send trigger when user had ben booking it will update in request and table ==========
  const [sendTriggerBooking, setSendTriggerBooking] = useState(false);

  const ActiveTriggerBook = (trigger) => {
    setSendTriggerBooking(trigger);
  };
  // ===============================================================================================

  useEffect(() => {
    const storedData = localStorage.getItem("dataForm");
    if (storedData) {
      setSession(JSON.parse(storedData));
      getUserData(JSON.parse(storedData));
    }
  }, [sendTriggerBooking]);

  return (
    <>
      {session ? (
        <>
          <Navbar lat={latitude} lng={longitude} showLatLng={true}/>
          <Main />
          <Announce />
          <UserTable triggerbook={sendTriggerBooking} />
          <Booking sendDataBook={ActiveTriggerBook} />
          <Request triggerbook={sendTriggerBooking} />
          <Footer />
        </>
      ) : (
        <>
          <div id="home" className="dark:bg-[#282a36]">
            <div className="w-full h-screen text-center">
              <div className="max-w-[100%] w-full h-full mx-auto p-2 flex flex-row justify-center items-center ">
                <div className="mt-0 flex flex-col sm:flex-row">
                  <div className="m-2 flex justify-center items-center flex-col">
                    <p className=" uppercase text-lg tracking-widest font-semibold text-[#263238]  dark:text-[#fcfcfc]">
                      WELCOME TO{" "}
                    </p>
                    <h1 className="my-1 text-4xl md:text-6xl font-bold text-[#B30000]">
                      ENGINEER LIBRARY
                    </h1>
                    <p className=" py-4 text-md tracking-widest font-semibold text-[#263238] max-w-[100%] m-3  dark:text-[#fcfcfc]">
                      <span className="text-[#2c2b2b] text-lg dark:text-[#51a4c0] hover:scale-105 ease-in duration-300">
                        Enjoy
                      </span>{" "}
                      access to a wide selection conference room. <br />
                      <span className="text-[#2c2b2b] text-lg dark:text-[#51a4c0] hover:scale-105 ease-in duration-300">
                        Easy{" "}
                      </span>
                      communication with your friends.
                    </p>
                    <div>
                      <div className=" flex items-center justify-between">
                        {/* {renderThemeChanger()} */}
                        <Link href="https://libsso.kku.ac.th/enlib.php">
                          <button
                            // onClick={() => signIn()}
                            className="flex items-center justify-between btn-grad hover:bg-right bg-[#B30000] text-white mt-3 py-4 px-7 rounded-50 uppercase cursor-pointer hover:scale-105 ease-in duration-300 text-sm tracking-widest font-semibold ml-10 mr-10"
                          >
                            {/* <span >Login with Google</span> */}
                            KKU Login
                            <FcGoogle className="text-3xl ml-3 lg:text-xl " />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <Image
                      src="../../assets/animatedfirst.svg"
                      width={780}
                      height={200}
                      style={{ inset: "10px" }}
                      alt="/"
                    ></Image>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
