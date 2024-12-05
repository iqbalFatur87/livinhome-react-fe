import { Stack, HStack, Input, Text, Image } from "@chakra-ui/react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowBack, IoIosInformationCircleOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { LuSendHorizonal } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useParams } from "react-router-dom";

// Improved type definitions
interface ChatMessage {
  sender_id: number;
  message: string;
  created_at: string;
  read_at: string | null;
}

interface ChatDetail {
  chat: {
    id: number;
    property: {
      name: string | null;
      image: string;
    };
  };
  messages: ChatMessage[];
}

interface FormattedChat {
  subject: boolean;
  message: string;
  time: string;
  status: "Read" | "Delivered";
}

const DetailChats = (props: { setShowDetailChat: (show: boolean) => void }) => {
  const [chats, setChats] = useState<FormattedChat[]>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatDetail, setChatDetail] = useState<ChatDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const fetchDetailChat = async () => {
    const token = localStorage.getItem("token");
    const chatId = localStorage.getItem("chat_id");

    // const {getID }= useParams();
    if (!token) {
      setError("Authentication or Chat ID missing");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get<{
        meta: { status: string };
        data: ChatDetail;
      }>(`https://livin-api.rrens.me/api/chat/chat-detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.meta.status === "success") {
        setChatDetail(response.data.data);
        formatAndSetChats(response.data.data.messages);
      } else {
        throw new Error("Chat details fetch failed");
      }
    } catch (err: any) {
      setError(err.message || "Unknown error occurred");
      console.error("Chat details error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAndSetChats = (messages: ChatMessage[]) => {
    const formattedChats: FormattedChat[] = messages.map((message) => ({
      subject: message.sender_id === 2, // Current user's sender_id
      message: message.message,
      time: new Date(message.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: message.read_at ? "Read" : "Delivered",
    }));

    setChats(formattedChats);
  };

  const submit = async () => {
    if (!chatInput.trim()) return;

    const token = localStorage.getItem("token");
    if (!token || !chatDetail) {
      setError("Missing authentication or chat details");
      return;
    }

    try {
      await axios.post(
        "https://livin-api.rrens.me/api/chat/store-chat",
        {
          chat_id: chatDetail.chat.id,
          message: chatInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newMessage: FormattedChat = {
        subject: true,
        message: chatInput,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "Delivered",
      };

      setChats((prev) => [...prev, newMessage]);
      setChatInput("");
    } catch (error) {
      console.error("Message send error:", error);
      // Optional: Add user-friendly error notification
    }
  };

  useEffect(() => {
    fetchDetailChat();
  }, [id]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text color="red">Error: {error}</Text>;
  // Render detail penerima chat berdasarkan data yang diterima
  const receiverName =
    chatDetail?.chat?.property?.name === null
      ? "pemilik"
      : chatDetail?.chat?.property?.name;
  const receiverImage =
    chatDetail?.chat?.property?.image ||
    "https://avatars.githubusercontent.com/u/177474254?v=4";

  return (
    <Stack
      width={"100%"}
      maxWidth={"700px"}
      backgroundColor={"rgba(239, 239, 239, 1)"}
      borderRadius={"30px"}
      margin={"auto"}
    >
      <HStack
        paddingX={"20px"}
        width={"100%"}
        borderTopRadius={"30px"}
        height={"74px"}
        justifyContent={"space-between"}
      >
        <HStack>
          <Link to="/">
            <IoIosArrowBack
              // onClick={() => props.setShowDetailChat(false)}
              fontSize={"22px"}
              cursor={"pointer"}
            />
          </Link>
          <Image
            src={chatDetail?.chat?.property?.image}
            width={"52px"}
            height={"52px"}
            objectFit={"cover"}
            borderRadius={"100%"}
          />
          <Stack gap={"0px"}>
            <Text>{receiverName}</Text>
            <HStack>
              <Stack
                borderRadius={"100%"}
                width={"8px"}
                height={"8px"}
                backgroundColor={"rgba(12, 147, 0, 1)"}
              ></Stack>
              <Text fontSize={"12px"}>Sedang Online</Text>
            </HStack>
          </Stack>
        </HStack>

        {/* Bagian header lainnya tetap sama */}
        <HStack fontSize={"22px"} color={"rgba(197, 142, 36, 1)"} gap={"15px"}>
          <IoSearchOutline style={{ cursor: "pointer" }} />
          <IoIosInformationCircleOutline style={{ cursor: "pointer" }} />
          <RxHamburgerMenu style={{ cursor: "pointer" }} />
        </HStack>
      </HStack>

      {/* Data Properti */}
      {/* <Stack>
        <Image src={chatDetail?.chat?.property?.image}></Image>
      </Stack> */}

      {/* Bagian rendering pesan tetap sama */}
      <Stack gap={"20px"} overflowY={"auto"} height={"calc(100vh - 6.5cm)"}>
        {/* Cek jika chats kosong */}
        {chats.length === 0 ? (
          <Text fontSize="16px" color="gray.500" textAlign="center">
            Belum ada pesan
          </Text>
        ) : (
          chats.map((i: any, index: number) => (
            <HStack
              key={index}
              width={"100%"}
              paddingX={"20px"}
              justifyContent={i.subject ? "flex-end" : "flex-start"}
            >
              <HStack
                fontSize={"12px"}
                flexDirection={i.subject ? "row" : "row-reverse"}
              >
                <Stack
                  color={"rgba(96, 90, 90, 1)"}
                  gap={"0px"}
                  alignItems={"flex-end"}
                >
                  <Text>{i.status}</Text>
                  <Text>{i.time}</Text>
                </Stack>
                <Stack
                  width={"auto"}
                  backgroundColor={
                    i.subject ? "rgba(197, 142, 36, 1)" : "black"
                  }
                  borderRadius={"16px"}
                  color={"white"}
                  padding={"10px"}
                >
                  <Text margin={"auto"}>{i.message}</Text>
                </Stack>
              </HStack>
            </HStack>
          ))
        )}
        <div ref={chatEndRef}></div>
      </Stack>

      {/* Form input pesan tetap sama */}
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <HStack
          borderBottomRadius={"30px"}
          justifyContent={"space-between"}
          width={"100%"}
          backgroundColor={"rgba(239, 239, 239, 1)"}
          paddingX={"20px"}
          paddingBottom={"16px"}
        >
          <Input
            backgroundColor={"rgba(217, 217, 217, 1)"}
            placeholder="Tulis Pesan"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            borderRadius={"32px"}
          />
          {chatInput ? (
            <Stack
              height={"2.5rem"}
              width={"2.5rem"}
              cursor={"pointer"}
              backgroundColor={"rgba(217, 217, 217, 1)"}
              _hover={{ backgroundColor: "#E2E8F0" }}
              fontSize={"16px"}
              color={"rgba(153, 145, 145, 1)"}
              borderRadius={"100%"}
              onClick={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <LuSendHorizonal style={{ margin: "auto" }} />
            </Stack>
          ) : null}
        </HStack>
      </form>
    </Stack>
  );
};

export default DetailChats;
