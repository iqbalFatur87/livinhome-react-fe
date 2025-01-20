import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  VStack,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Spinner,
} from '@chakra-ui/react';
import {
  FaBath,
  FaBed,
  FaEnvelope,
  FaShoppingCart,
  FaTrash,
} from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_API } from '../../../utils/constant/api';

interface Property {
  id: number;
  property: {
    id: number;
    nama: string;
    deskripsi: string;
    harga_sewa_tahun: number;
    total_kamar: number;
    kamar_mandi: number;
    lebar_tanah: number;
    kategori: string;
    alamat: string;
  }[];
}

const PropertyListing = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async (propertyId: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `${BASE_API}/cart/delete-cart`,
        { id: propertyId }, // Kirim property_id di body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update state setelah berhasil menghapus
      setProperties(properties.filter((item) => item.id !== propertyId));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(
          `${BASE_API}/cart?sort=asc&category=${category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const fetchedProperties = response.data.data || [];
        setProperties(fetchedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  return (
    <Flex minHeight="100vh">
      {/* Left Section */}
      <Box flex={1} p={4}>
        <Flex mb={4}>
          <Button variant="ghost" mr={2} onClick={() => setCategory('')}>
            Semua
          </Button>
          <Button
            variant="ghost"
            mr={2}
            onClick={() => setCategory('Kontrakan')}
          >
            Kontrakan
          </Button>
          <Button variant="ghost" mr={2} onClick={() => setCategory('kost')}>
            Kost
          </Button>
          <Button variant="ghost" onClick={() => setCategory('Apartement')}>
            Apartemen
          </Button>
        </Flex>

        {loading ? (
          <Spinner />
        ) : (
          <SimpleGrid columns={2}>
            {properties.length > 0
              ? properties.map((item) => (
                  <HStack
                    mt="10px"
                    key={item.id}
                    overflow="hidden"
                    position="relative"
                  >
                    {/* Property Image */}
                    <Image
                      src="https://www.adira.co.id/img/frontend/news/thumb_rumahmewahminimalisjpg.jpg" // Replace with actual image URL
                      alt="Property Image"
                      h="200px"
                      w="150px"
                      borderRadius={'md'}
                      maxW={'sm'}
                      objectFit="cover"
                    />

                    {/* Overlay Text for Property Name */}
                    <Text
                      position="absolute"
                      bottom="10px"
                      left="10px"
                      color="white"
                      fontWeight="bold"
                      fontSize="lg"
                      bg="rgba(0, 0, 0, 0.5)"
                      p={2}
                      borderRadius="md"
                    >
                      {item.property[0].nama}
                    </Text>

                    {/* Property Info Section */}
                    <Box
                      position="absolute"
                      left="140"
                      borderRadius={'lg'}
                      p={4}
                      backgroundColor={'white'}
                      shadow={'md'}
                    >
                      {/* Location and Price */}
                      <VStack align="start" spacing={2}>
                        <Text fontSize="lg" fontWeight="bold">
                          {item.property[0].nama}
                        </Text>
                        <Text
                          fontSize="xl"
                          color="gray.600"
                          fontWeight="semibold"
                        >
                          Rp.{' '}
                          {item.property[0].harga_sewa_1_bulan.toLocaleString()}
                          /bulan
                        </Text>

                        {/* Features */}
                        <HStack spacing={3} color="gray.500" fontSize="sm">
                          <HStack>
                            <Icon as={FaBath} />
                            <Text>
                              {' '}
                              {item.property[0].kamar_mandi
                                ? item.property[0].kamar_mandi
                                : 0}
                            </Text>
                          </HStack>
                          <HStack>
                            <Icon as={FaBed} />
                            <Text>
                              {' '}
                              {item.property[0].total_kamar
                                ? item.property[0].total_kamar
                                : 0}
                            </Text>
                          </HStack>
                          <Text>
                            {' '}
                            {item.property[0].lebar_tanah
                              ? item.property[0].lebar_tanah
                              : 0}
                          </Text>
                        </HStack>
                      </VStack>

                      {/* Action Buttons */}
                      <Flex mt={4} justify="space-between">
                        {/* <Button leftIcon={<FaEnvelope />} colorScheme="teal">
                          Kirim Pesan
                        </Button> */}
                        <Link to={`/detail-properti/${item.property_id}`}>
                          <IconButton
                            colorScheme="orange"
                            aria-label="Add to Cart"
                            fontSize="20px"
                            icon={<FaShoppingCart />}
                          />
                        </Link>
                        <IconButton
                          float={'inline-start'}
                          colorScheme="red"
                          aria-label="Delete"
                          fontSize="20px"
                          icon={<FaTrash />}
                          onClick={() => handleDelete(item.id)} // Panggil handleDelete
                        />
                      </Flex>
                    </Box>
                  </HStack>
                ))
              : 'No Property Available'}
          </SimpleGrid>
        )}
      </Box>

      {/* Right Section */}
      <Box
        flex={1}
        maxW="200px"
        justifyContent={'center'}
        bg="orange.400"
        borderBottomRadius="full"
        borderTopRadius="full"
        position="relative"
      >
        <Box>
          <Image
            src={'/human.png'}
            alt="Person"
            position="absolute"
            bottom={0}
            right={0}
            height="80%"
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default PropertyListing;
