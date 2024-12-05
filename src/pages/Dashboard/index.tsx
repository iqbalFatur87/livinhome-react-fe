import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
// import { SearchIcon } from '@chakra-ui/icons';

const Feature = ({ title, description }) => (
  <VStack align="start" spacing={2}>
    <Heading as="h3" size="md" color="orange.500">
      {title}
    </Heading>
    <Text>{description}</Text>
  </VStack>
);

const LivinhomeLandingPage = () => {
  const bgGradient = useColorModeValue(
    "linear(to-r, orange.400, red.500, purple.600)",
    "linear(to-r, orange.600, red.700, purple.800)"
  );

  return (
    <Box minHeight="100vh">
      <Box>
        <Box  bgImage={'/CoverHomepage.png'} color="white" height={"400px"}>
          <Container maxW="container.xl">
            <Flex direction={{ base: "column", md: "row" }} py={12} gap={8}>
              <VStack align="flex-start" spacing={6} flex={1}>
                <Heading as="h2" size="2xl">
                  Selamat Datang di Livinhome
                </Heading>
                <Text fontSize="lg">
                  Temukan solusi properti terlengkap untuk kebutuhan tempat
                  tinggal Anda bersama Livinhome.
                </Text>
                <Text fontSize="lg">
                  Pilihan terlengkap dari ratusan semua opsi dari kami tanpa
                  ribet.
                </Text>
                <InputGroup size="lg">
                  <Input
                    placeholder="Cari lingkungan anda"
                    bg="white"
                    color="gray.800"
                    _placeholder={{ color: "gray.500" }}
                  />
                  <InputRightElement>
                    {/* <SearchIcon color="gray.500" /> */}
                  </InputRightElement>
                </InputGroup>
              </VStack>
              <Flex flex={1} justify="center" align="center">
                <Image
                  src="https://i0.wp.com/media.dekoruma.com/article/2024/08/18230237/6-11.png?resize=800%2C600&ssl=1"
                  alt="House"
                  borderTopRadius="full"
                  height={"500px"}
                  width={"350px"}
                  boxShadow="lg"
                />
              </Flex>
            </Flex>
          </Container>
        </Box>
        <Box py={12}>
          <>
            <HStack ml={"40px"} spacing={8}>
              {[
                { count: "500+", label: "Properti" },
                { count: "100+", label: "Kontraktor" },
                { count: "50+", label: "Agen" },
                { count: "20+", label: "Lokasi" },
              ].map((item, index) => (
                <VStack
                  boxShadow="lg"
                  borderRadius={"md"}
                  width={"100px"}
                  padding={"20px"}
                  bg="white"
                  key={index}
                >
                  <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                    {item.count}
                  </Text>
                  <Text color="gray.600">{item.label}</Text>
                </VStack>
              ))}
            </HStack>
          </>
        </Box>
      </Box>

      <Box py={12}>
        <Box bg="white" boxShadow="lg" padding={"10px"} mx="200px">
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={8}
            justify="space-between"
            align="center"
          >
            <VStack
              align="flex-start"
              justify="space-between"
              spacing={4}
              flex={3}
              padding={"20px"}
              borderRadius={"20px"}
            >
              <Heading size="xl">
                Temukan Teman Satu Kontrakan yang Tepat dengan Livinhome!
              </Heading>
              <Text>
                Livinmates membantu Anda menemukan teman sekontrakan yang sesuai
                dengan minat dan gaya hidup Anda.
              </Text>
              <Button colorScheme="orange" size="lg" borderRadius="full">
                Daftar Livinhome
              </Button>
            </VStack>
            <Box flex={1}>
              <Image
                width={"200px"}
                src="/Group-37.png"
                alt="People"
                borderRadius="lg"
              />
            </Box>
          </Stack>
        </Box>
      </Box>
      <Box>
        {/* Header Section */}
        <Box textAlign="center" mt={10} mb={6}>
          <Text fontSize="2xl" fontWeight="bold">
            Apa yang kamu cari?
          </Text>
        </Box>

        {/* Cards Section */}
        <Grid templateColumns="repeat(3, 1fr)" margin={"auto"} gap={6} p={8}>
          {/* Card 1: Rumah Kontrakan */}
          <Box
            backgroundImage="url('https://decorindoperkasa.com/wp-content/uploads/2024/08/rumah-minimalis-sederhana.jpg')"
            borderTopRadius={"full"}
            borderBottomRadius={"lg"}
            textAlign="center"
            position="relative"
            width={"250px"}
            height={"300px"}
            p={6}
            pt={20}
          >
            {/* <Image
              src="" // Replace with your image path
              alt="Rumah Kontrakan"
              borderRadius="2xl"
              objectFit="cover"
              h="100%"
              zIndex={-1}
              w="100%"
            /> */}
            <Box mt={4}>
              <Text color={"white"} fontSize="xl" fontWeight="bold">
                Rumah Kontrakan
              </Text>
              <Text color={"white"} mt={2}>
                Livinhome adalah pilihan cerdas bagi mahasiswa yang mencari
                rumah kontrakan terjangkau tanpa mengorbankan kualitas. Cari
                kontrakan Anda sekarang!
              </Text>
            </Box>
            <Button
              bg={"black"}
              colorScheme="blackAlpha"
              mt={4}
              w="100px"
              borderRadius="full"
            >
              Telusuri
            </Button>
          </Box>

          {/* Card 2: Kamar Kost */}
          <Box
            backgroundImage="url('https://decorindoperkasa.com/wp-content/uploads/2024/08/rumah-minimalis-sederhana.jpg')"
            borderTopRadius={"full"}
            borderBottomRadius={"lg"}
            textAlign="center"
            position="relative"
            width={"250px"}
            height={"300px"}
            p={6}
            pt={20}
          >
            {/* <Image
              src="" // Replace with your image path
              alt="Rumah Kontrakan"
              borderRadius="2xl"
              objectFit="cover"
              h="100%"
              zIndex={-1}
              w="100%"
            /> */}
            <Box mt={4}>
              <Text color={"white"} fontSize="xl" fontWeight="bold">
                Rumah Kontrakan
              </Text>
              <Text color={"white"} mt={2}>
                Livinhome adalah pilihan cerdas bagi mahasiswa yang mencari
                rumah kontrakan terjangkau tanpa mengorbankan kualitas. Cari
                kontrakan Anda sekarang!
              </Text>
            </Box>
            <Button
              bg={"black"}
              colorScheme="blackAlpha"
              mt={4}
              w="100px"
              borderRadius="full"
            >
              Telusuri
            </Button>
          </Box>

          {/* Card 3: Apartemen */}
          <Box
            backgroundImage="url('https://decorindoperkasa.com/wp-content/uploads/2024/08/rumah-minimalis-sederhana.jpg')"
            borderTopRadius={"full"}
            borderBottomRadius={"lg"}
            textAlign="center"
            position="relative"
            width={"250px"}
            height={"300px"}
            p={6}
            pt={20}
          >
            {/* <Image
              src="" // Replace with your image path
              alt="Rumah Kontrakan"
              borderRadius="2xl"
              objectFit="cover"
              h="100%"
              zIndex={-1}
              w="100%"
            /> */}
            <Box mt={4}>
              <Text color={"white"} fontSize="xl" fontWeight="bold">
                Rumah Kontrakan
              </Text>
              <Text color={"white"} mt={2}>
                Livinhome adalah pilihan cerdas bagi mahasiswa yang mencari
                rumah kontrakan terjangkau tanpa mengorbankan kualitas. Cari
                kontrakan Anda sekarang!
              </Text>
            </Box>
            <Button
              bg={"black"}
              colorScheme="blackAlpha"
              mt={4}
              w="100px"
              borderRadius="full"
            >
              Telusuri
            </Button>
          </Box>
        </Grid>
      </Box>
      <Container maxW="container.xl">
        <Heading as="h2" size="2xl" textAlign="center" my={12}>
          Kenapa Livinhome?
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          <Box flex={1}>
            <HStack spacing={10} h="full">
              <Image
                src="https://decorindoperkasa.com/wp-content/uploads/2024/08/rumah-minimalis-sederhana.jpg"
                alt="Building 1"
                objectFit="cover"
                width={"60px"}
                height={"200px"}
                borderRadius="full"
              />
              <Image
                src="https://decorindoperkasa.com/wp-content/uploads/2024/08/rumah-minimalis-sederhana.jpg"
                alt="Building 2"
                objectFit="cover"
                width={"60px"}
                height={"300px"}
                borderRadius="full"
              />
              <Image
                src="https://decorindoperkasa.com/wp-content/uploads/2024/08/rumah-minimalis-sederhana.jpg"
                alt="Building 1"
                objectFit="cover"
                width={"60px"}
                height={"400px"}
                borderRadius="full"
              />
              <Image
                src="https://decorindoperkasa.com/wp-content/uploads/2024/08/rumah-minimalis-sederhana.jpg"
                alt="Building 2"
                objectFit="cover"
                width={"60px"}
                height={"400px"}
                borderRadius="full"
              />
              <Image
                src="https://decorindoperkasa.com/wp-content/uploads/2024/08/rumah-minimalis-sederhana.jpg"
                alt="Building 3"
                objectFit="cover"
                width={"60px"}
                height={"300px"}
                borderRadius="full"
              />
              <Image
                src="https://decorindoperkasa.com/wp-content/uploads/2024/08/rumah-minimalis-sederhana.jpg"
                alt="Building 4"
                objectFit="cover"
                width={"60px"}
                height={"200px"}
                borderRadius="full"
              />
            </HStack>
          </Box>

          <VStack flex={1} spacing={8} align="stretch">
            <Feature
              title="Fokus pada Mahasiswa"
              description="Livinhome memiliki fokus khusus pada tempat tinggal mahasiswa. Platform kami dapat menyediakan informasi yang lebih relevan dan sesuai dengan kebutuhan mahasiswa, seperti akses ke kampus, fasilitas umum, dan keamanan lingkungan."
            />
            <Feature
              title="Properti Semi Furnished"
              description="Di Livinhome, kami menyediakan properti sewaan semi furnished sebagai keunggulan unik kami."
            />
            <Feature
              title="Keamanan dan Privasi"
              description="Keamanan data dan privasi pengguna adalah prioritas utama. Livinhome memastikan bahwa informasi pribadi pengguna aman dan tidak disalahgunakan."
            />
            <Feature
              title="Pembaruan Real-time"
              description="Platform kami dapat memberikan pembaruan real-time tentang ketersediaan properti. Ini berarti pengguna akan selalu mendapatkan informasi terbaru tentang properti yang mereka minati."
            />
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default LivinhomeLandingPage;
