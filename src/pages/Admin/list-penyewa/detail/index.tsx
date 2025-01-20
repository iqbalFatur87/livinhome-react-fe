import { Box, Flex, Input, SimpleGrid, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_API } from '../../../../utils/constant/api';

const DetailPemilik = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null); // State to store property details
  const [loading, setLoading] = useState(true); // State to handle loading
  const token = localStorage.getItem('token');
  useEffect(() => {
    // Fetch property details from the API
    axios
      .get(`${BASE_API}/admin/penyewa/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setProperty(response.data.data); // Set property data
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error('Error fetching property details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>; // Loading state
  }

  if (!property) {
    return <Text>Property not found.</Text>; // Error state if property is not found
  }

  return (
    <Box p={5}>
      <Link to="/">
        <Text fontSize="2xl" fontWeight="bold">
          Detail Property
        </Text>
      </Link>

      <SimpleGrid mt={6} width={900} gap={6} columns={{ base: 1, md: 2 }}>
        <Box>
          <Flex gap={2} direction="column">
            <Flex gap={2}>
              <Text fontWeight="bold" mr={8}>
                Nama Property:
              </Text>
              <Input maxW="sm" value={property.property_name} readOnly />
            </Flex>
            <Flex gap={2}>
              <Text fontWeight="bold" mr={10}>
                Phone Number:
              </Text>
              <Input maxW="sm" value={property.phone_number} readOnly />
            </Flex>
            <Flex gap={2}>
              <Text fontWeight="bold" mr={14}>
                Pekerjaan:
              </Text>
              <Input maxW="sm" value={property.job} readOnly />
            </Flex>
            <Flex gap={2}>
              <Text fontWeight="bold">Tanggal Lahir:</Text>
              <Input maxW="sm" value={` ${property.date_of_birth}`} readOnly />
            </Flex>
            <Flex gap={2}>
              <Text fontWeight="bold">Check In:</Text>
              <Input maxW="sm" value={` ${property.checkin}`} readOnly />
            </Flex>

            {/* <Flex gap={2}>
              <Text fontWeight="bold">Id Card:</Text>
              <Image
                 src={property.id_card}
                    alt={`Property Image`}
                    className="object-cover w-full h-full"
                  />
            </Flex> */}
            {/* <Flex>
              <Text fontWeight="bold" gap={4} mr={4}>
                Aturan Property:
              </Text>
              <List>
                {property.rules &&
                  property.rules.map((rule) => (
                    <ListItem key={rule.id} className="flex items-center gap-2">
                      <HStack>
                        <ListIcon as={CheckCircle} className="text-green-500" />
                        <Text>{rule.name}</Text>
                      </HStack>
                    </ListItem>
                  ))}
              </List>
            </Flex> */}
            {/* <SimpleGrid columns={{ md: 2 }}>
              <Flex gap={2} mr={2}>
                <Text fontWeight="bold"  textStyle="sm">Lebar Tanah:</Text>
                <Input
                  maxW="sm"
                  value={` ${property.lebar_tanah}`}
                  readOnly
                />
              </Flex>
              <Flex gap={2}>
                <Text fontWeight="bold">Luas Kamar:</Text>
                <Input
                  maxW="sm"
                  value={` ${property.luas_kamar}`}
                  readOnly
                />
              </Flex>
            </SimpleGrid> */}
          </Flex>
        </Box>

        {/* <Box className="space-y-4">
          {property.image && property.image.length > 0 && (
            <SimpleGrid className="gap-4 grid-cols-1">
              {property.image.map((imageUrl, index) => (
                <Box
                  key={index}
                  className="relative aspect-video overflow-hidden rounded-lg"
                >
                  <Image
                    src={imageUrl}
                    alt={`Property Image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box> */}
      </SimpleGrid>
    </Box>
  );
};

export default DetailPemilik;
