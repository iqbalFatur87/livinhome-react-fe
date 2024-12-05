import { HStack, Image, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiFilter } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

const ListChats = (props: { setShowDetailChat: any }) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [listChats, setListChats] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  // Fetch chat list
  const fetchChats = async () => {
    try {
      const response = await axios.get("https://livin-api.rrens.me/api/chat/list-chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data && Array.isArray(response.data.data)) {
        setListChats(response.data.data);
      } else {
        console.error("Invalid response structure:", response.data);
        setListChats([]);
      }
    } catch (error) {
      console.error("Failed to fetch chats:", error);
      setListChats([]);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <Stack
      gap={"0px"}
      backgroundColor={"rgba(250, 250, 250, 1);"}
      width={"100%"}
      height={"auto"}
      maxWidth={"700px"}
      borderRadius={"30px"}
      margin={"auto"}
    >
      <HStack
        backgroundColor={"rgba(239, 239, 239, 1)"}
        paddingX={"10px"}
        width={"100%"}
        borderTopRadius={"30px"}
        height={"74px"}
        justifyContent={"space-between"}
      >
        <InputGroup backgroundColor={"white"} borderRadius={"30px"}>
          <InputLeftAddon backgroundColor={"white"} borderLeftRadius={"30px"}>
            <IoSearchOutline style={{ color: "rgba(197, 142, 36, 1)", cursor: "pointer" }} />
          </InputLeftAddon>
          <Input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Cari Pesan" />
          <InputRightAddon color={"rgba(153, 145, 145, 1)"} gap={"10px"} backgroundColor={"white"} borderRightRadius={"30px"}>
            <IoMdClose onClick={() => setSearchInput("")} style={{ cursor: "pointer" }} />
            <FiFilter style={{ cursor: "pointer" }} />
          </InputRightAddon>
        </InputGroup>
      </HStack>

      {listChats
        .filter((i) =>
          i.receiver[0]?.fullname?.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
        )
        .map((i: any, index) => (
          <Link
            key={index}
            to={`/chat/${i.receiver[0]?.id}`} // Gunakan backticks dan masukkan ID penerima
            style={{ textDecoration: "none" }} // Hapus underline default dari Link
          >
            <HStack
              _hover={{ backgroundColor: "rgba(239, 239, 239, 1)" }}
              padding={"20px"}
              fontWeight={"400"}
              cursor={"pointer"}
              width={"100%"}
            >
              <Image
                width={"52px"}
                height={"52px"}
                src={i.receiver[0]?.photo_profile}
                objectFit={"cover"}
                borderRadius={"100%"}
              />
              <Stack width={"calc(100% - 100px)"} gap={"0px"}>
                <Text fontSize={"16px"} color={"black"}>
                  {i.receiver[0]?.fullname}
                </Text>
                {/* <Text
                  fontSize={"12px"}
                  color={"rgba(96, 90, 90, 1)"}
                  isTruncated
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  whiteSpace={"nowrap"}
                >
                  {i.lastMessage || "Belum ada pesan"}
                </Text> */}
              </Stack>

              <Stack alignItems={"center"} fontSize={"10px"} fontWeight={"300"} height={"100%"} justifyContent={"start"}>
                {/* <Text color={"rgba(0, 0, 0, 1)"}>{new Date(i.created_at).toLocaleTimeString()}</Text> */}
                {/* <Stack
                  backgroundColor={"rgba(197, 142, 36, 1)"}
                  width={"20px"}
                  height={"20px"}
                  color={"white"}
                  borderRadius={"100%"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Text>{i.unreadCount || 0}</Text>
                </Stack> */}
              </Stack>
            </HStack>
          </Link>
        ))}
    </Stack>
  );
};

export default ListChats;
