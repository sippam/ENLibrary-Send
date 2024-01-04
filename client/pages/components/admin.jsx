import { React, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AdminTable from "./AdminTable";
import Navbar from "./Navbar";
import DataChart from "./DataChart";
import { useRouter } from "next/router";
import { getRole } from "@/data/dataUserAndAdmin";
import Cookies from "js-cookie";

const admin = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  // ========== Check Admin ==========
  async function allowAdmin(token) {
    const boolean = await getRole(token);
    setIsAdmin(boolean);
  }

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      allowAdmin(token);
    } else {
      router.push("/");
    }
  }, [isAdmin, router]);

  // =================================
  if (isAdmin) {
    return (
      <div id="admin" className="w-full lg:h-screen dark:bg-[#282a36]">
        <Navbar showLatLng={false} />
        <div id="book" className="max-w-[90%] m-auto px-2 py-40 w-full">
          <div className="">
            <DataChart admin={isAdmin} />
          </div>
          <AdminTable />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default admin;
