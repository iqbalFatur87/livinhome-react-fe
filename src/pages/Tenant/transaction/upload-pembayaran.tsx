import {
  Box,
  Button,
  Center,
  Input,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  Text,
  VStack,
} from '@chakra-ui/react';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_API} from '../../../utils/constant/api';
import {useQueryGetTransactionDetail} from "../../../queries/get-transaction-detail.ts";
import {TransactionStatus} from "../../../models/transactions.ts";

const UploadPembayaran = () => {
  // const [Datatrans, setDatatrans] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(1); // Mulai dari langkah kedua
  const [remainingTime, setRemainingTime] = useState<number>(0); // Waktu tersisa dalam detik
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null); // Menyimpan file bukti pembayaran
  const token = localStorage.getItem('token');
  const { id: transactionId } = useParams(); // Mendapatkan ID dari URL parameter
  const navigate = useNavigate();
  const { data: detailResponse, isPending } = useQueryGetTransactionDetail({ transactionId });

  const calculateRemainingTime = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return Math.max(0, hours * 3600 + minutes * 60 + seconds);
  };

  useEffect(() => {
    if (!detailResponse?.data) return;

    if (detailResponse.data.transaction.status === TransactionStatus.Success) {
      setActiveStep(3);
      return;
    }

    setRemainingTime(calculateRemainingTime(detailResponse.data.deadline.remaining_time));
  }, [detailResponse?.data]);

  const steps = [
    { description: 'Ajukan Sewa' },
    { description: 'Pembayaran' },
    { description: 'Pemilik Menyetujui' },
    { description: 'Check In' },
  ];

  // Fungsi untuk mengunggah bukti pembayaran
  const handleProofOfPayment = async () => {
    if (!proofOfPayment) {
      alert('Silakan unggah file bukti pembayaran.');
      return;
    }

    if (!transactionId) {
      alert('ID transaksi tidak valid.');
      return;
    }

    const formData = new FormData();
    formData.append('proof_of_payment', proofOfPayment);
    formData.append('transaction_id', transactionId);

    try {
      await axios.post(
        `${BASE_API}/transaction/proof-of-payment`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // const responseData = response.data; // Access data directly from response
      localStorage.setItem('idtransaksi', transactionId);
      alert('Bukti pembayaran berhasil diunggah.');
      // Redirect setelah berhasil
      // window.location.href = `/transaction-detail/${transactionId}`;
      navigate(`/transaction-detail/${transactionId}`);
    } catch (error) {
      console.error('Kesalahan saat mengunggah bukti pembayaran:', error);
      alert('Gagal mengunggah bukti pembayaran. Silakan coba lagi.');
    }
  };

  if (isPending) return <Text>Loading...</Text>

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
          <Text>Nama: {detailResponse?.data.property.nama}</Text>
          <Text>Bank: {detailResponse?.data.property.bank}</Text>
          <Text>Nomor Rekening: {detailResponse?.data.property.rekening}</Text>
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
