import {
  Flex,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  Image,
  SimpleGrid,
  Grid,
  GridItem,
  Avatar,
  Button,
  Divider,
  Heading,
  Icon,
  VStack,
  Stack,
  Text,
  HStack,
  Center,
  Spacer,
  IconButton,
  Input,
  useMediaQuery,
  ModalContent,
  Modal,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// And react-slick as our Carousel Lib

import { DivideSquare } from 'react-feather';
import { MdShoppingCartCheckout, MdSearch } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';
import { BASE_API } from '../../../../utils/constant/api';
interface Property {
  id: number;
  nama: string;
  alamat: string;
  lebar_tanah: number;
  total_kamar: number;
  kapasitas_mobil: number;
  kapasitas_motor: number;
  daya_listrik: number;
  sumber_air: string;
  deskripsi: string;
  rules: string[];
  kecamatan: string;
  kota: string;
  provinsi: string;
  image: string[];
  harga_sewa_tahun: number;
  transaction_success: number;
  user: {
    fullname: string;
    photo_profile: string;
    created_at: string;
  }[];
}

const detailProperti = () => {
  const [profiledata, setProfile] = useState(null);
  const [rentalDuration, setRentalDuration] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<string>('');
  const { id } = useParams<{ id: string }>(); // Get the id from URL parameters
  const [propertyData, setPropertyData] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isMobile] = useMediaQuery('(max-width:768px)');
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [property_id, setPropertyid] = useState<number>();

  const fecthDataProfile = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`${BASE_API}/profile/renter`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data.data);
      console.log(response, 'kor');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthDataProfile();
  }, []);
  const HandleChat = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Missing token for chat');
      return; // Abort if no token is available
    }

    try {
      const response = await axios.post(
        `${BASE_API}/chat/chat-owner`,
        {
          property_id: propertyData?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      localStorage.removeItem('chat_id');
      if (response.data && response.data.data && response.data.data.chat_id) {
        const chatId = response.data.data.chat_id;
        localStorage.setItem('chat_id', chatId.toString());
        console.log('Chat ID saved to localStorage:', chatId);
      } else {
        console.error('Chat ID is not available in the response');
      }

      // Misalnya, navigasi ke halaman chat
      window.location.href = `/chat/${propertyData?.id}`;
    } catch (error) {
      console.error('Error creating chat:', error);
      // Tampilkan pesan error kepada pengguna
      alert('Gagal membuat chat. Silakan coba lagi.');
    }
  };

  const handleSave = () => {
    if (!checkInDate || !rentalDuration) {
      alert('Harap pilih tanggal dan durasi sewa.');
      return;
    }

    // if (profiledata?.transaction_history?.length !=  0 ) {
    //   alert("Anda sudah memiliki riwayat transaksi. Tidak dapat menyimpan data.");

    // } else {
    //   HandleSave();
    //   return
    // }

    const dataCheckin = Math.trunc(new Date(checkInDate).getTime() / 1000.0);
    // Save to localStorage
    localStorage.setItem('checkInDate', dataCheckin);
    localStorage.setItem('rentalDuration', rentalDuration);

    // Navigate to the transaction page

    setTimeout(() => {
      window.location.href = `/transaction/${propertyData?.id}`; // Mengarahkan user ke halaman dashboard admin
    }, 700);
  };

  // Fetch property data
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      if (!token) {
        setError('No authentication token found');
        setIsLoading(false);
        return;
      }
      try {
        // Use the id parameter in the fetch URL
        const response = await fetch(
          `${BASE_API}/property/detail-property/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const result = await response.json();
        if (response.ok && result.meta.status === 'success') {
          setPropertyData(result.data);
        } else {
          throw new Error('Failed to fetch property data');
        }
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]); // Add id as a dependency to refetch when it changes

  // Post data
  const HandleSave = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Missing token for adding to cart');
      return; // Abort if no token is available
    }

    try {
      const response = await axios.post(
        `${BASE_API}/cart/add-cart`,
        { property_id: propertyData.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // alert("Berhasil");
      // Handle successful addition to cart (e.g., display a success message)
      console.log('Successfully added property to cart:', response.data);
    } catch (error) {
      console.error('Error adding property to cart:', error);
      // Handle error gracefully (e.g., display an error message to the user)
    }
  };
  // Update displayed images based on screen size
  useEffect(() => {
    if (propertyData) {
      setDisplayedImages(
        isMobile
          ? propertyData.image.slice(0, 2)
          : propertyData.image.slice(0, 4)
      );
    }
  }, [propertyData, isMobile]);

  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? propertyData!.image.length - 1 : prev - 1
    );
  const nextSlide = () =>
    setCurrentSlide((prev) =>
      prev === propertyData!.image.length - 1 ? 0 : prev + 1
    );

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  if (!propertyData) return <Text>No property data available</Text>;

  return (
    <Stack>
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Box p={4}>
          {/* Gambar Utama */}
          <Box
            border="2px solid blue"
            borderRadius="md"
            overflow="hidden"
            mb={4}
            maxH="400px"
            maxW="800px"
            mx="auto"
          >
            <Image
              src={propertyData.image[0]}
              alt="Main House Image"
              objectFit="cover"
              width="100%"
              height="auto"
            />
          </Box>

          {/* Grid Thumbnail Gambar */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            {displayedImages.map((image, index) => (
              <Box
                key={index}
                position="relative"
                borderRadius="md"
                overflow="hidden"
                maxW="200px"
              >
                <Image
                  src={image}
                  alt={`Properti Image ${index + 1}`}
                  objectFit="cover"
                  width="100%"
                  height="100px"
                />

                {/* Kondisi untuk overlay pada gambar terakhir */}
                {index === displayedImages.length - 1 && (
                  <Box
                    onClick={onOpen}
                    position="absolute"
                    top="0"
                    left="0"
                    width="full"
                    height="full"
                    background="rgba(0, 0, 0, 0.5)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="white"
                  >
                    {/* <Icon as={FaRegImage} boxSize={6} mr={2} /> */}
                    <Text onClick={onOpen} fontSize="lg" fontWeight="bold">
                      {propertyData.image.length} +
                    </Text>
                  </Box>
                )}
              </Box>
            ))}
          </SimpleGrid>
          <Flex minWidth="max-content" alignItems="center" gap="2" my={4}>
            <Text fontSize={24} fontWeight="bold">
              {propertyData.nama}
            </Text>
            <Spacer />
          </Flex>

          <Flex my={4}>
            <Text fontSize={'md'} color={'gray.300'}>
              {propertyData.alamat}
            </Text>
            <Spacer></Spacer>
            <HStack>
              <Button>Bagikan</Button>
              <IconButton
                onClick={HandleSave}
                isRound={true}
                colorScheme="blue"
                aria-label="cart"
                icon={<MdShoppingCartCheckout />}
              />
            </HStack>
          </Flex>
          <Divider />

          <Box p={4}>
            <SimpleGrid columns={{ base: 2, md: 3 }} gap={6}>
              <GridItem>
                <Icon boxSize={6} />
                <Text>Transaksi Berhasil</Text>
                <Text fontWeight="bold">
                  {propertyData.transaction_success} kali
                </Text>
              </GridItem>

              <GridItem>
                <Icon boxSize={6} />
                <Text>Luas Tanah</Text>
                <Text fontWeight="bold">{propertyData.lebar_tanah} m2</Text>
              </GridItem>

              <GridItem>
                <Icon boxSize={6} />
                <Text>Luas Rumah</Text>
                <Text fontWeight="bold">{propertyData.luas_kamar} m2</Text>
              </GridItem>

              <GridItem>
                <Icon boxSize={6} />
                <Text>Kapasitas Garasi</Text>
                <Text fontWeight="bold">
                  {propertyData.kapasitas_mobil} mobil /{' '}
                  {propertyData.kapasitas_motor} montor
                </Text>
              </GridItem>

              <GridItem>
                <Icon boxSize={6} />
                <Text>Daya Listrik</Text>
                <Text fontWeight="bold">{propertyData.daya_listrik} Waat</Text>
              </GridItem>

              <GridItem>
                <Icon boxSize={6} />
                <Text>Sumber Air</Text>
                <Text fontWeight="bold">{propertyData.sumber_air}</Text>
              </GridItem>
            </SimpleGrid>
          </Box>
          <Divider />
          <Tabs
            my={4}
            padding={4}
            backgroundColor="white"
            borderWidth="1px"
            borderRadius="md"
          >
            <TabList>
              <Tab>Deskripsi</Tab>
              <Tab>Aturan</Tab>
              <Tab>Lokasi</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>{propertyData.deskripsi}</p>
              </TabPanel>
              <TabPanel>
                <ul>
                  {propertyData.rules.length > 0 ? (
                    propertyData.rules.map((rule) => (
                      <li key={rule.id}>{rule.name}</li>
                    ))
                  ) : (
                    <li>Tidak ada peraturan yang ditentukan</li>
                  )}
                </ul>
              </TabPanel>
              <TabPanel>
                <p>{`${propertyData.kecamatan}, ${propertyData.kota}, ${propertyData.provinsi}`}</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box
          backgroundColor={'white'}
          height={'450px'}
          p={4}
          borderWidth="1px"
          borderRadius="md"
        >
          <Flex align="center">
            <Avatar size="md" src="/avatar.png" />
            <Box ml={4}>
              <Heading as="h3" size="md">
                {propertyData.nama}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                Pemilik Properti
              </Text>
            </Box>
          </Flex>
          <Text color="gray.500" fontSize={'sm'} mt={2}>
            Aktif Sejak Mei 2024
          </Text>
          <SimpleGrid
            my={3}
            justifyContent={'Center'}
            columns={{ base: 2, md: 2 }}
          >
            <Box>
              <VStack>
                <HStack>
                  <Text>Pemilik 2 Properti</Text>
                </HStack>

                <HStack>
                  <Text>
                    {' '}
                    {propertyData.transaction_success} Transaksi Berhasil
                  </Text>
                </HStack>
              </VStack>
            </Box>

            <Box>
              <VStack>
                <HStack>
                  <Text>Respon Chat</Text>
                </HStack>
                <HStack>
                  <Text>Survei Konfirmasi</Text>
                </HStack>
              </VStack>
            </Box>
          </SimpleGrid>
          <Text as="span">
            <Text as="span" color="orange.500" fontWeight="bold">
              {propertyData.harga_sewa_1_bulan}
            </Text>{' '}
            <Text as="span" color="gray.500">
              /Bulan
            </Text>
          </Text>
          <Stack
            spacing={6}
            my={4}
            direction="row"
            align="center"
            justify={'center'}
          >
            <Button
              onClick={HandleChat}
              colorScheme="teal"
              variant={'outline'}
              size="md"
            >
              Chat Pemilik
            </Button>
            <Link to={`/survey/${propertyData.id}`}>
              <Button variant={'outline'} colorScheme="teal" size="md">
                Jadwalkan Survey
              </Button>
            </Link>
          </Stack>
          <Divider orientation="horizontal" />
          <Stack
            spacing={6}
            my={4}
            direction="row"
            align="center"
            justify={'center'}
          >
            <Input
              width={'50%'}
              type="date"
              placeholder=" Mulai CheckIn"
              colorScheme="teal"
              variant={'outline'}
              // disabled={ profiledata.transaction_history != null }
              size="md"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)} // Update state
            />
            <Select
              borderColor={'black'}
              width={'50%'}
              placeholder="Durasi Sewa"
              value={rentalDuration}
              // disabled={ profiledata.transaction_history != null  }
              onChange={(e) => setRentalDuration(e.target.value)} // Update state
            >
              <option value="1">1 Bulan</option>
              <option value="3">3 Bulan</option>
              <option value="12">12 Bulan</option>
            </Select>
          </Stack>
          <VStack>
            {profiledata?.transaction_history != null ? (
              <Text color="red">Anda sudah punya properti</Text>
            ) : (
              <Button
                width={'full'}
                colorScheme="green"
                variant={'solid'}
                size="md"
                onClick={handleSave}
              >
                Pesan Sekarang
              </Button>
            )}
          </VStack>
        </Box>
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
        <ModalContent>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <Image
              src={propertyData.image[currentSlide]}
              alt="Property Image"
              width="400px"
              height={'250px'}
            />
            <HStack mt={2}>
              <IconButton
                icon={<FaArrowLeft />}
                onClick={prevSlide}
                aria-label={''}
              />
              <Text>
                {currentSlide + 1} of {propertyData.image.length}
              </Text>
              <IconButton
                icon={<FaArrowRight />}
                onClick={nextSlide}
                aria-label={''}
              />
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default detailProperti;
