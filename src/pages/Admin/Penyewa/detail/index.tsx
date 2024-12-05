import {
  Box,
  Flex,
  HStack,
  Input,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle } from "react-feather";

const DetailPemilik = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null); // State to store property details
  const [loading, setLoading] = useState(true); // State to handle loading
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("Token is not available");
      return;
    }

    // Fetch property details from the API
    axios
      .get(`https://livin-api.rrens.me/api/admin/penyewa/detail/${id}`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setProperty(response.data.data); // Set property data
      })
      .catch((error) => {
        console.error("Error fetching property details:", error.message);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  }, [id, token]);

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
          <Flex gap={4} direction="column">
            <Flex>
              <Text fontWeight="bold" mr={8}>
                Nama Property:
              </Text>
              <Input maxW="sm" value={property.property_name || "-"} readOnly />
            </Flex>
            <Flex>
              <Text fontWeight="bold" mr={10}>
                Check In:
              </Text>
              <Input maxW="sm" value={property.checkin || "-"} readOnly />
            </Flex>
            <Flex>
              <Text fontWeight="bold" mr={14}>
                Nama:
              </Text>
              <Input
                maxW="sm"
                value={property.fullname_renter || "-"}
                readOnly
              />
            </Flex>
            <Flex>
              <Text fontWeight="bold">Harga Sewa per Bulan:</Text>
              <Input
                maxW="sm"
                value={`Rp ${
                  property.harga_sewa_1_bulan?.toLocaleString() || "0"
                }`}
                readOnly
              />
            </Flex>
            <Flex>
              <Text fontWeight="bold" gap={4} mr={4}>
                Aturan Property:
              </Text>
              <List spacing={2}>
                {property.rules?.length > 0 ? (
                  property.rules.map((rule) => (
                    <ListItem key={rule.id} className="flex items-center gap-2">
                      <HStack>
                        <ListIcon as={CheckCircle} color="green.500" />
                        <Text>{rule.name}</Text>
                      </HStack>
                    </ListItem>
                  ))
                ) : (
                  <Text>Tidak ada aturan.</Text>
                )}
              </List>
            </Flex>
            <SimpleGrid columns={{ md: 2 }} spacing={4}>
              <Flex gap={2} mr={2}>
                <Text fontWeight="bold">Lebar Tanah:</Text>
                <Input
                  maxW="sm"
                  value={`${property.lebar_tanah || "0"} m`}
                  readOnly
                />
              </Flex>
              <Flex gap={2}>
                <Text fontWeight="bold">Luas Kamar:</Text>
                <Input
                  maxW="sm"
                  value={`${property.luas_kamar || "0"} m²`}
                  readOnly
                />
              </Flex>
            </SimpleGrid>
          </Flex>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default DetailPemilik;
