import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  Flex,
  Stack,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { BASE_API } from '../../../utils/constant/api';

interface DataDashboard {
  total_kontrakan: number;
  total_kontrakan_penyewa: number;
  total_kost: number;
  total_kost_penyewa: number;
  total_apartment: number;
  total_apartment_penyewa: number;
  total_new_transaction: number;
  total_transaction: number;
}

const Dashboard = () => {
  // State untuk menyimpan data dari API
  const [dashboardData, setDashboardData] = useState<DataDashboard | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true); // Tambahkan state loading
  const [error, setError] = useState<string | null>(null); // Tambahkan state error

  // useEffect untuk mengambil data dari API saat komponen pertama kali dirender
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${BASE_API}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server');
        }

        const result = await response.json();

        // Simpan data ke state setelah berhasil fetch
        if (result.meta.code === 200) {
          setDashboardData(result.data);
        } else {
          setError('Data tidak tersedia');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Terjadi kesalahan saat mengambil data');
      } finally {
        setLoading(false); // Mengatur loading menjadi false setelah data di-fetch
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Center mt={20}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center mt={20}>
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  if (!dashboardData) {
    return null; // Jika tidak ada data, tidak menampilkan apa pun
  }

  return (
    <Stack mx={10}>
      {/* Main Content */}
      <Box width={'100%'}>
        <Grid templateColumns="repeat(1, 1fr)" gap={6}>
          {/* Total Kontrakan */}
          <GridItem
            p={5}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
          >
            <Flex align="center">
              <Image
                src="/images/admin/total_kontrakan.jpg"
                boxSize="80px"
                borderRadius="full"
                alt="Kontrakan"
                mr={4}
              />
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  Total Kontrakan
                </Text>
                <Text fontSize="4xl" color="orange.400">
                  {dashboardData.total_kontrakan}
                </Text>
              </Box>
              <Box ml="auto" textAlign="right">
                <Text fontSize="lg" fontWeight="bold">
                  Total Penyewa
                </Text>
                <Text fontSize="4xl" color="orange.400">
                  {dashboardData.total_kontrakan_penyewa}
                </Text>
              </Box>
            </Flex>
          </GridItem>

          {/* Total Kost */}
          <GridItem
            p={5}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
          >
            <Flex align="center">
              <Image
                src="/images/admin/total_kosan.jpg"
                boxSize="80px"
                borderRadius="full"
                alt="Kost"
                mr={4}
              />
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  Total Kost
                </Text>
                <Text fontSize="4xl" color="orange.400">
                  {dashboardData.total_kost}
                </Text>
              </Box>
              <Box ml="auto" textAlign="right">
                <Text fontSize="lg" fontWeight="bold">
                  Total Penyewa
                </Text>
                <Text fontSize="4xl" color="orange.400">
                  {dashboardData.total_kost_penyewa}
                </Text>
              </Box>
            </Flex>
          </GridItem>

          {/* Total Apartemen */}
          <GridItem
            p={5}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
          >
            <Flex align="center">
              <Image
                src="/images/admin/total_apartemen.jpg"
                boxSize="80px"
                borderRadius="full"
                alt="Apartemen"
                mr={4}
              />
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  Total Apartemen
                </Text>
                <Text fontSize="4xl" color="orange.400">
                  {dashboardData.total_apartment}
                </Text>
              </Box>
              <Box ml="auto" textAlign="right">
                <Text fontSize="lg" fontWeight="bold">
                  Total Penyewa
                </Text>
                <Text fontSize="4xl" color="orange.400">
                  {dashboardData.total_apartment_penyewa}
                </Text>
              </Box>
            </Flex>
          </GridItem>

          {/* Pesanan Baru */}
          <GridItem
            p={5}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
          >
            <Flex align="center">
              <Image
                src="/images/admin/pesanan_baru.png"
                boxSize="80px"
                borderRadius="full"
                alt="Pesanan Baru"
                mr={4}
              />
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  Pesanan Baru
                </Text>
                <Text fontSize="4xl" color="orange.400">
                  {dashboardData.total_new_transaction}
                </Text>
              </Box>
              <Box ml="auto" textAlign="right">
                <Text fontSize="lg" fontWeight="bold">
                  Total Pesanan
                </Text>
                <Text fontSize="4xl" color="orange.400">
                  {dashboardData.total_transaction}
                </Text>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </Stack>
  );
};

export default Dashboard;
