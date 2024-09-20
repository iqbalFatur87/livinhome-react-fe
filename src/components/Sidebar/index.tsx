import {
  Heading,
  Stack,
  useDisclosure,
  Image,
  HStack,
  Text,
  Button,
  useBoolean,
  Box,
} from "@chakra-ui/react";

import { Menu, X } from "react-feather";
import {
  backgroundContainer,
  borderRadius,
  primaryTextColor,
  primaryTextTitleColor,
  customBorder,
} from "../theme";
import {
  BsArrowLeftShort,
  BsFillBellFill,
  BsFillMoonFill,
  BsFillSunFill,
  BsNewspaper,
} from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import Divider from "../Divider";
import { useNavigate } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { MdPerson, MdAdminPanelSettings } from "react-icons/md";
import { RiAdvertisementFill } from "react-icons/ri";
import { useState } from "react";

import Pencarian from "../Pencarian";
import { FiLogOut } from "react-icons/fi";
import SidebarList from "./Fragments/SidebarList";

// accordion menus

const navcordionMenu1 = [
  {
    label: "Page 1",
    icon: MdPerson,
    path: "/page1",
  },
  {
    label: "Page 2",
    icon: MdAdminPanelSettings,
    path: "/page2",
  },
];

const navcordionMenu2 = [
  {
    label: "Page 3",
    icon: RiAdvertisementFill,
    path: "/page3",
  },
  {
    label: "Page 4",
    icon: BsNewspaper,
    path: "/page4",
  },
];
const Sidebar = (props: { theme: any; pageName: any; parts: any }) => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useBoolean(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modal, setModal]: any = useState(null);
  return (
    <>
      {/* sidebar layar besar */}
      <Box
        width={{ base: "100%", lg: "20rem" }}
        height={{ base: "auto", lg: "100vh" }}
        paddingX={{ base: "0", lg: "12px" }}
        overflow={"scroll"}
        zIndex={10}
        backgroundColor={backgroundContainer()}
        position={"fixed"}
        justifyContent={"start"}
        alignItems={"start"}
        border={{ base: customBorder(), lg: "none" }}
      >
        <Stack
          w={"full"}
          my={"auto"}
          paddingY={"10px"}
          paddingX={"12px"}
          position={"relative"}
          justifyContent={"space-between"}
        >
          <Stack display={{ base: "none", lg: "flex" }}>
            <HStack
              justifyContent={"space-between"}
              width={"100%"}
              alignItems={"start"}
            >
              <HStack>
                <Image
                  src="/assets/Logo.png"
                  width={"42px"}
                  aspectRatio={"1/1"}
                  borderRadius={borderRadius()}
                />
                <HStack lineHeight={"0.8"} as={"b"} fontSize={"2xl"}>
                  <Text color={primaryTextTitleColor()}>App Name</Text>
                </HStack>
              </HStack>
            </HStack>
            <Divider />
          </Stack>

          <HStack
            display={{ base: "flex", lg: "none" }}
            width={"100%"}
            justifyContent={"space-between"}
          >
            {props.parts.length > 2 ? (
              <Stack
                backgroundColor={backgroundContainer()}
                width={"38px"}
                height={"38px"}
                border={customBorder()}
                borderRadius={borderRadius()}
                cursor={"pointer"}
                color={primaryTextColor()}
                fontSize={"33px"}
                alignSelf={"center"}
                justifyContent={"center"}
                onClick={() => navigate(-1)}
              >
                <BsArrowLeftShort />
              </Stack>
            ) : (
              <Image
                src="/assets/Logo.png"
                width={"42px"}
                aspectRatio={"1/1"}
                borderRadius={borderRadius()}
              />
            )}

            <Heading
              color={primaryTextColor()}
              fontSize={{ base: "xl", md: "2xl" }}
              textTransform={"capitalize"}
            >
              App Name
            </Heading>
            <Button
              variant={props.theme.currentTheme ? "whiteAlpha" : "blackAlpha"}
              onClick={setShowSidebar.toggle}
              display={{ lg: "none" }}
              color={primaryTextTitleColor()}
              p={2}
              size={"md"}
              width={"40px"}
            >
              {showSidebar ? <X /> : <Menu />}
            </Button>
          </HStack>
        </Stack>

        <Stack
          alignItems={"center"}
          width={"100%"}
          display={{ base: "none", lg: "flex" }}
        >
          <Stack width={"100%"} marginBottom={"12px"} alignItems={"center"}>
            <HStack
              borderRadius={"30px"}
              backgroundColor={backgroundContainer()}
              border={customBorder()}
              paddingY={"10px"}
              paddingX={"20px"}
              maxWidth={"100vw"}
              width={"250px"}
              justifyContent={"space-between"}
            >
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={"18px"}
                objectFit={"contain"}
                color={"#A3AED0"}
                cursor={"pointer"}
                onClick={() => {
                  setModal("pencarian");
                  onOpen();
                }}
              >
                <FaSearch />
              </Stack>

              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={"18px"}
                objectFit={"contain"}
                color={"#A3AED0"}
                cursor={"pointer"}
              >
                <BsFillBellFill />
              </Stack>
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={"18px"}
                objectFit={"contain"}
                color={"#A3AED0"}
                cursor={"pointer"}
                onClick={props.theme.switchTheme}
              >
                {props.theme.currentTheme ? (
                  <BsFillSunFill />
                ) : (
                  <BsFillMoonFill />
                )}
              </Stack>
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={"18px"}
                objectFit={"contain"}
                color={"#A3AED0"}
                cursor={"pointer"}
                onClick={() => {
                  setShowSidebar.off();
                  navigate("/pengaturan");
                }}
              >
                <AiFillSetting />
              </Stack>
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                fontSize={"18px"}
                objectFit={"contain"}
                color={"#A3AED0"}
                cursor={"pointer"}
                onClick={() => {
                  setModal("modal logout");
                  onOpen();
                }}
              >
                <FiLogOut />
              </Stack>
            </HStack>
          </Stack>
          <SidebarList
            menus={{
              navcordionMenu1: navcordionMenu1,
              navcordionMenu2: navcordionMenu2,
            }}
            setShowSidebar={setShowSidebar}
          />
        </Stack>
      </Box>

      {/* sidebar layar kecil */}
      <Stack
        transition={"0.3s"}
        paddingX={"5px"}
        alignItems={"center"}
        width={"100%"}
        display={{ lg: "none" }}
        position={"fixed"}
        backgroundColor={backgroundContainer()}
        transform={showSidebar ? "translateY(0%)" : "translateY(-100%)"}
        paddingTop={"calc(1.7cm + 12px)"}
        zIndex={9}
        border={customBorder()}
        minHeight={"100vh"}
        overflow={"scroll"}
      >
        <Stack width={"100%"} marginBottom={"12px"} alignItems={"center"}>
          <HStack
            borderRadius={"30px"}
            backgroundColor={backgroundContainer()}
            border={customBorder()}
            paddingY={"10px"}
            paddingX={"20px"}
            maxWidth={"100vw"}
            width={"250px"}
            justifyContent={"space-between"}
          >
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              fontSize={"18px"}
              objectFit={"contain"}
              color={"#A3AED0"}
              cursor={"pointer"}
              onClick={() => {
                setModal("pencarian");
                onOpen();
              }}
            >
              <FaSearch />
            </Stack>

            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              fontSize={"18px"}
              objectFit={"contain"}
              color={"#A3AED0"}
              cursor={"pointer"}
            >
              <BsFillBellFill />
            </Stack>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              fontSize={"18px"}
              objectFit={"contain"}
              color={"#A3AED0"}
              cursor={"pointer"}
              onClick={props.theme.switchTheme}
            >
              {props.theme.currentTheme ? (
                <BsFillSunFill />
              ) : (
                <BsFillMoonFill />
              )}
            </Stack>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              fontSize={"18px"}
              objectFit={"contain"}
              color={"#A3AED0"}
              cursor={"pointer"}
              onClick={() => {
                setShowSidebar.off();
                navigate("/pengaturan");
              }}
            >
              <AiFillSetting />
            </Stack>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              fontSize={"18px"}
              objectFit={"contain"}
              color={"#A3AED0"}
              cursor={"pointer"}
              onClick={() => {
                setModal("modal logout");
                onOpen();
              }}
            >
              <FiLogOut />
            </Stack>
          </HStack>
        </Stack>
        <SidebarList
          menus={{
            navcordionMenu1: navcordionMenu1,
            navcordionMenu2: navcordionMenu2,
          }}
          setShowSidebar={setShowSidebar}
        />
      </Stack>
      {modal === "pencarian" ? (
        <Pencarian isOpen={isOpen} onClose={onClose} />
      ) : null}
    </>
  );
};

export default Sidebar;
