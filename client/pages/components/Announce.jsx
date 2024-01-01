import React, { useState, useEffect } from "react";
import { getExamPeriod } from "../../data/dataUserAndAdmin";

const Announce = () => {
  const [examPeriod, setExamPeriod] = useState(false);

  useEffect(() => {
    const getDataExam = async () => {
      try {
        const data = await getExamPeriod();
        setExamPeriod(data[0]?.isEnable);
      } catch (error) {
        console.error("Error fetching exam period:", error);
      }
    };

    getDataExam();
  }, []);
  const text = [
    "Engineering students only",
    `Booking ${!examPeriod ? "10:00 AM to 4:00 PM" : "24/7 "}`,
    "You can booking only once a time",
    "Auto check-in on site",
    "Check-in within 15 minutes, late will be cancelled",
  ];

  return (
    <div className="flex flex-col items-center mt-16 sm:-mt-20 lg:mt-5 overflow-hidden">
      <ul className="flex flex-col justify-center items-center">
        {/* <div className="flex flex-col justify-start"> */}
        {text.map((item, index) => (
          <p
            key={index}
            className="text-blue-800 font-semibold font-sans text-sm sm:text-base md:text-lg"
          >
            {item}
          </p>
        ))}
        {/* </div> */}
      </ul>
    </div>
  );
};

export default Announce;
