import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Login from "../components/Login";
import { useRouter } from "next/router";
import Axios from "axios";
// import Cookies from "js-cookie";
import { setCookie } from 'cookies-next';

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
          headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.NEXT_PUBLIC_TOKEN,
          }
        }).then((res) => {
          // router.push("/");
          // cookies.set("token-next", res.data.token);
          // Cookies.set("token", res.data.token);
          setCookie("token", res.data.token);
        });
        router.push("/");
      }
      setToken();
    }
  });
  return (
    <div>
      <Login />
    </div>
  );
};

export default sso;
