import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

const sso = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (
      searchParams.has("email") &&
      searchParams.has("title") &&
      searchParams.has("name") &&
      searchParams.has("surname") &&
      searchParams.has("faculty") &&
      searchParams.has("cn")
    ) {
      const email = searchParams.get("email");
      const title = searchParams.get("title");
      const name = searchParams.get("name");
      const surname = searchParams.get("surname");
      const faculty = searchParams.get("faculty");
      const cn = searchParams.get("cn");

      const dataForm = {
        email: email,
        title: title,
        name: name,
        surname: surname,
        faculty: faculty,
        cn: cn,
      };

      async function setToken() {
        Axios.get("/api/jwt", {
          params: dataForm,
        }).then((res) => {
          // router.push("/");
          // cookies.set("token-next", res.data.token);
          // Cookies.set("token", res.data.token);
          localStorage.setItem("token", res.data.token);
          // setCookie("token", res.data.token);
          setTimeout(() => {
            router.push("/");
          }, 300);
        });
      }
      setToken();
    }
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <PulseLoader color={"#B30000"} speedMultiplier={0.3} size={20} />
    </div>
  );
};

export default sso;
