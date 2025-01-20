import {
  Grid,
  Box,
  Heading,
  Stack,
  Text,
  VStack,
  useMediaQuery,
  Spinner,
  SimpleGrid,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import { BASE_API } from '../../../utils/constant/api';

interface Renter {
  id: number;
  fullname: string;
  phone_number: string;
  gender: number; // Assuming 1 is male, 2 is female
  job: string;
  school_name: string | null;
}

interface PropertyDetails {
  id: number;
  user_id: number;
  nama: string;
  deskripsi: string;
  tanggal_dibuat: string;
  tanggal_mulai_sewa: string;
  sewa_untuk: string;
  latitude: string;
  longitude: string;
  kategori: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  alamat: string;
  catatan_alamat: string;
  fasilitas: string;
  kamar_mandi: string | null;
  lebar_tanah: number;
  daya_listrik: number;
  sumber_air: string;
  total_kamar: number;
  total_lemari: number;
  minimum_sewa: number;
  kapasitas_motor: number;
  kapasitas_mobil: number;
  meja: number;
  kasur: number;
  harga_sewa_tahun: number;
  harga_sewa_3_bulan: number;
  harga_sewa_1_bulan: number;
  bank: string;
  rekening: string;
  image: string[];
  rules: { id: number; name: string }[];
}

interface ApiResponse {
  meta: {
    code: number;
    status: string;
    message: string[];
  };
  data: {
    data: PropertyDetails;
    livin_match: Renter[];
  };
}

const LivinMates = () => {
  const { id } = useParams<{ id: string }>(); // Extracting id from URL parameters
  const [propertyData, setPropertyData] = useState<PropertyDetails | null>(
    null
  );
  const [renters, setRenters] = useState<Renter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const inSmallScreen = useMediaQuery('(max-width: 768px)');

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
        const response = await fetch(`${BASE_API}/property/livin-match/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const result: ApiResponse = await response.json();

        if (response.ok && result.meta.code === 200) {
          setPropertyData(result.data.data); // Set the property data
          setRenters(result.data.livin_match); // Set the renters data
        } else {
          throw new Error(
            result.meta.message.join(', ') || 'Failed to fetch property data'
          );
        }
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]); // Add id as a dependency to refetch when it changes

  if (isLoading) {
    return <Spinner size="xl" />; // Show a loading spinner
  }

  if (error) {
    return <Text color="red.500">{error}</Text>; // Display error message
  }

  return (
    <Stack>
      <Heading as="h2">Informasi Penyewa</Heading>
      {/* Property Details */}
      {propertyData && (
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          borderColor="yellow.200"
        >
          <VStack spacing={4} align="flex-start">
            <Heading size="lg" color="yellow.200">
              {propertyData.nama}
            </Heading>
            <Text fontWeight="bold">Deskripsi</Text>
            <Text>{propertyData.deskripsi}</Text>
            <Text fontWeight="bold">Alamat</Text>
            <Text>{propertyData.alamat}</Text>
            {/* Add more property details as needed */}
          </VStack>
        </Box>
      )}

      {/* Renter Details */}
      <SimpleGrid columns={2} gap={2}>
        {renters.length ? (
          renters.map((renter, index) => (
            <Box
              key={renter.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              borderColor="yellow.200"
            >
              <VStack spacing={4} align="flex-start">
                <Heading size="lg" color="yellow.200">
                  Penyewa {index + 1}
                </Heading>
                <Text fontWeight="bold">Nama Lengkap</Text>
                <Text>{renter.fullname}</Text>
                <Text fontWeight="bold">Nomor HP</Text>
                <Text>{renter.phone_number}</Text>
                <Text fontWeight="bold">Jenis Kelamin</Text>
                <Text>{renter.gender === 1 ? 'Laki-laki' : 'Perempuan'}</Text>
                <Text fontWeight="bold">Pekerjaan</Text>
                <Text>{renter.job}</Text>
                <Text fontWeight="bold">Sekolah</Text>
                <Text>{renter.school_name || 'Tidak ada'}</Text>
              </VStack>
            </Box>
          ))
        ) : (
          <Text>Tidak ada data penyewa ditemukan.</Text>
        )}
      </SimpleGrid>
    </Stack>
  );
};

export default LivinMates;
