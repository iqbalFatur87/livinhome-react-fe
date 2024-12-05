import {
  Button,
  Box,
  VStack,
  Image,
  Stack,
  Text,
  HStack,
  List,
  ListItem,
  Icon,
  Divider,
} from "@chakra-ui/react";
import {
  IoMdClose,
  IoIosSearch,
  IoIosCart,
  IoLogoInstagram,
  IoLogoFacebook,
} from "react-icons/io";
const Footer = () => {
  return (
    <Box bgColor={"black"} px={20} py={5}>
      <Stack>
        <Box>
          <Text textAlign="center" fontSize="4xl" color={"white"}>
            Livin Home
          </Text>
        </Box>
        <Box display={"flex"} gap={58}>
          {/* Alamat  */}
          <Stack>
            <Box padding={4}>
              <Text mb={4} textAlign="center" color={"yellow"} fontSize="2xl">
                Alamat
              </Text>
              <Text color={"white"} textAlign="left">
                Ged. D, Bandung Techno Park, Jl. Telekomunikasi
                <br />- Bandung, Jawa Barat 40257
              </Text>
            </Box>
            <Box padding={4}>
              <Text textAlign="center" color={"yellow"} mb={4} fontSize="2xl">
                Hubungi kami
              </Text>
              <Box color={"white"}>
                <Text mb={3}>livinhome@gmail.com</Text>
                <Text>088706355120</Text>
              </Box>
            </Box>
          </Stack>
          {/* Layanan */}

          <Stack>
            <Text mb={4} textAlign="center" color={"yellow"} fontSize="2xl">
              Layanan Kami
            </Text>
            <List color={"white"} spacing={2}>
              <ListItem>Sewa Rumah Kontrakan</ListItem>
              <ListItem>Sewa Kamar Kost</ListItem>
              <ListItem>Sewa Apartemen</ListItem>
              <ListItem>Livin Mates</ListItem>
              <ListItem>Livin Clean</ListItem>
              <ListItem>Livin Box</ListItem>
              <ListItem>Livin Laundry</ListItem>
              <ListItem>Livin Fix</ListItem>
            </List>
          </Stack>
          <Stack>
            <Text mb={4} textAlign="center" color={"yellow"} fontSize="2xl">
              Informasi
            </Text>
            <List color={"white"} spacing={2}>
              <ListItem>Tentang Kami</ListItem>
              <ListItem>Daftar Menjadi Pemilik</ListItem>
              <ListItem>Pusat Bantuan</ListItem>
              <ListItem>Kritik & Saran</ListItem>
            </List>
          </Stack>
          <Stack>
            <Text mb={4} textAlign="center" color={"yellow"} fontSize="2xl">
              Kebijakan
            </Text>
            <List color={"white"} spacing={2}>
              <ListItem>Kebijakan Privacy</ListItem>
              <ListItem>Syarat Dan Ketentuan</ListItem>
            </List>
          </Stack>
        </Box>
        <Divider orientation='horizontal' color='white' />
        <Box width={500}>
  <Text color={'white'} mb={2   }>Dukung Kami:</Text>
  <HStack spacing={4}>
    <Icon color={'white'} fontSize="2xl">
      <IoLogoInstagram />
    </Icon>
    <Icon color={'white'} fontSize="2xl">
      <IoLogoFacebook />
    </Icon>
  </HStack>
</Box>
      </Stack>
    </Box>
  );
};

export default Footer;
