import {
  Box,
  Center,
  VStack,
  Text,
  Button,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  Input,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UploadPembayaran = () => {
  const [Datatrans, setDatatrans] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(1); // Mulai dari langkah kedua
  const [remainingTime, setRemainingTime] = useState<number>(0); // Waktu tersisa dalam detik
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null); // Menyimpan file bukti pembayaran
  const token = localStorage.getItem("token");
  const { id } = useParams(); // Mendapatkan ID dari URL parameter

  const steps = [
    { description: "Ajukan Sewa" },
    { description: "Pembayaran" },
    { description: "Pemilik Menyetujui" },
    { description: "Check In" },
  ];

  // Fungsi untuk mengunggah bukti pembayaran
  const handleProofOfPayment = async () => {
    if (!proofOfPayment) {
      alert("Silakan unggah file bukti pembayaran.");
      return;
    }

    const transactionId = Datatrans?.data?.id;
    const formData = new FormData();
    formData.append("proof_of_payment", proofOfPayment);
    formData.append("transaction_id", transactionId);

    try {
      const response = await axios.post(
        "https://livin-api.rrens.me/api/transaction/proof-of-payment",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // const responseData = response.data; // Access data directly from response
      localStorage.setItem("idtransaksi", transactionId);
      alert("Bukti pembayaran berhasil diunggah.");
      // Redirect setelah berhasil
      window.location.href = `/transaction-detail/${transactionId}`;
    } catch (error) {
      console.error("Kesalahan saat mengunggah bukti pembayaran:", error);
      alert("Gagal mengunggah bukti pembayaran. Silakan coba lagi.");
    }
  };

  // Fungsi untuk mengambil data transaksi
  const fetchTransactionData = async () => {
    try {
      const response = await axios.get(
        `https://livin-api.rrens.me/api/transaction/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.data;
      setDatatrans(data);

      // Update langkah aktif berdasarkan status transaksi
      if (data.status === 1) {
        setActiveStep(3);
      }

      // Menghitung waktu tersisa dalam detik
      const calculateRemainingTime = (timeString: string) => {
        const [hours, minutes, seconds] = timeString.split(":").map(Number);
        return Math.max(0, hours * 3600 + minutes * 60 + seconds);
      };

      setRemainingTime(calculateRemainingTime(data.remaining_time));
    } catch (error) {
      console.error("Kesalahan saat mengambil data transaksi:", error);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, [id]);

  return (
    <Box>
      {/* Stepper untuk status transaksi */}
      <Stepper m={10} size="lg" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      {/* Informasi pembayaran dan upload bukti */}
      <Center>
        <VStack spacing={4}>
          <Text fontWeight="bold" fontSize="xl">
            Pembayaran DP
          </Text>
          <Text>Nama: {Datatrans?.data?.property?.name}</Text>
          <Text>Bank: {Datatrans?.data?.property?.bank}</Text>
          <Text>Nomor Rekening: {Datatrans?.data?.property?.rekening}</Text>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setProofOfPayment(e.target.files?.[0] || null)}
          />
          <Button colorScheme="blue" onClick={handleProofOfPayment}>
            Unggah Bukti Pembayaran
          </Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default UploadPembayaran;
