import { HStack, Image, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

const ListChats = (props: { setShowDetailChat: any }) => {
  const listChats = [
    {
      avatar: "https://avatars.githubusercontent.com/u/177474254?v=4",
      name: "Kara",
      thumbnailChat:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique magnam vitae vel nisi ipsum tenetur maiores ea quos veritatis beatae.",
      countUnreadChats: 1,
      time: "09:51",
    },
    {
      avatar: "https://avatars.githubusercontent.com/u/177474254?v=4",
      name: "Santi",
      thumbnailChat: "Disini harga nya 2.8 Juta/Bulan",
      countUnreadChats: 2,
      time: "10:51",
    },
  ];
  const [searchInput, setSearchInput] = useState<string>("");
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
        .filter((i) => i.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
        .map((i: any, index) => (
          <HStack
            key={index}
            onClick={() => props.setShowDetailChat(true)}
            _hover={{ backgroundColor: "rgba(239, 239, 239, 1)" }}
            padding={"20px"}
            fontWeight={"400"}
            cursor={"pointer"}
            width={"100%"}
          >
            <Image width={"52px"} height={"52px"} src={i.avatar} objectFit={"cover"} borderRadius={"100%"} />
            <Stack width={"calc(100% - 100px)"} gap={"0px"}>
              <Text fontSize={"16px"} color={"black"}>
                {i.name}
              </Text>
              <Text
                fontSize={"12px"}
                color={"rgba(96, 90, 90, 1)"}
                isTruncated // Menambahkan ini untuk mengaktifkan ellipsis
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
              >
                {i.thumbnailChat}
              </Text>
            </Stack>

            <Stack alignItems={"center"} fontSize={"10px"} fontWeight={"300"} height={"100%"} justifyContent={"start"}>
              <Text color={"rgba(0, 0, 0, 1)"}>{i.time}</Text>
              <Stack backgroundColor={"rgba(197, 142, 36, 1)"} width={"20px"} height={"20px"} color={"white"} borderRadius={"100%"}>
                <Text margin={"auto"}>{i.countUnreadChats}</Text>
              </Stack>
            </Stack>
          </HStack>
        ))}
    </Stack>
  );
};

export default ListChats;
