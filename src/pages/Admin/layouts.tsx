import { Box, Flex, Stack } from "@chakra-ui/react";
import Sidebar from "../Admin/components/sidebar";
import Navbar from "../Admin/components/header";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <Flex h="100vh">
      {/* Sidebar */}
      <Box
        w="250px"
        bg="gray.100"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box w="100vw">
        <Navbar />
        <Box mx={10} p={10}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default LayoutAdmin;
