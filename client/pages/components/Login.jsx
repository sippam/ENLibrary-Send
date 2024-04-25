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
import { getTime } from "../../data/localTimezone";
import Announce from "./Announce";
import { getUserDataRoom } from "../../data/dataUserAndAdmin";
import useInterval from "../hooks/useInterval";
import { useRouter } from "next/router";
import { getRole } from "@/data/dataUserAndAdmin";

const Login = () => {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  async function allowAdmin(token) {
    try {
      const boolean = await getRole(token);
      setIsAdmin(boolean);
    } catch (error) {
      // localStorage.removeItem("token");
      // router.reload();
    }
  }

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      allowAdmin(token);
    } else {
      router.push("/");
    }
  }, [isAdmin, router]);

  // ========== Get user position ==========
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  };

  // =======================================

  // ========== Get user time if user not around at library in 30 minutes room will delete ==========
  const today = getTime().getDate();
  const thisHour = getTime().getHours();
  // Minute unit
  const setUserTimeOutRoomNotInLibrary = 15;

  const [user, setUser] = useState([]);

  // ========== Get user data in database ==========
  const getUserDataFunc = async (token) => {
    try {
      const haveRoom = await getUserDataRoom(token);
      const users =
        haveRoom != undefined && haveRoom.length != 0
          ? haveRoom.filter(
              (data) => Number(data.day) === today && data.timeFrom === thisHour
            )
          : [];
      setUser(users);
    } catch (error) {
      localStorage.removeItem("token");
      router.reload(); // Redirect user to the homepage
    }
  };

  function checkLocationLibrary(token, data, x, y) {
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
        updateStutsInLibrary(token, data[0].id, true);
      }
    }
  }

  function updateStutsInLibrary(token, id, stuts) {
    Axios.put(
      `/api/updateStatus`,
      {
        id: id,
        inLibrary: stuts,
      },
      {
        params: { token: session },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  }
  // ===============================================================================================

  // ========== Call all function (get user location, get id that user didn't come to room)==========
  const callAllFunc = (token, data) => {
    getLocation();
    if (data.length > 0) {
      checkLocationLibrary(token, data, latitude, longitude);
    }
  };

  useInterval(() => {
    const token = localStorage.getItem("token");
    if (token) {
      callAllFunc(token, user);
    }
  }, 5 * 1000);

  useEffect(() => {
    if (user.length > 0) {
      callAllFunc(user);
    }
  }, [user]);
  // ===============================================================================================

  // ========== Send trigger when user had ben booking it will update in request and table ==========
  const [sendTriggerBooking, setSendTriggerBooking] = useState(false);

  const ActiveTriggerBook = () => {
    setSendTriggerBooking(!sendTriggerBooking);
  };

  const [sendTriggerDelete, setSendTriggerDelete] = useState(false);
  const ActiveTriggerDelete = () => {
    setSendTriggerDelete(!sendTriggerDelete);
  };
  // ===============================================================================================

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSession(token);
      getUserDataFunc(token);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSession(token);
      getUserDataFunc(token);
    }
  }, [sendTriggerBooking]);

  return (
    <>
      {session ? (
        <>
          <Navbar lat={latitude} lng={longitude} showLatLng={true} />
          <Main />
          <Announce />
          <UserTable triggerbook={sendTriggerBooking} />
          <Booking
            sendDataBook={ActiveTriggerBook}
            tiggerDelete={sendTriggerDelete}
            admin={isAdmin}
          />
          <Request
            triggerbook={sendTriggerBooking}
            deleteRoom={ActiveTriggerDelete}
          />
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
                        <Link href="https://libsso.kku.ac.th/enlib.php" className="flex items-center justify-between btn-grad hover:bg-right bg-[#B30000] text-white mt-3 py-4 px-7 rounded-50 uppercase cursor-pointer hover:scale-105 ease-in duration-300 text-sm tracking-widest font-semibold ml-10 mr-10">
                          {/* <button
                            // onClick={() => signIn()}
                            className="flex items-center justify-between btn-grad hover:bg-right bg-[#B30000] text-white mt-3 py-4 px-7 rounded-50 uppercase cursor-pointer hover:scale-105 ease-in duration-300 text-sm tracking-widest font-semibold ml-10 mr-10"
                          > */}
                            {/* <span >Login with Google</span> */}
                            KKU Login
                            <FcGoogle className="text-3xl ml-3 lg:text-xl " />
                          {/* </button> */}
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
