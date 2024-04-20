import { React, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AdminTable from "./AdminTable";
import Navbar from "./Navbar";
import DataChart from "./DataChart";
import { useRouter } from "next/router";
import { getRole } from "@/data/dataUserAndAdmin";

const admin = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  // ========== Check Admin ==========
  async function allowAdmin(token) {
    try {
      const boolean = await getRole(token);
      setIsAdmin(boolean);
    } catch (error) {
      localStorage.removeItem("token");
      router.reload();
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
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
