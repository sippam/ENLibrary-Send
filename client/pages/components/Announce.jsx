import React, { useState, useEffect } from "react";
import { getExamPeriod } from "../../data/dataUserAndAdmin";

const Announce = () => {
  const [examPeriod, setExamPeriod] = useState(false);

  useEffect(() => {
    const getDataExam = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const data = await getExamPeriod(token);
          setExamPeriod(data[0]?.isEnable);
        } catch (error) {
          // localStorage.removeItem("token");
          // router.reload(); // Redirect user to the homepage
        }
      }
    };

    getDataExam();
  }, []);
  const text = [
    "Engineering students only",
    `Booking ${!examPeriod ? "10:00 AM to 4:00 PM" : "24/7 "}`,
    "You can booking only once a time",
    "Auto check-in on site by open website in library area",
    "Check-in within 15 minutes, late will be cancelled",
  ];

  return (
    <div className="flex flex-col items-center mt-16 sm:-mt-20 lg:mt-5 overflow-hidden">
      <ul className="flex flex-col justify-center items-center">
        {text.map((item, index) => (
          <p
            key={index}
            className="text-blue-800 font-semibold font-sans text-sm sm:text-base md:text-lg"
          >
            {item}
          </p>
        ))}
      </ul>
    </div>
  );
};

export default Announce;
