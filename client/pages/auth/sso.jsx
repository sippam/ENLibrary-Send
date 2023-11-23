import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Login from "../components/Login";
import { useRouter } from "next/router";

const sso = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (
      searchParams.has("email") &&
      searchParams.has("title") &&
      searchParams.has("name") &&
      searchParams.has("surname") &&
      searchParams.has("type") &&
      searchParams.has("address") &&
      searchParams.has("faculty") &&
      searchParams.has("position") &&
      //   searchParams.has("pic") &&
      searchParams.has("cn")
    ) {
      const email = searchParams.get("email");
      const title = searchParams.get("title");
      const name = searchParams.get("name");
      const surname = searchParams.get("surname");
      const type = searchParams.get("type");
      const address = searchParams.get("address");
      const faculty = searchParams.get("faculty");
      const position = searchParams.get("position");
      const cn = searchParams.get("cn");
      
      const dataForm = {
        email: email,
        title: title,
        name: name,
        surname: surname,
        type: type,
        address: address,
        faculty: faculty,
        position: position,
        cn: cn,
      };
      localStorage.setItem("dataForm", JSON.stringify(dataForm));
      router.push("/");
    }
  });
  return (
    <div>
      <Login />
    </div>
  );
};

export default sso;
