import { Button, Stack, Text } from "@chakra-ui/react";
import { logout } from "../../utils/helper/helper";

const index = () => {
  // const count = useStore<number>((state) => state.count);
  // const increment = useStore<() => void>((state) => state.increment);
  // const decrement = useStore<() => void>((state) => state.decrement);

  // console.log(count);
  return (
    <Stack width={"100vw"} height={"100vh"}>
      <Stack
        width={"100%"}
        aspectRatio={"1440/622"}
        backgroundImage={"/carousel-dashboard.png"}
        backgroundPosition={"center"}
        backgroundSize={"conver"}
        backgroundRepeat={"no-repeat"}
        padding={{ base: "20px", md: "40px" }}
        justifyContent={"center"}
      >
        <Text fontSize={"40px"} color={"white"}>
          Selamat Datang di Livinhome
        </Text>
      </Stack>

      <Button onClick={logout} position={"fixed"} top={"0"} right={0} colorScheme={"red"}>
        Logout
      </Button>
    </Stack>
  );
};

export default index;
