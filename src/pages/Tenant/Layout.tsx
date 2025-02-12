import { Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavbarTenant from "../Tenant/components/Navbar";
const LayoutTenant = () => {
  return (
    <Stack width={"100%"} justifyContent={"center"} alignItems={"center"}>
      <Stack width={"100%"} maxWidth={"1440px"}>
        <NavbarTenant />
        <Stack
          paddingY={"20px"}
          paddingX={{ base: "8px", md: "2 0px" }}
          marginTop={"2cm"}
        >
          <Outlet />

        </Stack>
      </Stack>
    </Stack>
  );
};

export default LayoutTenant;
