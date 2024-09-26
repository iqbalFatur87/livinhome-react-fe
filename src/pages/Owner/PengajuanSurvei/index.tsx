import { HStack, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import TableCompo from "../../../components/TableCompo";
import { FiEdit } from "react-icons/fi";
import ModalKonfirmasi from "./components/ModalKonfirmasi";

const index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Stack gap={"30px"}>
      <TableCompo
        tableName={"Jadwal Survei Calon Penyewa"}
        additionalComponent={
          <HStack fontSize={"16px"}>
            <MdOutlineNotificationsActive style={{ fontWeight: "bold", fontSize: "20px" }} />
            <Text>Pastikan kamu sudah mempersiapkan diri bertemu dengan calon penyewa di waktu yang sudah ditentukan</Text>
          </HStack>
        }
        columns={[
          {
            title: "Nomor",
            key: "nomor",
          },
          {
            title: "Nama Properti",
            key: "namaProperti",
          },
          {
            title: "Nama Calon Penyewa",
            key: "namaCalonPenyewa",
          },
          {
            title: "Waktu",
            key: "waktu",
          },
          {
            title: "Aksi",
            key: "aksi",
            align: "right",
            render: () => (
              <HStack justifyContent={"end"} cursor={"pointer"} onClick={onOpen}>
                <FiEdit style={{ fontWeight: "bold", fontSize: "16px" }} />
              </HStack>
            ),
          },
        ]}
        data={[{ nomor: 1, namaProperti: "Rumah Maul", namaCalonPenyewa: "Maul", waktu: "09.00-10.00 14 Agustus 2024", aksi: 1 }]}
      />

      <TableCompo
        tableName={"Riwayat Penolakan Survei Calon Penyewa"}
        columns={[
          {
            title: "Nomor",
            key: "nomor",
          },
          {
            title: "Nama Properti",
            key: "namaProperti",
          },
          {
            title: "Nama Calon Penyewa",
            key: "namaCalonPenyewa",
          },
          {
            title: "Waktu",
            key: "waktu",
          },
          {
            title: "Keterangan",
            key: "keterangan",
            align: "right",
          },
        ]}
        data={[
          {
            nomor: 1,
            namaProperti: "Rumah Maul",
            namaCalonPenyewa: "Maul",
            waktu: "09.00-10.00 14 Agustus 2024",
            keterangan: "Penyewa bermasalah hukum",
          },
        ]}
      />

      <ModalKonfirmasi isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Stack>
  );
};

export default index;
