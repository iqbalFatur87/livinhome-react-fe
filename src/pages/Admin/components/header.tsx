import React from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Heading,
  Avatar,
  HStack,
} from '@chakra-ui/react';
// import { Search, Settings, ChevronDown } from 'lucide-react';
import { logout } from "../../../utils/helper/helper";
// import { LOCAL_STORAGE, logout } from "../../utils/helper/helper";
interface NavbarProps {
  onSearch?: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <Box
      as="nav"
      bg="white"
      h="16"
      borderBottom="1px"
      borderColor="gray.200"
      px={10}
    >
      <Flex h="100%"  align="center" justify="space-between">
        {/* Left side - Dashboard Title */}
       
        {/* Middle - Search Bar */}
        <Box maxW="xl" w="full" mx={8}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              {/* <Search size={18} color="gray" /> */}
            </InputLeftElement>
            <Input
              placeholder="Search"
              size="md"
              onChange={handleSearch}
              bg="gray.50"
              borderRadius="lg"
              _focus={{
                borderColor: 'blue.500',
                boxShadow: 'outline',
              }}
            />
          </InputGroup>
        </Box>

        {/* Right side - Settings & Profile */}
        <HStack spacing={4}>
          {/* <IconButton
            aria-label="Settings"
            icon={<Settings size={20} />}
            variant="ghost"
            colorScheme="gray"
            borderRadius="lg"
          /> */}

          <Menu>
            <MenuButton
              px={3}
              py={2}
              transition="all 0.2s"
              borderRadius="lg"
              _hover={{ bg: 'gray.100' }}
            >
              <HStack spacing={2}>
                <Avatar size="sm" name="Admin" bg="gray.200" />
                <Text fontSize="sm" fontWeight="medium">
                  Admin
                </Text>
                {/* <ChevronDown size={16} /> */}
              </HStack>
            </MenuButton>
            <MenuList>
              {/* <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem> */}
              <MenuItem onClick={logout}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;