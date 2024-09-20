import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Text,
  Icon,
  HStack,
  Stack,
  AccordionButton,
  Box,
  AccordionIcon,
} from "@chakra-ui/react";
import NavAccordionItem from "./NavAccordionItem";
import { borderRadius, secondaryTextColor, selectedItem } from "../../theme";

const NavAccordion = (props: {
  payload: any;
  label: any;
  icon: any;
  setShowSidebar?: any;
}) => {
  return (
    <>
      <Accordion allowMultiple>
        <AccordionItem border="0">
          <AccordionButton
            // justifyContent={"space-between"}
            borderRadius={borderRadius()}
            paddingY={"10px"}
            paddingX={"10px"}
            color={secondaryTextColor()}
            _hover={{ backgroundColor: selectedItem() }}
          >
            <HStack
              width={"100%"}
              transition="200ms"
              justifyContent={"flex-start"}
              alignItems="center"
              gap={"14px"}
            >
              <Stack
                width={"30px"}
                height={"30px"}
                backgroundColor={selectedItem()}
                // backgroundColor={primaryColor()}
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={"12px"}
              >
                <Icon
                  color={"#42AA58"}
                  as={props.icon}
                  width={"15px"}
                  height={"15px"}
                />
              </Stack>

              <Text fontSize={"12px"} as={"b"}>
                {props.label}
              </Text>
            </HStack>
            <Box color={"#42AA58"}>
              <AccordionIcon />
            </Box>
          </AccordionButton>

          <AccordionPanel
            p={0}
            display={"flex"}
            flexDir={"column"}
            marginLeft={"20px"}
            marginTop={"10px"}
            gap={"5px"}
          >
            {props.payload.map((item: any, index: number) => {
              return (
                <NavAccordionItem
                  key={index}
                  label={item.label}
                  path={item.path}
                  icon={item.icon}
                  setShowSidebar={props.setShowSidebar}
                />
              );
            })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
export default NavAccordion;
