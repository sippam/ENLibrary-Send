import { React, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import AdminTable from "./AdminTable";
import Navbar from "./Navbar";
import DataChart from "./DataChart";
import Login from "./Login";
import adminList from "../../data/adminList.json"

const admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  // ========== Check Admin ==========
  async function allowAdmin() {
    if (adminList.email.includes(Buffer.from(
      JSON.parse(localStorage.getItem("dataForm")).email,
      "base64"
    ).toString("utf-8"))) {
      setIsAdmin(true);
    }
  }

  useEffect(() => {
    allowAdmin();
  }, []);
  // =================================
  if (isAdmin) {
    return (
      <div id="admin" className="w-full lg:h-screen dark:bg-[#282a36]">
        <Navbar />
        <div id="book" className="max-w-[90%] m-auto px-2 py-40 w-full">
          <div className="">
            <DataChart admin={isAdmin} />
          </div>
          <AdminTable admin={isAdmin} />

        </div>
      </div>
    );
  } else {
    return <Login />;
  }
};

export default admin;
