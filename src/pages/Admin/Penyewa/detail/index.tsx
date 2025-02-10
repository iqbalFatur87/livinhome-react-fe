import {
  Box,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_API } from '../../../../utils/constant/api';

interface DetailPenyewa {
  nama_lengkap: string;
  phone_number: string;
  alamat: string;
  email: string;
  birth_date: string;
  city_of_origin: string;
  job: string;
  status: string;
  education: string;
  emergency_number: string;
  property_name: string;
  check_in_date: string;
  gender: string;
}



const DetailPenyewa = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState<DetailPenyewa | null>(null); // State to store property details
  const [loading, setLoading] = useState(true); // State to handle loading
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      console.error('Token is not available');
      return;
    }

    // Fetch property details from the API
    axios
      .get(`${BASE_API}/admin/penyewa/detail/${id}`, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setProperty(response.data.data); // Set property data
      })
      .catch((error) => {
        console.error('Error fetching property details:', error.message);
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
          Identitas Penyewa
        </Text>
      </Link>

        <Box maxW="600px" bg="white" borderRadius="lg" p={6}>
          <Flex direction="column" gap={4}>
            <Flex gap={4} alignItems="center">
              <Text mb={2} width="200px" fontWeight="medium">Nama Lengkap</Text>
              <Input flex={1} value={property.nama_lengkap} isReadOnly={true} />
            </Flex>

            <Flex gap={4} alignItems="center">
              <Text mb={2} width="200px" fontWeight="medium">No Handphone</Text>
              <Input flex={1} value={property.phone_number} isReadOnly={true} />
            </Flex>

            <Flex gap={4} alignItems="center">
              <Text mb={2} width="200px" fontWeight="medium">Alamat</Text>
              <Input flex={1} value={property.alamat} isReadOnly={true} />
            </Flex>

            <Flex gap={4} alignItems="center">
              <Text mb={2} width="200px" fontWeight="medium">Email</Text>
              <Input flex={1} value={property.email} isReadOnly={true} />
            </Flex>

            <Flex gap={4} alignItems="center">
              <Text mb={2} width="200px" fontWeight="medium">Tanggal Lahir</Text>
              <Input flex={1} value={property.birth_date} isReadOnly={true} />
            </Flex>

            <Flex gap={4} alignItems="center">
              <Text mb={2} width="200px" fontWeight="medium">Asal Kota</Text>
              <Input flex={1} value={property.city_of_origin} isReadOnly={true} />
            </Flex>

            <Flex gap={4} alignItems="center">
              <Text mb={2} width="200px" fontWeight="medium">Pekerjaan</Text>
              <Input flex={1} value={property.job} isReadOnly={true} />
            </Flex>

            <Flex gap={4} alignItems="center">
              <Text mb={2} width="200px" fontWeight="medium">Status</Text>
              <Input flex={1} value={property.status} isReadOnly={true} />
            </Flex>

            <Flex gap={4} alignItems="center">
              <Text mb={2} width="200px" fontWeight="medium">Pendidikan Terakhir</Text>
              <Input flex={1} value={property.education} isReadOnly={true} />
            </Flex>
            
            <Flex gap={4} alignItems="center">
              <Text mb={2} width="200px" fontWeight="medium">No. Kontak Darurat</Text>
              <Input flex={1} value={property.emergency_number} isReadOnly />
            </Flex>

            <Flex gap={4} alignItems="center">
              <Text mb={2} width="200px" fontWeight="medium">Properti Yang Disewa</Text>
              <Input flex={1} value={property.property_name} isReadOnly={true} />
            </Flex>

            <Flex gap={4} alignItems="center">
              <Text mb={2} width="200px" fontWeight="medium">Tanggal Masuk</Text>
              <Input flex={1} value={property.check_in_date} isReadOnly={true} />
            </Flex>

            <Flex gap={4} alignItems="center">
              <Text mb={2} width="200px" fontWeight="medium">Jenis Kelamin</Text>
              <Input flex={1} value={property.gender} isReadOnly={true} />
            </Flex>
          </Flex>
        </Box>
    </Box>
  );
};

export default DetailPenyewa;
