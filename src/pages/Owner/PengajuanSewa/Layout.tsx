import { Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const LayoutPengajuanSewa = () => {
  return (
    <Stack width={"100%"} gap={"32px"}>
      <Outlet />
    </Stack>
  );
};

export default LayoutPengajuanSewa;
