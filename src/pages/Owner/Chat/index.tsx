import { Stack } from "@chakra-ui/react";
import ListChats from "./components/ListChats";
import { useState } from "react";
import DetailChats from "./components/DetailChats";
// import DetailChats from "./components/DetailChats";

const index = () => {
  const [showDetailChat, setShowDetailChat] = useState(false);
  return (
    <Stack width={"100%"}>
      {!showDetailChat ? <ListChats setShowDetailChat={setShowDetailChat} /> : <DetailChats setShowDetailChat={setShowDetailChat} />}
    </Stack>
  );
};

export default index;
