import { Button, Stack } from "@chakra-ui/react";
import { backgroundContainer, borderRadius } from "./theme";

const LoadingComponent = () => {
  return (
    <Stack
      borderRadius={borderRadius()}
      backgroundColor={backgroundContainer()}
      width={"100%"}
      height={"500px"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Button isLoading={true}></Button>
    </Stack>
  );
};

export default LoadingComponent;
