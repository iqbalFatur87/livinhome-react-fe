import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  HStack,
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
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {BASE_API} from '../../../utils/constant/api';
import {TransactionStatus} from "../../../models/transactions.ts";
import {useQueryGetTransactionDetail} from "../../../queries/get-transaction-detail.ts";

const DetailTransaksi = () => {
  const { id: transactionId } = useParams();
  const navigate = useNavigate()
  
  const [activeStep, setActiveStep] = useState(1);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [timeString, setTimeString] = useState<string>('');
  const token = localStorage.getItem('token');

  const steps = [
    { description: 'Ajukan Sewa' },
    { description: 'Pembayaran' },
    { description: 'Pemilik Menyetujui' },
    { description: 'Check In' },
  ];

  const { data: response, isPending } = useQueryGetTransactionDetail({ transactionId });
  
  useEffect(() => {
    if (!transactionId) return;
    if (!response?.data) return;

    if (response.data.transaction.status === TransactionStatus.Success) {
      navigate(`/success-transaction/${transactionId}`);
      setActiveStep(3);
    }
    
  }, [response?.data, transactionId, navigate]);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  useEffect(() => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    setTimeString(
      `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(
        2,
        '0'
      )}m ${String(seconds).padStart(2, '0')}s`
    );
  }, [remainingTime]);

  const handleCancelTransaction = async () => {
    try {
      if (!transactionId) {
        alert('Transaction ID is not available.');
        return;
      }

      const formData = new FormData();
      formData.append('transaction_id', transactionId);

      const response = await fetch(
        `${BASE_API}/transaction/cancel-transaction`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert('Transaksi Dibatalkan.');
      window.location.replace('/');
    } catch (error) {
      console.error('Error cancelling transaction:', error);
      alert('Failed to cancel the transaction. Please try again.');
    }
  };

  return (
    <Box width="100%" p={4} bg="gray.50">
      <Stepper m={10} size="lg" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
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

      {isPending && <Text>Loading...</Text>}

      {!isPending && response?.data && (
        <Center>
          <VStack spacing={4} width="100%">
            <Text fontWeight="bold" fontSize="xl">
              {response.data.transaction.status === TransactionStatus.Rejected && 'Pengajuan Sewa Ditolak'}

              {response.data.transaction.status === TransactionStatus.Success && 'Pengajuan Sewa Berhasil'}

              {response.data.transaction.status === TransactionStatus.Pending && 'Menunggu Konfirmasi Pemilik'}
            </Text>

            <Accordion width="100%">
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Data Penyewa
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Text>Nama: {response.data.transaction.fullname}</Text>
                  <Text>Nomor Telepon: {response.data.transaction.phone_number}</Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Informasi Sewa
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Text>Durasi: {response.data.transaction.duration} bulan</Text>
                  <Text>
                    Check-in:{' '}
                    {new Date(
                      parseInt(localStorage.getItem('checkInDate') || '0') *
                        1000
                    ).toLocaleDateString()}
                  </Text>
                  <Text>Jumlah Penyewa: {response.data.transaction.number_of_renters}</Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Text>
              Mohon tunggu sampai pemilik menyetujui pengajuan sewa Anda.
            </Text>
            <HStack>
              <Text fontWeight="bold">Batas akhir konfirmasi pemilik:</Text>
              <Text>{response.data.deadline.date}</Text>
            </HStack>
            {/*<Text>Waktu tersisa untuk membayar: {timeString}</Text>*/}
            <HStack>
              <Button colorScheme="red" onClick={handleCancelTransaction}>
                Batalkan Pengajuan Sewa
              </Button>
            </HStack>
          </VStack>
        </Center>
      )}
    </Box>
  );
};

export default DetailTransaksi;
