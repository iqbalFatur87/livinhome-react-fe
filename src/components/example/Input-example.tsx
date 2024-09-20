import { Input, Stack, Text } from "@chakra-ui/react";
import {
  customBorder,
  inputBackgroundColor,
  inputColor,
  primaryTextColor,
} from "../theme";

const index = () => (
  <Stack>
    <Text color={primaryTextColor()}>Username / Email</Text>
    <Input
      backgroundColor={inputBackgroundColor()}
      border={customBorder()}
      color={inputColor()}
      placeholder="username / email anda"
      required
    />
  </Stack>
);

export default index;
