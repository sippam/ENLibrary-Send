import React from "react";
import Image from "next/image";
import Link from "next/link";

const Main = () => {
  return (
    <div id="/" className="dark:bg-[#282a36] ">
      <div className="w-full h-[90%] sm:h-screen text-center  ">
        <div className="max-w-[100%] w-full h-full mx-auto  p-2 flex flex-row justify-center items-center ">
          <div className="mt-36 flex flex-col sm:flex-row">
            <div className="m-2 flex justify-center items-center flex-col">
              <p className=" uppercase text-lg tracking-widest font-semibold text-[#263238]  dark:text-[#fcfcfc]">
                WELCOME TO{" "}
              </p>
              <h1 className="my-1 text-4xl md:text-6xl font-bold hover:scale-105 ease-in duration-200 text-[#B30000] ">
                ENGINEER LIBRARY
              </h1>
              <p className=" py-4 text-md tracking-widest font-semibold text-[#263238] max-w-[100%] m-3  dark:text-[#fcfcfc]">
                <span className="text-[#2c2b2b] text-lg dark:text-[#51a4c0]">
                  Enjoy
                </span>{" "}
                access to a wide selection conference room. <br />
                <span className="text-[#2c2b2b] text-lg dark:text-[#51a4c0]">
                  Easy{" "}
                </span>
                communication with your friends.
              </p>
              <Link href="/#book">
                <button className="btn-grad hover:bg-right bg-[#B30000] text-white dark:shadow-[#202020] mt-3 py-4 px-7 rounded-50 uppercase cursor-pointer hover:scale-105 ease-in duration-300 text-sm tracking-widest font-semibold">
                  BOOKING HERE
                </button>
              </Link>
            </div>
            <div className="">
              <Image
                src="../../assets/libraryanimates.svg"
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
  );
};

export default Main;
