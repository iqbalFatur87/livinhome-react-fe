import React, { useEffect, useState } from 'react';
import {
  Flex,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { MdDelete, MdPreview } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { BASE_API } from '../../../../utils/constant/api';

interface PropertiKost {
  id: number;
  nama: string;
  alamat: string;
  total_kamar: number;
  status: string;
  user: {
    fullname: string;
  }[];
}

const PemilikKost = () => {
  const [kostData, setKostData] = useState<PropertiKost[]>([]);
  const toast = useToast(); // Chakra-UI toast for notifications

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(
          `${BASE_API}/admin/pemilik/category/apartement`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const result = await response.json();
        setKostData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${BASE_API}/admin/pemilik/delete`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          property_id: id,
        }),
      });

      if (response.ok) {
        setKostData((prevData) => prevData.filter((kost) => kost.id !== id)); // Remove the deleted item from UI
        toast({
          title: 'Property deleted',
          description: 'The property has been successfully deleted.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error('Failed to delete the property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete the property. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Table variant={'simple'}>
      <Tr>
        <Th>No</Th>
        <Th>Nama Properti</Th>
        <Th>Alamat Property</Th>
        <Th>Kamar</Th>
        <Th>Nama Pemilik</Th>
        <Th>Status</Th>
        <Th>Lainnya</Th>
      </Tr>
      <Tbody>
        {kostData.map((kost, index) => (
          <Tr key={kost.id}>
            <Td>{index + 1}</Td>
            <Td>{kost.nama}</Td>
            <Td>{kost.alamat}</Td>
            <Td>{kost.total_kamar}</Td>
            <Td>{kost.user[0]?.fullname}</Td>
            <Td>{kost.status}</Td>
            <Td>
              <Flex gap={4}>
                <IconButton
                  aria-label="Delete Property"
                  icon={<MdDelete />}
                  onClick={() => handleDelete(kost.id)} // Call delete handler
                />
                <Link to={`/admin/pemilik-detail/${kost.id}`}>
                  <IconButton aria-label="View Property" icon={<MdPreview />} />
                </Link>
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default PemilikKost;
