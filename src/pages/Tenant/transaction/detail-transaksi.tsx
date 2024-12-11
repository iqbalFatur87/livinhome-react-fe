import {
  Box,
  Center,
  VStack,
  Text,
  HStack,
  Button,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepStatus,
  StepTitle,
  StepSeparator,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailTransaksi = () => {
  const [Datatrans, setData] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [timeString, setTimeString] = useState<string>("");
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const steps = [
    { description: "Ajukan Sewa" },
    { description: "Pembayaran" },
    { description: "Pemilik Menyetujui" },
    { description: "Check In" },
  ];

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
      setData(response.data.data);
      if (response.data.data.data.status == 1) {
        const transactionId = localStorage.getItem("idtransaksi");
          window.location.href = `/success-transaction/${transactionId}`;
          setActiveStep(3);
      
      }
      const remainingTimeString = response.data.data.remaining_time;
      const calculateRemainingTime = (timeString: string) => {
        const [hours, minutes, seconds] = timeString.split(":").map(Number);
        return Math.max(hours * 3600 + minutes * 60 + seconds, 0);
      };

      setRemainingTime(calculateRemainingTime(remainingTimeString));
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, [id]);

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
      `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(
        2,
        "0"
      )}m ${String(seconds).padStart(2, "0")}s`
    );
  }, [remainingTime]);

  const handleCancelTransaction = async () => {
    try {
      const transactionId = Datatrans?.id;
      if (!transactionId) {
        alert("Transaction ID is not available.");
        return;
      }

      const formData = new FormData();
      formData.append("transaction_id", transactionId);

      const response = await fetch(
        "https://livin-api.rrens.me/api/transaction/cancel-transaction",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Transaksi Dibatalkan.");
      window.location.replace("/");
    } catch (error) {
      console.error("Error cancelling transaction:", error);
      alert("Failed to cancel the transaction. Please try again.");
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
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      {Datatrans ? (
        <Center>
          <VStack spacing={4} width="100%">
            <Text fontWeight="bold" fontSize="xl">
              {Datatrans.status === 0
                ? "Pengajuan Sewa Gagal"
                : "Pengajuan Sewa Berhasil"}
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
                  <Text>Nama: {Datatrans.fullname}</Text>
                  <Text>Nomor Telepon: {Datatrans.phone_number}</Text>
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
                  <Text>Durasi: {Datatrans.duration} bulan</Text>
                  <Text>
                    Check-in:{" "}
                    {new Date(
                      parseInt(localStorage.getItem("checkInDate") || "0") *
                        1000
                    ).toLocaleDateString()}
                  </Text>
                  <Text>Jumlah Penyewa: {Datatrans.number_of_renters}</Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Text>
              Mohon tunggu sampai pemilik menyetujui pengajuan sewa Anda.
            </Text>
            <HStack>
              <Text fontWeight="bold">Batas akhir konfirmasi pemilik:</Text>
              <Text>{Datatrans.deadline}</Text>
            </HStack>
            <Text>Waktu tersisa untuk membayar: {timeString}</Text>
            <HStack>
              <Button colorScheme="red" onClick={handleCancelTransaction}>
                Batalkan Pengajuan Sewa
              </Button>
            </HStack>
          </VStack>
        </Center>
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};

export default DetailTransaksi;
