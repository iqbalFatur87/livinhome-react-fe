import { Text, Stack, HStack, Icon } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import {
  borderRadius,
  primaryColor,
  primaryTextTitleColor,
  secondaryTextColor,
  selectedItem,
} from "../../theme";
export const NavItem = (props: {
  label: string;
  link: string;
  icon: any;
  setShowSidebar?: any;
}) => {
  const location = useLocation();
  const active = location.pathname == props.link;
  return (
    <NavLink to={props.link}>
      <HStack
        width={"100%"}
        transition="200ms"
        justifyContent={"flex-start"}
        alignItems="center"
        _hover={{ backgroundColor: selectedItem() }}
        bg={active ? selectedItem() : "null"}
        color={active ? primaryTextTitleColor() : secondaryTextColor()}
        borderRadius={borderRadius()}
        paddingY={"10px"}
        paddingX={"10px"}
        gap={"14px"}
        onClick={props.setShowSidebar.off}
      >
        <Stack
          width={"30px"}
          height={"30px"}
          backgroundColor={active ? primaryColor() : selectedItem()}
          // backgroundColor={primaryColor()}
          alignItems={"center"}
          justifyContent={"center"}
          borderRadius={"12px"}
        >
          <Icon
            color={active ? "white" : "#42AA58"}
            as={props.icon}
            width={"15px"}
            height={"15px"}
          />
        </Stack>
        <Text fontSize={"12px"} as={"b"}>
          {props.label}
        </Text>
      </HStack>
    </NavLink>
  );
};
