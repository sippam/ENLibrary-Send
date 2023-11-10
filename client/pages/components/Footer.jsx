import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white shadow dark:bg-[#282a36]">
      <div className="w-full container mx-auto p-4 md:px-6 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between ">
          <a
            href="https://library.kku.ac.th/elementor-158/enlib/?fbclid=IwAR2HMQPWD0C0jplTRgHFC8LF6SWonvr-i1minfSyj6y-gy4JZ8m1uC6AmzY"
            target="_blank"
            className="flex items-center mb-4 sm:mb-0 "
          >
            <Image
              src="../../assets/LogoKKU.svg"
              width={50}
              height={0}
              alt=""
            />
            <span className="m-6 self-center text-2xl font-semibold whitespace-nowrap sm:text-3xl md:text-4xl dark:text-white">
              LIBRARY
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a
                href="https://th.kku.ac.th/privacy-policy/"
                target="_blank"
                className="mr-4 hover:underline md:mr-6 hover:text-[red]"
              >
                Privacy Policy
              </a>
            </li>

            <li>
              <a
                href="https://www.facebook.com/kkuenglib"
                target="_blank"
                className="hover:underline hover:text-[blue]"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a
            href="https://library.kku.ac.th/elementor-158/enlib/?fbclid=IwAR2HMQPWD0C0jplTRgHFC8LF6SWonvr-i1minfSyj6y-gy4JZ8m1uC6AmzY"
            target="_blank"
            className="hover:underline "
          >
            KKUL™ สำนักหอสมุด
          </a>
          . All Rights Reserved. Icons by{" "}
          <a
            href="https://storyset.com/"
            target="_blank"
            className="hover:underline"
          >
            {""}
            Storyset.
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
