import { Grid, GridItem, Stack } from "@chakra-ui/react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { backgroundColor } from "../components/theme";
import { ThemeContext } from "../App";
import { useContext } from "react";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const theme: any = useContext(ThemeContext);
  const params = useParams();
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const pageName: string | number = params.id
    ? parts[parts.length - 2]
    : parts[parts.length - 1];

  return (
    <Stack
      maxWidth={"100vw"}
      minH={"100vh"}
      bgColor={"white"}
      position={"relative"}
      backgroundColor={backgroundColor()}
      alignItems={"center"}
      overflowX={"hidden"}
    >
      <Grid
        templateColumns={{ lg: "20rem auto" }}
        maxWidth={"1920px"}
        width={"100vw"}
      >
        <GridItem position={"relative"}>
          <Sidebar parts={parts} theme={theme} pageName={pageName} />
        </GridItem>
        <GridItem>
          <Stack
            padding={{ base: "10px", md: "20px" }}
            maxWidth={"1440px"}
            width={{ base: "100vw", lg: "calc(100vw - 20rem)" }}
            overflowX={"hidden"}
            marginTop={{ base: "2cm", lg: "0" }}
          >
            <Outlet />
          </Stack>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default Layout;
