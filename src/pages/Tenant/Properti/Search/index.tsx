import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  SimpleGrid,
  Text,
  Image,
  HStack,
  useToast,
  Select,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  IconButton,
  Spacer,
  Tag,
  TagLabel,
  TagRightIcon,
} from "@chakra-ui/react";
import {
  FaSearch,
  FaFilter,
  FaHouseUser,
  FaBed,
  FaToilet,
} from "react-icons/fa";
import axios from "axios";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";

const PropertySearch = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(15000000);
  const [totalKamar, setTotalKamar] = useState(0);
  const [kamar_mandi, setkamar_mandi] = useState(0);
  const [type, setType] = useState("");
  const [showPopupFilter, setShowPopupFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();

  useEffect(() => {
    fetchProperties();
  }, [currentPage]);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const endpoint = searchTerm
        ? `property/search/${searchTerm}`
        : "property/search/all";

      const response = await axios.get(
        `https://livin-api.rrens.me/api/${endpoint}`,
        {
          params: {
            page: currentPage,
            priceStart: minPrice,
            priceEnd: maxPrice,
            bedroomCount: totalKamar === 5 ? 5 : totalKamar,
            bathroomCount: kamar_mandi === 5 ? 5 : kamar_mandi,
            type: type,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const filteredData = response.data.data.data.filter(
        (property) =>
          (totalKamar === 5 ? property.total_kamar >= 5 : true) &&
          (kamar_mandi === 5 ? property.kamar_mandi >= 5 : true)
      );
      setProperties(filteredData);
      setTotalPages(response.data.data.last_page);
    } catch (error) {
      console.error("Error fetching properties:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast({
          title: "Authentication Error",
          description: "Please log in again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch properties. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchProperties();
    setShowPopupFilter(false);
  };

  const handleSave = () => {
    setShowPopupFilter(false);
  };

  const options = [1, 2, 3, 4, 5];
  const typeKamar = ["kost", "apartement", "kontrakan"];

  return (
    <Box>
      <SimpleGrid columns={1} spacing={4} mb={4}>
        <HStack>
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            width="210px"
          />
          <IconButton
            aria-label="filter"
            icon={<FaFilter />}
            onClick={() => setShowPopupFilter(!showPopupFilter)}
          />
          <Tag height="40px" variant="outline" colorScheme="blue">
            <TagLabel color="black">{totalKamar}</TagLabel>
            <TagRightIcon as={FaBed} />
          </Tag>
          <Tag height="40px" variant="outline" colorScheme="blue">
            <TagLabel color="black">{kamar_mandi}</TagLabel>
            <TagRightIcon as={FaToilet} />
          </Tag>
          <Text
            rounded="full"
            padding={2}
            border="1px"
            borderColor="blue.500"
            color="blue.500"
          >
            Rp. {minPrice.toLocaleString()} - Rp. {maxPrice.toLocaleString()}
          </Text>
          <Button onClick={handleSearch} isLoading={isLoading}>
            Cari
          </Button>
        </HStack>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <Box>
          <Flex>
            <Text fontWeight="bold">{searchTerm || "All Properties"}</Text>
            <Spacer />
            <Text>{properties.length} Hasil</Text>
          </Flex>

          <SimpleGrid columns={2} spacing={4}>
            {properties.map((property) => (
              <Link
                key={property.id}
                to={`/detail-properti/${property.id}`}
                style={{ textDecoration: "none" }}
              >
                <Flex
                  p={4}
                  bg="white"
                  borderRadius="lg"
                  shadow="md"
                  _hover={{
                    shadow: "lg",
                    transform: "scale(1.02)",
                    transition: "all 0.2s",
                  }}
                >
                  <Image
                    src={
                      property.image
                        ? property.image[0]
                        : "https://via.placeholder.com/150"
                    }
                    alt="Property Image"
                    boxSize="100px"
                    borderRadius="lg"
                  />
                  <Box ml={4}>
                    <Text fontWeight="bold">{property.nama}</Text>
                    <Text color="green.500">
                      Rp. {property.harga_sewa_1_bulan.toLocaleString()}/Bulan
                    </Text>
                    <Text>
                      {property.total_kamar} | {property.kamar_mandi} |{" "}
                      {property.lebar_tanah} m²
                    </Text>
                  </Box>
                </Flex>
              </Link>
            ))}
          </SimpleGrid>

          <Flex justify="center" mt={4}>
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              isDisabled={currentPage === 1}
            >
              Previous
            </Button>
            <Text mx={2}>
              Page {currentPage} of {totalPages}
            </Text>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              isDisabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Flex>
        </Box>

        <Box height="500px">
          {properties.length > 0 && (
            <MapContainer
              center={[
                parseFloat(properties[0].latitude),
                parseFloat(properties[0].longitude),
              ]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {properties.map((property) => (
                <Marker
                  key={property.id}
                  position={[
                    parseFloat(property.latitude),
                    parseFloat(property.longitude),
                  ]}
                >
                  <Popup>
                    <Text fontWeight="bold">{property.nama}</Text>
                    <Text>
                      Rp. {property.harga_sewa_1_bulan.toLocaleString()}/ Bulan
                    </Text>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </Box>
      </SimpleGrid>

      {showPopupFilter && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="white"
          p={6}
          borderRadius="md"
          shadow="xl"
          zIndex="modal"
          width="400px"
        >
          <Text as="b">Kebutuhan Lokasi Sewa Rumah</Text>
          <Text as="b" my={2}>
            Range harga sewa per orang dalam setahun
          </Text>
          <Text>
            Rp. {minPrice.toLocaleString()} - Rp. {maxPrice.toLocaleString()}
          </Text>
          <RangeSlider
            defaultValue={[minPrice, maxPrice]}
            min={0}
            max={20000000}
            step={1000000}
            onChangeEnd={(val) => {
              setMinPrice(val[0]);
              setMaxPrice(val[1]);
            }}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
          <Text as="b" my={2}>
            Kamar
          </Text>
          <Select
            value={totalKamar}
            onChange={(e) => setTotalKamar(parseInt(e.target.value))}
          >
            <option value="0">Pilih Kamar</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option === 5 ? "5+" : option}
              </option>
            ))}
          </Select>
          <Text as="b" my={2}>
            Kamar Mandi
          </Text>
          <Select
            value={kamar_mandi}
            onChange={(e) => setkamar_mandi(parseInt(e.target.value))}
          >
            <option value="0">Pilih Kamar Mandi</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option === 5 ? "5+" : option}
              </option>
            ))}
          </Select>

          <Text as="b" my={2}>
            Type
          </Text>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="0">Pilih Type</option>
            {typeKamar.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          <Flex mt={4}>
            <Button colorScheme="blue" onClick={handleSave}>
              Simpan
            </Button>
            <Spacer />
            <Button onClick={handleSearch}>Cari</Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default PropertySearch;
