import { useEffect, useState } from "react";
import {
  Button,
  HStack,
  Image,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose, IoIosSearch, IoIosCart } from "react-icons/io";
import { primaryTextColor, primaryTextTitleColor } from "../../../components/theme";
import { logout } from "../../../utils/helper/helper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [profile, setProfile] = useState<any>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    { title: "Beranda", url: "/dashboard" },
    { title: "Pesan", url: "/chat" },
  ];

  const fetchProfileData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(
        "https://livin-api.rrens.me/api/profile/renter",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfile(response.data.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transactionUrl =
    localStorage.getItem("success") === "berhasil"
      ? `/success-transaction/${profile?.transaction_history?.transaction_id}`
      : profile?.transaction_history?.transaction_id
      ? `/transaction-detail/${profile?.transaction_history?.transaction_id}`
      : "/searching";

  return (
    <>
      <HStack
        height="1.7cm"
        paddingX={{ base: "10px", md: "40px" }}
        width="100%"
        maxW="1440px"
        backgroundColor="white"
        justify="space-between"
        position="fixed"
        zIndex="9999"
        boxShadow={scrolled ? "rgba(0, 0, 0, 0.16) 0px 1px 4px" : "none"}
        fontSize="14px"
        transition="background-color 0.3s ease, box-shadow 0.3s ease"
      >
        <Image src="/logo.png" alt="Logo" />

        <HStack gap="15px" display={{ base: "none", lg: "flex" }}></HStack>

        <HStack>
          <Link to="/searching">
            <Button backgroundColor="transparent" color="black">
              <IoIosSearch />
            </Button>
          </Link>

          {sections.map(({ title, url }) => (
            <Link key={title} to={url}>
              <Text
                color={
                  location.pathname === url
                    ? primaryTextTitleColor()
                    : primaryTextColor()
                }
                fontWeight={location.pathname === url ? "bold" : "normal"}
                _hover={{ color: primaryTextTitleColor() }}
                cursor="pointer"
                fontSize="md"
              >
                {title}
              </Text>
            </Link>
          ))}

          <Link to={transactionUrl}>
            <Text fontSize="md">Status Transaksi</Text>
          </Link>

          <Link to="/Cart">
            <Button backgroundColor="transparent" color="black">
              <IoIosCart />
            </Button>
          </Link>

          {!profile ? (
            <Link to="/auth/login">
              <Button colorScheme="green">Login</Button>
            </Link>
          ) : (
            <>
              <Button
                variant="solid"
                colorScheme="orange"
                display={{ base: "flex", lg: "none" }}
                onClick={() => setShowSidebar(true)}
              >
                <GiHamburgerMenu />
              </Button>
              <Image
                display={{ base: "none", lg: "flex" }}
                onClick={() => navigate("/profile")}
                cursor="pointer"
                src={profile?.photo_profile || "/avatar.png"}
                width="50px"
                height="50px"
                objectFit="contain"
                alt="Profile"
              />
              <Button
                display={{ base: "none", lg: "flex" }}
                onClick={logout}
                colorScheme="red"
              >
                Logout
              </Button>
            </>
          )}
        </HStack>
      </HStack>

      {/* Sidebar for Mobile */}
      <Stack
        transform={!showSidebar ? "translateX(100%)" : "translateX(0%)"}
        transition="all 0.5s"
        display={{ base: "flex", lg: "none" }}
        paddingX="10px"
        paddingY="20px"
        width="100%"
        height="100vh"
        backgroundColor="white"
        position="fixed"
        zIndex="10000"
      >
        <HStack>
        {!profile ? (
            <Link to="/auth/login">
              <Button colorScheme="green">Login</Button>
            </Link>
          ) : (
            <Image
            display={{ base: "none", lg: "flex" }}
            onClick={() => navigate("/profile")}
            cursor="pointer"
            src={profile?.photo_profile || "/avatar.png"}
            width="50px"
            height="50px"
            objectFit="contain"
            alt="Profile"
          />
        )}
          <Button
            variant="outline"
            colorScheme="orange"
            onClick={() => setShowSidebar(false)}
          >
            <IoMdClose />
          </Button>
        </HStack>

        <Stack gap="5px" my="30px">
        {!profile ? (
            <Link to="/auth/login">
              <Button colorScheme="green">Login</Button>
            </Link>
          ) : (
            <Image
              // display={{ base: "none", lg: "flex" }}
              onClick={() => navigate("/profile")}
              cursor="pointer"
              src={profile?.photo_profile || "/avatar.png"}
             
              marginBottom={"30px"}
              width={"50px"}
              height={"50px"}
              objectFit={"contain"}
              alignSelf={"center"}

              alt="Profile"
            />
          )}
          {sections.map(({ title, url }) => (
            <Button
              key={title}
              variant={location.pathname === url ? "solid" : "outline"}
              colorScheme="orange"
              onClick={() => {
                setShowSidebar(false);
                navigate(url);
              }}
            >
              {title}
            </Button>
          ))}
          <Button onClick={logout} colorScheme="red" variant="outline">
            Logout
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Navbar;