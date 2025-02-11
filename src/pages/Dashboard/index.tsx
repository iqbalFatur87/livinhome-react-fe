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
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Footer from "../Tenant/components/Footer";
// import { SearchIcon } from '@chakra-ui/icons';

interface FeatureProps {
  title: string;
  description: string;
}

const Feature = ({ title, description }: FeatureProps) => (
  <VStack align="start" spacing={2}>
    <Heading as="h3" size="md" color="orange.500">
      {title}
    </Heading>
    <Text>{description}</Text>
  </VStack>
);

const LivinhomeLandingPage = () => {

  return (
    <>
    <Box minHeight="100vh">
      <Box>
        <Box  bgImage={'/CoverHomepage.png'} color="white" 
        height={{ base: "500px", md: "400px" }}
        backgroundSize="cover"
        backgroundPosition="center">
          <Container maxW="container.xl" px={{base: 4, md: 8}}>
            <Flex direction={{ base: "column", md: "row" }} py={{ base: 6, md: 12 }} gap={{ base: 4, md: 8 }}>
              <VStack align="flex-start" spacing={{ base: 4, md: 6 }} flex={1}>
                <Heading as="h2" size={{ base: "xl", md: "2xl" }}>
                  Selamat Datang di Livinhome
                </Heading>
                <Text fontSize={{ base: "md", md: "lg" }}>
                  Temukan solusi properti terlengkap untuk kebutuhan tempat
                  tinggal Anda bersama Livinhome.
                </Text>
                <Text fontSize={{ base: "md", md: "lg" }}>
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
              <Flex flex={1} justify="right" align="center">
              <Box
                borderTopRadius="full"
                borderBottomRadius="90%"
                position="relative"
                _before={{
                  content: '""',
                  position: "absolute",
                  top: "-9px",
                  right: "-9px",
                  bottom: "-9px",
                  left: "-9px",
                  background: "linear-gradient(180deg, #FFD700, rgba(255, 215, 0, 0))",
                  borderRadius: "inherit",
                  zIndex: 0,
                }}
              >
                <Image
                  src="https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="House"
                  borderTopRadius="full"
                  borderBottomRadius="90%"
                  height="530px"
                  width="380px"
                  boxShadow="xl"
                  position="relative"
                  zIndex={1}
                  bg="white"
                />
              </Box>
              </Flex>
            </Flex>
          </Container>
        </Box>
        <Box py={12}>
          <>
            <HStack ml={{ base: "20px", md: "40px" }}
            spacing={{ base: 4, md: 8 }}
            flexWrap="wrap"
            justify={{ base: "center", md: "flex-start" }}>
              {[
                { count: "500+", label: "Properti" },
                { count: "100+", label: "Kontraktor" },
                { count: "50+", label: "Agen" },
                { count: "20+", label: "Lokasi" },
              ].map((item, index) => (
                <VStack
                  boxShadow="lg"
                  borderRadius={"md"}
                  width={{ base: "90px", md: "100px" }}
                  padding={{ base: "15px", md: "20px" }}
                  bg="white"
                  key={index}
                >
                  <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="orange.500">
                    {item.count}
                  </Text>
                  <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">{item.label}</Text>
                </VStack>
              ))}
            </HStack>
          </>
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
        <Grid 
          templateColumns="repeat(2, 1fr)" 
          justifyContent="center" 
          alignItems="center"
          maxW="container.lg"
          margin="auto" 
          gap={8} 
          p={8}
        >
        {/* Card 1: Rumah Kontrakan */}
        <GridItem display="flex" justifyContent="center">
          <Box
          backgroundImage="url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3')"
          backgroundSize="cover"
          backgroundPosition="center"
          borderTopRadius="full"
          borderBottomRadius="300%"
          textAlign="center"
          position="relative"
          width={"320px"}
          height={"400px"}
          p={6}
          pt={16}
          boxShadow="lg"
        >
          <Box
              borderTopRadius="full"
              borderBottomRadius="300%"
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bgGradient="linear(to-b, transparent 30%, rgba(0,0,0,0.8) 70%)"
              zIndex={1}
            />
          <Box 
            position="absolute" 
            bottom="80px" 
            left="0" 
            width="100%" 
            px={6}
            zIndex={2}
          >
            <Text color={"white"} fontSize="2xl" fontWeight="bold" mb={4}>
              Rumah Kontrakan
            </Text>
            <Text color={"white"} mt={2} fontSize="xs" px={4}>
              Livinhome adalah pilihan cerdas bagi mahasiswa yang mencari
              rumah kontrakan terjangkau tanpa mengorbankan kualitas. Cari
              kontrakan Anda sekarang!
            </Text>
          </Box>
          <Box position="absolute" bottom="20px" left="0" width="100%" display="flex" justifyContent="center">
              <Button
                bg={"white"}
                color="black"
                w="120px"
                borderRadius="full"
                zIndex={2}
                _hover={{ bg: 'gray.100' }}
              >
                Telusuri
              </Button>
            </Box>
          </Box>
        </GridItem>
        {/* Card 2: Kamar Kost */}
        <GridItem display="flex" justifyContent="center">
          <Box
            backgroundImage="url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3')"
            backgroundSize="cover"
            backgroundPosition="center"
            borderTopRadius="full"
            borderBottomRadius="300%"
            textAlign="center"
            position="relative"
            width={"320px"}
            height={"400px"}
            p={6}
            pt={16}
            boxShadow="lg"
          >
            <Box
              borderTopRadius="full"
              borderBottomRadius="300%"
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bgGradient="linear(to-b, transparent 30%, rgba(0,0,0,0.8) 70%)"
              zIndex={1}
            />
            <Box
              position="absolute" 
              bottom="80px" 
              left="0" 
              width="100%" 
              px={6}
              zIndex={2}
            >
              <Text color={"white"} fontSize="2xl" fontWeight="bold" mb={4}>
                Kamar Kost
              </Text>
              <Text color={"white"} mt={2} fontSize="xs" px={4}>
                Temukan Kamar Kost impian Kamu dengan harga yang sesuai
                di LivinHome. Kami menyediakan lokasi yang ideal untuk
                kehidupan kuliah kamu
              </Text>
            </Box>
            <Box position="absolute" bottom="20px" left="0" width="100%" display="flex" justifyContent="center">
              <Button
                bg={"white"}
                color="black"
                w="120px"
                borderRadius="full"
                zIndex={2}
                _hover={{ bg: 'gray.100' }}
              >
                Telusuri
              </Button>
            </Box>
          </Box>
        </GridItem>
        </Grid>
      </Box>
      <Container maxW="container.xl" py={4}>
        <Heading as="h2" size="2xl" textAlign="center" my={12}>
          Kenapa Livinhome?
        </Heading>
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          <Box flex={1}>
            <HStack spacing={4} h="full">
              <Image
                src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Building 1"
                objectFit="cover"
                width={"80px"}
                height={"300px"}
                borderRadius="full"
                shadow={"2xl"}
              />
              <Image
                src="https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?q=80&w=2028&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Building 2"
                objectFit="cover"
                width={"80px"}
                height={"400px"}
                borderRadius="full"
                shadow={"2xl"}
              />
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Building 1"
                objectFit="cover"
                width={"80px"}
                height={"500px"}
                borderRadius="full"
                shadow={"2xl"}
              />
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhvdXNlc3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Building 2"
                objectFit="cover"
                width={"80px"}
                height={"500px"}
                borderRadius="full"
                shadow={"2xl"}
              />
              <Image
                src="https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Building 3"
                objectFit="cover"
                width={"80px"}
                height={"400px"}
                borderRadius="full"
                shadow={"2xl"}
              />
              <Image
                src="https://images.unsplash.com/photo-1524082983062-21c24967d6c9?q=80&w=1997&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Building 4"
                objectFit="cover"
                width={"80px"}
                height={"300px"}
                borderRadius="full"
                shadow={"2xl"}
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
    <Footer/>
    </>
  );
};

export default LivinhomeLandingPage;
