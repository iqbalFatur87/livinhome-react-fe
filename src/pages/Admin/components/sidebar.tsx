import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Icon,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdHome, MdPerson, MdAdminPanelSettings, MdKeyboardArrowDown } from "react-icons/md";
import { logout } from "../../../utils/helper/helper";
interface SidebarProps {
  onNavigate?: (route: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {

  const handleNavigation = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    }
  };

  return (
    <Box
      bg="white"
      w="64"
      h="100vh"
      borderRight="1px"
      borderColor="gray.200"
      position="fixed"
      left="0"
      top="0"
    >
      {/* Logo */}
      <Flex h="16" alignItems="center" px="6" borderBottomWidth="1px">
        <HStack spacing="2">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="gray.800"
          >
            LIVINHOME
          </Text>
        </HStack>
      </Flex>

      {/* Navigation Items */}
      <VStack align="start" mt="4" spacing="4" px="6">
        <Link to="/admin/dashboard">
          <Button variant="ghost" leftIcon={<MdHome />}>
            Dashboard
          </Button>
        </Link>

        <Menu>
          <MenuButton as={Button} variant="ghost" leftIcon={<MdPerson />} rightIcon={<MdKeyboardArrowDown />}>
             Pemilik
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/admin/pemilik-kost">Kost</MenuItem>
            <MenuItem as={Link} to="/admin/pemilik-kontrakan">Kontrakan</MenuItem>
            <MenuItem as={Link} to="/admin/pemilik-apartement">Apartemen</MenuItem>
          </MenuList>
        </Menu>


        <Menu>
          <MenuButton as={Button} variant="ghost" leftIcon={<MdPerson />} rightIcon={<MdKeyboardArrowDown />}>
             Penyewa
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/admin/penyewa-kost">Kost</MenuItem>
            <MenuItem as={Link} to="/admin/penyewa-kontrakan">Kontrakan</MenuItem>
            <MenuItem as={Link} to="/admin/penyewa-apartement">Apartemen</MenuItem>
          </MenuList>
        </Menu>

        <Link to="/admin/list-pemesanan">
          <Button variant="ghost" leftIcon={<MdAdminPanelSettings />}>
            List Persewaan
          </Button>
        </Link>

        <Button variant="ghost" leftIcon={<MdAdminPanelSettings />} onClick={logout}>
          Keluar
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
