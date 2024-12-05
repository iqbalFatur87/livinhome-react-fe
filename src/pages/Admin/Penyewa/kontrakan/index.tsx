import React, { useEffect, useState } from "react";
import { Flex, IconButton, Table, Tbody, Td, Th, Tr } from "@chakra-ui/react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import { Link } from "react-router-dom";
import { MdDelete, MdPreview } from "react-icons/md";

DataTable.use(DT);

interface PropertiKost {
  id: number;
  renter_name: string;
  property_name: string;
  phone_number: number;
  checkin: string;
}

const PemilikKost = () => {
  const [kostData, setKostData] = useState<PropertiKost[]>([]);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://livin-api.rrens.me/api/admin/penyewa/delete",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            property_id: id,
          }),
        }
      );

      if (response.ok) {
        setKostData((prevData) => prevData.filter((kost) => kost.id !== id)); // Remove the deleted item from UI
        toast({
          title: "Property deleted",
          description: "The property has been successfully deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to delete the property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      toast({
        title: "Error",
        description: "Failed to delete the property. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    // Fetch data dari API
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "https://livin-api.rrens.me/api/admin/penyewa/category/kontrakan",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        setKostData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Table variant={"simple"}>
      <Tr>
        <Th>No</Th>
        <Th>Nama Penyewa</Th>
        <Th>Nama Property</Th>
        <Th>No Handphone</Th>
        <Th>Tanggal Masuk</Th>
        <Th>Lainnya</Th>
      </Tr>
      <Tbody>
        {kostData.map((kost, index) => (
          <Tr key={kost.id}>
            <Td>{index + 1}</Td>
            <Td>{kost.renter_name}</Td>
            <Td>{kost.property_name}</Td>
            <Td>{kost.phone_number}</Td>
            <Td>{kost.checkin}</Td>
            <Td>
            <Flex gap={3}>
                <IconButton
                  aria-label="Delete Property"
                  icon={<MdDelete />}
                  onClick={() => handleDelete(kost.id)} // Call delete handler
                />
                <Link to={`/admin/penyewa-detail/${kost.id}`}>
               
                <IconButton
                  aria-label="View Property"
                  icon={<MdPreview />}
                />
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
