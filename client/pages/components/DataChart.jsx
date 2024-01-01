import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getRoomReserve } from "../../data/dataUserAndAdmin";
import Login from "./Login";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DataChart = (admin) => {
  const isAdmin = admin.admin;
  // ========== Get all customer data ==========
  const [dataShow, setDataShow] = useState([]);

  const getUserData = async () => {
    const data = await getRoomReserve();
    setDataShow(data);
  };

  useEffect(() => {
    getUserData();
  }, []);
  // ===========================================

  // ========== Filter data to show in datachart ==========
  let dataCon1,
    dataCon2,
    dataCon3,
    dataMeet1,
    dataMeet2,
    dataMeet3,
    dataMeet4 = [];

  if (dataShow !== undefined) {
    dataCon1 = dataShow.filter(
      (val) => val.roomType == "Conference" && val.roomNumber == 1
    ).length;
    dataCon2 = dataShow.filter(
      (val) => val.roomType == "Conference" && val.roomNumber == 2
    ).length;
    dataCon3 = dataShow.filter(
      (val) => val.roomType == "Conference" && val.roomNumber == 3
    ).length;
    dataMeet1 = dataShow.filter(
      (val) => val.roomType == "Meeting" && val.roomNumber == 1
    ).length;
    dataMeet2 = dataShow.filter(
      (val) => val.roomType == "Meeting" && val.roomNumber == 2
    ).length;
    dataMeet3 = dataShow.filter(
      (val) => val.roomType == "Meeting" && val.roomNumber == 3
    ).length;
    dataMeet4 = dataShow.filter(
      (val) => val.roomType == "Meeting" && val.roomNumber == 4
    ).length;
  }

  // console.log(dataCon1, dataCon2, dataCon3, dataMeet1, dataMeet2, dataMeet3, dataMeet4);
  // ========================================================

  // ========== model datachart ==========
  const data = {
    labels: [
      "Conferece-1",
      "Conferece-2",
      "Conferece-3",
      "Meeting-1",
      "Meeting-2",
      "Meeting-3",
      "Meeting-4",
    ],
    datasets: [
      {
        label: "Number of People",
        data: [
          dataCon1,
          dataCon2,
          dataCon3,
          dataMeet1,
          dataMeet2,
          dataMeet3,
          dataMeet4,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const option = {
    scales: {
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
    maintainAspectRatio: false,
  };
  // ======================================

  if (isAdmin) {
    return <Bar data={data} style={{ height: "30vh" }} options={option} />;
  } else {
    return <Login />;
  }
};

export default DataChart;
