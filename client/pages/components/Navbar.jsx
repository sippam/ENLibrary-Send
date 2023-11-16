import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

import { TbLocationFilled } from "react-icons/tb";
import { PiUserCircleThin } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect } from "react";

import { toast } from "react-toastify";
import { useRouter } from "next/router";
import adminList from "../../data/adminList.json";

const Navbar = ({ lat, lng, showLatLng }) => {
  const router = useRouter();
  const [nav, setNav] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [shadow, setShadow] = useState(false);


  // ========== Get admin data in database ==========
  const [dataForm, setDataForm] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  async function allowAdmin() {
    if (
      adminList.email.includes(
        Buffer.from(
          JSON.parse(localStorage.getItem("dataForm")).email,
          "base64"
        ).toString("utf-8")
      )
    ) {
      setIsAdmin(true);
    }
  }

  useEffect(() => {
    setDataForm(JSON.parse(localStorage.getItem("dataForm")));
    allowAdmin();
  }, []);
  // =================================================

  const logout = async () => {
    localStorage.removeItem("dataForm");
    toast.success("Successfully Logout!", {
      position: "bottom-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    router.reload();
  };
  // ==============================

  const handleNav = () => {
    setNav(!nav);
  };

  function handleCopy() {
    navigator.clipboard.writeText("043-009700");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  const textInLibrary =
    lat >= 16.472419882673314 &&
    lat <= 16.47391226944115 &&
    lng >= 102.82285520076572 &&
    lng <= 102.82387015776939
      ? "In Library"
      : "Out of Library";

  if (dataForm != null) {
    return (
      <div
        className={
          shadow
            ? "fixed w-full h-100 shadow-xl bg-[white] z-[9999]"
            : "fixed w-full h-100 bg-[white] z-[9999]"
        }
      >
        <div
          className="flex justify-between items-center w-full h-full px-2 2xl:px-16 dark:bg-[#202020]
"
        >
          <div className=" p-4 ">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link href="/">
                <Image
                  className=""
                  src="../../assets/LogoKKU.svg"
                  width={50}
                  height={120}
                  style={{ inset: "10px" }}
                  alt="/"
                />
              </Link>
              <span
                style={{ marginLeft: "20px" }}
                className="lg:text-xl md:text-l  dark:text-[#fcfcfc]"
              >
                ENGINEER LIBRARY
              </span>
            </div>
          </div>

          <div className="ml-auto">
            <ul className="hidden md:flex p-10">
              {/* //////////////////////// */}
              {showLatLng && (
                <ul className="ml-12 font-semibold text-md tracking-widest hover:scale-100 ease-in duration-200">
                  <li className="flex items-center hover:scale-100 ease-in duration-200 dark:text-[#fcfcfc]">
                    <span className="uppercase">Your location</span> <IoMdArrowDropdown />
                    <ul className="dropdown mt-24">
                      <li>
                        <p>lat : {lat}</p>
                        <p>lng : {lng}</p>
                        <p>{textInLibrary}</p>
                      </li>
                    </ul>
                  </li>
                </ul>
              )}

              {isAdmin && (
                <Link href="../components/admin" as="/admin">
                  <li className="ml-12 font-semibold text-md tracking-widest uppercase hover:border-b hover:scale-105 ease-in duration-200 hover:text-[#f9a826] dark:text-[#fcfcfc]">
                    {" "}
                    Admin{" "}
                  </li>
                </Link>
              )}
              {/* //////////////////////// */}
              <Link href="/">
                <li className="ml-12 font-semibold text-md tracking-widest uppercase  hover:scale-100 ease-in duration-200 hover:text-[#f9a826] dark:text-[#fcfcfc]">
                  {" "}
                  HOME{" "}
                </li>
              </Link>

              <ul className="ml-12 font-semibold text-md tracking-widest hover:scale-100 ease-in duration-200">
                <li>
                  <Link legacyBehavior href="/#book">
                    <a className="hover:text-[#f9a826] flex items-center hover:scale-100 ease-in duration-200 dark:text-[#fcfcfc]">
                      BOOK <IoMdArrowDropdown />
                    </a>
                  </Link>
                  <ul className="dropdown p-4">
                    <li>
                      <a href="/#list">Booking List</a>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className=""></div>
            </ul>
            <div onClick={handleNav} className="md:hidden p-6">
              <AiOutlineMenu size={25} className="dark:text-white" />
            </div>
          </div>
          {/*============ DARKMODE BUTTON ADDED HERE!! ============= */}
          {/*============ DARKMODE ADDED HERE!! ============= */}

          {/*============ ICON AND LOGOUT !! ============= */}
          <ul className="ml-0 font-semibold text-md tracking-widest  hover:scale-100 ease-in duration-200">
            <li>
              <PiUserCircleThin
                size={25}
                className="dark:text-white hidden md:flex "
                style={{ width: "50px", height: "50px" }}
              ></PiUserCircleThin>

              <div className="w-36">
                <a className="font-bold text-sm ">
                  {" "}
                  {Buffer.from(
                    JSON.parse(localStorage.getItem("dataForm")).cn,
                    "base64"
                  ).toString("utf-8")}
                </a>
                <li className="font-semibold mt-2 dropdown p-1 rounded-full  uppercase tracking-widest">
                  <a href="#" onClick={logout}>
                    Logout
                  </a>
                </li>
              </div>
            </li>
          </ul>
        </div>

        <div
          className={
            nav
              ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/60 ease-in duration-500 z-999999999"
              : ""

            /*md:hidden fixed left-0 top-0 w-full h-screen bg-black/70'*/
          }
        >
          {/* ***************** Navbar for MOBILE ***************** */}
          <div
            className={
              nav
                ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[white] p-10 ease-in duration-500 dark:bg-[#1d1d24]"
                : "fixed left-[-100%] top-0   p-10 ease-in duration-500 dark:bg-gray-900"
            }
          >
            <div>
              <div className="flex w-full items-center justify-between">
                <Image
                  src="assets/LogoKKU.svg"
                  width={50}
                  height={120}
                  alt="/"
                />
                <div
                  onClick={handleNav}
                  className="rounded-full shadow-lg shadow-gray-300 p-2 cursor-pointer bg-[#efefef]"
                >
                  <AiOutlineClose size={20} />
                </div>
              </div>
              <div className="mt-6 border-b border-gray-300 my-1 dark:text-[#efefef]">
                <a className="text-lg my-1 ">
                  {Buffer.from(
                    JSON.parse(localStorage.getItem("dataForm")).name,
                    "base64"
                  ).toString("utf-8")}
                </a>
                <a className="text-lg my-1 ml-1">
                  {Buffer.from(
                    JSON.parse(localStorage.getItem("dataForm")).surname,
                    "base64"
                  ).toString("utf-8")}
                </a>
                <p className="w-[85%] md:w-[90%] py-4 uppercase text-lg">
                  <a className="text-lg my-1 ">
                    {Buffer.from(
                      JSON.parse(localStorage.getItem("dataForm")).cn,
                      "base64"
                    ).toString("utf-8")}
                  </a>
                </p>
              </div>
            </div>
            <div>
              <ul className="uppercase">
                {isAdmin && (
                  <Link href="../components/admin" as="/admin">
                    <li className="text-md py-4 hover:text-[#f9a826] dark:text-[#efefef]">
                      {" "}
                      Admin{" "}
                    </li>
                  </Link>
                )}

                <Link href="/#book">
                  <li
                    onClick={() => setNav(false)}
                    className="text-md py-4 hover:text-[#f9a826] dark:text-[#efefef] "
                  >
                    Book here
                  </li>
                </Link>
                <Link href="/#list">
                  <li
                    onClick={() => setNav(false)}
                    className="text-md py-4 hover:text-[#efefef] dark:text-[#efefef]"
                  >
                    Booking list
                  </li>
                </Link>
                {showLatLng && (
                  <li className="text-md py-4 hover:text-[#efefef] dark:text-[#efefef]">
                    Your location
                    <li>
                      <p>lat : {lat}</p>
                      <p>lng : {lng}</p>
                      <p>{textInLibrary}</p>
                    </li>
                  </li>
                )}
                <li
                  onClick={() => {
                    setNav(false);
                    logout();
                  }}
                  className="text-md py-4 hover:text-[red] dark:text-[#efefef]"
                >
                  logout
                </li>
              </ul>
            </div>

            <div className="pt-2 my-1">
              <div className="flex items-center justify-between my-3 w-full sm:w-[100%] dark:text-white">
                <a href="https://www.facebook.com/kkuenglib" target="_blank">
                  {" "}
                  <div
                    className="rounded-full shadow-sm shadow-[#325380] p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                    title="Facebook Page"
                  >
                    <FaFacebook />
                  </div>
                </a>

                <div
                  className={`rounded-full shadow-md shadow-[#325380] p-3 cursor-pointer hover:scale-105 ease-in duration-300 ${
                    isCopied ? "flex justify-center items-center" : ""
                  }`}
                  title="Phone Number"
                  onClick={handleCopy}
                >
                  <BsFillTelephoneFill />
                  {isCopied && (
                    <div className="text-xs text-[#218a21] ml-4 dark:text-white">
                      Number copied
                    </div>
                  )}
                </div>

                <a href="https://kku.world/wp7md" target="_blank">
                  {" "}
                  <div
                    className="rounded-full shadow-sm shadow-[#325380] p-3 cursor-pointer hover:scale-105 ease-in duration-300"
                    title="Official Website For More Information"
                  >
                    <TbLocationFilled />
                  </div>
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
