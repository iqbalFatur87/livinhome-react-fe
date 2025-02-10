import { Box, Flex, Input, SimpleGrid, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_API } from '../../../../utils/constant/api';

interface PropertyDetail {
  property_name: string;
  type: string;
  room: string;
  checkin: string;
  checkout: string;
  duration: string;
  additional_service: string;
  payment_status: string;
  full_name: string;
  phone_number: string;
  gender: string;
  job: string;
  document: string;
}

const DetailPemilik = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState<PropertyDetail | null>(null); // State to store property details
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
          Detail Pemesanan
        </Text>
      </Link>

        <Box maxW="600px" bg="white" borderRadius="lg" p={6}>
        <Flex direction="column" gap={4}>
          <Flex gap={4} alignItems="center">
            <Text width="150px" fontWeight="medium">Properti Yang Disewa</Text>
            <Input flex={1} value={property.property_name || '-'} readOnly />
          </Flex>

          <Flex gap={4} alignItems="center">
            <Text width="150px" fontWeight="medium">Jenis</Text>
            <Input flex={1} value={property.type || '-'} readOnly />
          </Flex>

          <Flex gap={4} alignItems="center">
            <Text width="150px" fontWeight="medium">Kamar</Text>
            <Input flex={1} value={property.room || '-'} readOnly />
          </Flex>

          <Flex gap={4} alignItems="center">
            <Text width="150px" fontWeight="medium">Tanggal Masuk</Text>
            <Input flex={1} value={property.checkin || '-'} readOnly />
          </Flex>

          <Flex gap={4} alignItems="center">
            <Text width="150px" fontWeight="medium">Tanggal Berakhir</Text>
            <Input flex={1} value={property.checkout || '-'} readOnly />
          </Flex>

          <Flex gap={4} alignItems="center">
            <Text width="150px" fontWeight="medium">Durasi Sewa</Text>
            <Input flex={1} value={property.duration || '-'} readOnly />
          </Flex>

          <Flex gap={4} alignItems="center">
            <Text width="150px" fontWeight="medium">Layanan Tambahan</Text>
            <Input flex={1} value={property.additional_service || '-'} readOnly />
          </Flex>

          <Flex gap={4} alignItems="center">
            <Text width="150px" fontWeight="medium">Status Pembayaran</Text>
            <Input flex={1} value={property.payment_status || '-'} readOnly />
          </Flex>

          <Flex gap={4} alignItems="center">
            <Text width="150px" fontWeight="medium">Nama Lengkap</Text>
            <Input flex={1} value={property.full_name || '-'} readOnly />
          </Flex>

          <Flex gap={4} alignItems="center">
            <Text width="150px" fontWeight="medium">No Handphone</Text>
            <Input flex={1} value={property.phone_number || '-'} readOnly />
          </Flex>

          <Flex gap={4} alignItems="center">
            <Text width="150px" fontWeight="medium">Jenis Kelamin</Text>
            <Input flex={1} value={property.gender || '-'} readOnly />
          </Flex>

          <Flex gap={4} alignItems="center">
            <Text width="150px" fontWeight="medium">Pekerjaan</Text>
            <Input flex={1} value={property.job || '-'} readOnly />
          </Flex>

          <Flex gap={4} alignItems="center">
            <Text width="150px" fontWeight="medium">Dokumen</Text>
            <Input flex={1} value={property.document || '-'} readOnly />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default DetailPemilik;
