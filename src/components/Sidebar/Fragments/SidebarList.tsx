import { Stack } from "@chakra-ui/react";
import { NavItem } from "./NavItem";
import { BsFillHouseFill } from "react-icons/bs";
import { MdInsertPhoto, MdPeopleAlt } from "react-icons/md";
import NavAccordion from "./NavAccordion";
import { AiTwotoneNotification } from "react-icons/ai";
import { BiSolidKey } from "react-icons/bi";
import { FaUnlockAlt } from "react-icons/fa";

const SidebarList = (props: { menus: any; setShowSidebar: any }) => {
  return (
    <Stack width={"100%"} gap={"12px"}>
      <NavItem
        label={"Dashboard"}
        link={"/Dashboard"}
        icon={BsFillHouseFill}
        setShowSidebar={props.setShowSidebar}
      />

      <NavItem
        label={"Kelola Data Warga"}
        link={"/kelola-data-warga"}
        icon={MdPeopleAlt}
        setShowSidebar={props.setShowSidebar}
      />
      <NavAccordion
        label={"Kelola Akun"}
        payload={props.menus.navcordionMenu1}
        icon={MdPeopleAlt}
        setShowSidebar={props.setShowSidebar}
      />
      <NavItem
        label={"Kelola Notifikasi"}
        link={"/kelola-notifikasi"}
        icon={AiTwotoneNotification}
        setShowSidebar={props.setShowSidebar}
      />
      <NavAccordion
        label={"Media"}
        payload={props.menus.navcordionMenu2}
        icon={MdInsertPhoto}
        setShowSidebar={props.setShowSidebar}
      />
      <NavItem
        label={"Manajemen Role"}
        link={"/manajemen-role"}
        icon={BiSolidKey}
        setShowSidebar={props.setShowSidebar}
      />
      <NavItem
        label={"Manajemen Otorisasi"}
        link={"/manajemen-otorisasi"}
        icon={FaUnlockAlt}
        setShowSidebar={props.setShowSidebar}
      />
      <NavItem
        label={"Local Storage"}
        link={"/local-storage"}
        icon={"GrStorage"}
        setShowSidebar={props.setShowSidebar}
      />
    </Stack>
  );
};

export default SidebarList;
