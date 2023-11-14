import React, { useState, useEffect } from "react";
import { getExamPeriod } from "../../data/dataUserAndAdmin";

const Announce = () => {
  const [examPeriod, setExamPeriod] = useState(false);

  useEffect(() => {
    const getDataExam = async () => {
      try {
        await getExamPeriod((data) => {
          setExamPeriod(data[0].isEnable);
        });
      } catch (error) {
        console.error("Error fetching exam period:", error);
      }
    };

    getDataExam();
  }, []);

  const text = [
    "For engineering students only  " +
      `|   Booking between ${!examPeriod ? "10:00 AM to 4:00 PM" : "24/7 "}`,
    // "|  Each time of booking must not exceed 3 hours",
  ];

  return (
    <div className="capitalize flex flex-col items-center mt-16 sm:-mt-20 overflow-hidden">
      <ul className="flex flex-col justify-start">
        {text.map((item, index) => (
          <a className="list-disc list-inside" key={index}>
            <span className="text-red-500 font-sans text-xs sm:text-base md:text-lg animate-move-marquee">
              {item}
            </span>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default Announce;
