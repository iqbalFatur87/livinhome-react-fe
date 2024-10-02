import { useEffect, useState } from "react";
import { Button, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { primaryTextColor, primaryTextTitleColor } from "../../../components/theme";
import { logout } from "../../../utils/helper/helper";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sections = [
    {
      title: "Homepage",
      url: "/owner/dashboard",
    },
    {
      title: "Properti",
      url: "/owner/management-properti",
    },
    {
      title: "Pesan",
      url: "/404",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HStack
        height="1.7cm"
        paddingX={{ base: "10px", md: "40px" }}
        width="100%"
        maxW="1440px"
        // backgroundColor={scrolled ? "white" : "transparent"}
        backgroundColor={"white"}
        justify="space-between"
        className="navbar"
        position="fixed"
        zIndex="9999"
        boxShadow={scrolled ? "rgba(0, 0, 0, 0.16) 0px 1px 4px" : "none"}
        fontSize="14px"
        transition="background-color 0.3s ease, box-shadow 0.3s ease"
      >
        <Image src="/logo.png" />

        <HStack gap="15px" display={{ base: "none", lg: "flex" }}>
          {sections.map((section: { title: string; url: string }) => (
            <Link key={section.title} to={section.url}>
              <Text
                color={location.pathname === section.url ? primaryTextTitleColor() : primaryTextColor()}
                fontWeight={location.pathname === section.url ? "bold" : "normal"}
                _hover={{ color: primaryTextTitleColor() }}
                cursor="pointer"
                fontSize={"md"}
              >
                {section.title}
              </Text>
            </Link>
          ))}

          <Image
            onClick={() => {
              navigate("/owner/profil");
            }}
            cursor={"pointer"}
            src="/avatar.png"
            width={"50px"}
            height={"50px"}
            objectFit={"contain"}
          />
          <Button onClick={logout} colorScheme={"red"}>
            Logout
          </Button>
        </HStack>

        <Button variant="solid" colorScheme="orange" display={{ base: "flex", lg: "none" }} onClick={() => setShowSidebar(true)}>
          <GiHamburgerMenu />
        </Button>
      </HStack>

      <Stack
        transform={!showSidebar ? "translateX(100%)" : "translateX(0%)"}
        transition="all 0.5s"
        display={{ base: "flex", lg: "none" }}
        paddingX={{ base: "10px", lg: "40px" }}
        paddingY="20px"
        width="100%"
        height="100vh"
        maxW="1440px"
        backgroundColor={"white"}
        position="fixed"
        zIndex="10000"
      >
        <HStack justifyContent="space-between">
          <Image src="/logo.png" />
          <Button variant="outline" colorScheme="orange" display={{ base: "flex", lg: "none" }} onClick={() => setShowSidebar(false)}>
            <IoMdClose />
          </Button>
        </HStack>

        <Stack gap="5px" my="30px">
          <Image
            onClick={() => {
              navigate("/owner/profil");
              setShowSidebar(false);
            }}
            cursor={"pointer"}
            src="/avatar.png"
            marginBottom={"30px"}
            width={"50px"}
            height={"50px"}
            objectFit={"contain"}
            alignSelf={"center"}
          />
          {sections.map((section: { title: string; url: string }) => (
            <Button
              key={section.title}
              variant={location.pathname === section.url ? "solid" : "outline"}
              colorScheme="orange"
              onClick={() => {
                setShowSidebar(false);
                navigate(section.url);
              }}
            >
              {section.title}
            </Button>
          ))}
          <Button onClick={logout} colorScheme={"red"} variant={"outline"}>
            Logout
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Navbar;
