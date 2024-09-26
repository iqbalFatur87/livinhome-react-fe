import { Stack } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { LOCAL_STORAGE, logout } from "../../utils/helper/helper";

const LayoutOwner = () => {
  useEffect(() => {
    if (LOCAL_STORAGE()?.ROLE !== "owner") {
      logout();
    }
  }, [LOCAL_STORAGE()?.ROLE]);
  return (
    <Stack width={"100%"} justifyContent={"center"} alignItems={"center"}>
      <Stack width={"100%"} maxWidth={"1440px"}>
        <Navbar />
        <Stack paddingY={"20px"} paddingX={{ base: "8px", md: "50px" }} marginTop={"2cm"}>
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LayoutOwner;
