import React, { useState, useEffect } from "react";
import { getExamPeriod } from "../../data/dataUserAndAdmin";

const Announce = () => {
  const [examPeriod, setExamPeriod] = useState(false);

  useEffect(() => {
    const getDataExam = async () => {
      try {
        const data = await getExamPeriod();
        setExamPeriod(data[0].isEnable);
      } catch (error) {
        console.error("Error fetching exam period:", error);
      }
    };

    getDataExam();
  }, []);

  const text = [
    "For engineering students only",
    `Booking between ${examPeriod ? "10:00 AM to 4:00 PM" : "24/7 "}`,
    "Each time of booking must not exceed 3 hours",
  ];

  return (
    <div className="flex flex-col items-center mt-16 sm:-mt-20">
      <ul className="flex flex-col justify-start">
        {text.map((item, index) => (
          <li className="list-disc list-inside" key={index}>
            <span className="text-red-500 font-bold text-xs sm:text-base md:text-lg">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announce;
