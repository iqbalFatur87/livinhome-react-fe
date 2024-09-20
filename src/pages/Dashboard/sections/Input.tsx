import { Input } from "@chakra-ui/react";
import { useStore } from "../../../utils/store/store";
import { shallow } from "zustand/shallow";

const UsernameInput = () => {
  const [username, changeUsername] = useStore<
    [string, (username: string) => void]
  >((state) => [state.username, state.changeUsername], shallow);
  console.log(username);
  return (
    <Input value={username} onChange={(e) => changeUsername(e.target.value)} />
  );
};

export default UsernameInput;
