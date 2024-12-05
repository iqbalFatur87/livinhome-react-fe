import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Text,
  Checkbox,
  HStack,
  Flex,
  Button,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const SurveyBatal = () => {
  const { id } = useParams<{ id: string }>(); // Mengambil survey_id dari URL
  const [dataState, setDataState] = useState<any[]>([]); // untuk menyimpan data dari API
  const [selectedReason, setSelectedReason] = useState(""); // untuk menyimpan alasan yang dipilih
  const [surveyId, setSurveyId] = useState(id); // Set survey_id sesuai dengan URL param
  const toast = useToast(); // Inisialisasi toast dari Chakra UI
  const navigate = useNavigate(); // Untuk navigasi

  // Fungsi untuk mengambil data alasan pembatalan dari API
  const DataItems = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://livin-api.rrens.me/api/survey/list-reason`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const reasons = response.data.data || []; // Sesuaikan dengan struktur API
      setDataState(Array.isArray(reasons) ? reasons : []); // Pastikan dataState adalah array
    } catch (error) {
      console.log(error);
    }
  };

  // Fungsi untuk mengirimkan data pembatalan survey
  const submitCancellation = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://livin-api.rrens.me/api/survey/cancel-submit`,
        {
          reason_id: selectedReason, // Kirim reason_id yang dipilih
          survey_id: surveyId, // Kirim survey_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Pembatalan berhasil:", response.data);

      // Menampilkan toast pemberitahuan
      toast({
        title: "Pembatalan berhasil",
        description: "Survey berhasil dibatalkan.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Mengarahkan pengguna ke halaman "searching" setelah 1 detik
      setTimeout(() => {
        navigate("/searching");
      }, 1000);
    } catch (error) {
      console.log("Error saat membatalkan survey:", error);

      // Menampilkan toast pemberitahuan jika terjadi error
      toast({
        title: "Pembatalan gagal",
        description: "Terjadi kesalahan saat membatalkan survey.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Mengambil data ketika komponen di-mount
  useEffect(() => {
    DataItems();
  }, []);

  // Fungsi untuk menangani perubahan checkbox (hanya satu pilihan diperbolehkan)
  const handleCheckboxChange = (id: string) => {
    setSelectedReason(selectedReason === id ? "" : id);
  };

  return (
    <Box>
      <Center>
        <Text>Pembatalan Survey</Text>
      </Center>
      <Center>
        <Text fontWeight="bold">Pilih alasan Pembatalan</Text>
      </Center>

      {dataState.length > 0 && (
        <Box>
          {dataState.map((item) => (
            <Center key={item.id}>
              <HStack>
                <Checkbox
                  my={2}
                  value={item.id}
                  isChecked={selectedReason === item.id}
                  onChange={() => handleCheckboxChange(item.id)}
                  colorScheme="orange"
                >
                  {item.reason}
                </Checkbox>
              </HStack>
            </Center>
          ))}
        </Box>
      )}

      <Flex mt={4}>
        <Button
          onClick={submitCancellation} // Kirim data saat tombol diklik
          isDisabled={!selectedReason} // Disable jika belum ada alasan dipilih
        >
          Konfirmasi
        </Button>
        <Spacer />
        <Button onClick={() => navigate("/searching")}>Kembali</Button>
      </Flex>
    </Box>
  );
};

export default SurveyBatal;
