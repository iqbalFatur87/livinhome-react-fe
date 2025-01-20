import { Flex, IconButton, Table, Tbody, Td, Th, Tr } from '@chakra-ui/react';
import DT from 'datatables.net-dt';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';
import { useEffect, useState } from 'react';
import { MdDelete, MdPreview } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { BASE_API } from '../../../utils/constant/api';

DataTable.use(DT);

interface PropertiKost {
  id: number;
  renter_name: string;
  property_name: string;
  status: string;
  duration: string;
  transaction_date: string;
}

const PemilikKost = () => {
  const [kostData, setKostData] = useState<PropertiKost[]>([]);

  useEffect(() => {
    // Fetch data dari API
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${BASE_API}/admin/pesanan`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setKostData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Table variant={'simple'}>
      <Tr>
        <Th>No</Th>
        <Th>Nama Penyewa</Th>
        <Th>Tanggal Transaksi</Th>
        <Th>Nama Properti</Th>
        <Th>Durasi</Th>
        <Th>Status</Th>
        <Th>Lainnya</Th>
      </Tr>
      <Tbody>
        {kostData.map((kost, index) => (
          <Tr key={kost.id}>
            <Td>{index + 1}</Td>
            <Td>{kost.renter_name}</Td>
            <Td>{kost.transaction_date}</Td>
            <Td>{kost.property_name}</Td>
            <Td>{kost.duration}</Td>
            <Td>{kost.status}</Td>
            <Td>
              <Flex gap={4}>
                <IconButton
                  aria-label="Delete Property"
                  icon={<MdDelete />}
                  onClick={() => handleDelete(kost.id)} // Call delete handler
                />
                <Link to={`/admin/pesanan-detail/${kost.id}`}>
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
