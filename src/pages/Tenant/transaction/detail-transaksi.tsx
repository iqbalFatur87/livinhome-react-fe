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
  useSteps,
  StepSeparator,
  Flex,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailTransaksi = () => {
  const [Datatrans, setData] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(1); // Start from the second step (index 1)
  const [remainingTime, setRemainingTime] = useState<number>(0); // In seconds
  const [timeString, setTimeString] = useState<string>(""); // Formatted time string
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null); // State to store uploaded file
  const token = localStorage.getItem("token");
  // const getId = Datatrans.property_id; // Replace with your dynamic ID

  const steps = [
    { description: "Ajukan Sewa" },
    { description: "Pemilik Menyetujui" },
    { description: "Pembayaran" },
    { description: "Check In" },
  ];
  const { id } = useParams();

  // Fetch transaction details
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
      setData(response.data.data); // Assuming the response contains the `data` key
      if (response.data.data.status == 1) {
        setActiveStep(3);
      }

      // Parse and set remaining time
      const remainingTimeString = response.data.data.remaining_time;
      const calculateRemainingTime = (timeString: string) => {
        const [hours, minutes, seconds] = timeString.split(":").map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        return totalSeconds > 0 ? totalSeconds : 0;
      };

      setRemainingTime(calculateRemainingTime(remainingTimeString));
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  // Fetch data only once when component mounts
  useEffect(() => {
    fetchTransactionData();
  }, [id]);

  // Countdown timer logic
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setTimeout(() => {
              // Redirect or handle expiration logic
            }, 700);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000); // Update every second

      return () => clearInterval(timer); // Cleanup the timer on component unmount
    }
  }, [remainingTime]);

  // Format the remaining time as hh:mm:ss
  const storedCheckIn = localStorage.getItem("checkInDate");

  // Assuming storedCheckIn is a string representing epoch time
  const epochTime = parseInt(storedCheckIn);

  // Create a Date object from the epoch time
  const checkInDate = new Date(epochTime * 1000); // Multiply by 1000 to convert to milliseconds

  // Format the date as desired
  const formattedDate = checkInDate.toLocaleDateString(); // Format as locale-specific date string

  console.log(formattedDate);
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
      // Pastikan `Datatrans` memiliki data yang valid
      const transactionId = Datatrans?.data?.id;
      if (!transactionId) {
        console.error("Transaction ID is missing");
        alert("Transaction ID is not available.");
        return;
      }

      // Siapkan FormData sebelum fetch
      const formData = new FormData();
      formData.append("transaction_id", transactionId);

      const response = await fetch(
        "https://livin-api.rrens.me/api/transaction/cancel-transaction",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Pastikan `token` valid
          },
          body: formData, // Kirimkan FormData
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Transaction cancelled:", data);

      // Navigasi setelah pembatalan berhasil
      window.location.replace("/"); // Ganti halaman saat ini dengan index
    } catch (error) {
      console.error("Error cancelling transaction:", error);
      alert("Failed to cancel the transaction. Please try again.");
    }
  };

  const handleProofOfPayment = async () => {
    if (!proofOfPayment) {
      alert("Please upload a proof of payment file.");
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

      if (response.status === 200) {
        alert("Proof of payment uploaded successfully.");
        localStorage.setItem("success", "berhasil");
        window.location.href = `/success-transaction/${id}`;
      } else {
        throw new Error("Failed to upload proof of payment.");
      }
    } catch (error) {
      console.error("Error uploading proof of payment:", error);
      alert("Failed to upload proof of payment. Please try again.");
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
        Datatrans?.data?.status === 1 ? (
          <Center>
          <VStack spacing={4}>
            <Text fontWeight="bold" fontSize="xl">
              Pembayaran DP
            </Text>

            <Text>Nama : {Datatrans?.data.property.name}</Text>
            <Text>Bank : {Datatrans?.data.property.bank}</Text>
            <Text>Nomer Rekering:{Datatrans?.data.property.rekening}</Text>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setProofOfPayment(e.target.files?.[0] || null)}
            />
            <Button colorScheme="blue" onClick={handleProofOfPayment}>
              Upload Proof of Payment
            </Button>
          </VStack>
        </Center>
        ) : (
          <Center>
          <VStack spacing={4} width="100%">
            {Datatrans.status === 0 ? (
              <Text fontWeight="bold" fontSize="xl">
                Pengajuan Sewa Gagal
              </Text>
            ) : (
              <Text fontWeight="bold" fontSize="xl">
                Pengajuan Sewa Berhasil
              </Text>
            )}

            <Accordion width="100%">
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Data Penyewa
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text>Nama: {Datatrans?.data.fullname}</Text>
                  <Text>Nomor Telepon: {Datatrans?.data.phone_number}</Text>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Informasi Sewa
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text>Durasi: {Datatrans?.data.duration} bulan</Text>
                  <Text>Check-in: {formattedDate}</Text>
                  <Text>
                    Jumlah Penyewa: {Datatrans?.data.number_of_renters}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

            <Text>
              Mohon tunggu sampai pemilik menyetujui pengajuan sewa anda
            </Text>
            <HStack>
              <Text fontWeight="bold">Batas akhir konfirmasi pemilik:</Text>
              <Text>{Datatrans.deadline}</Text>
            </HStack>
            <Text>Waktu tersisa untuk membayar: {timeString}</Text>

            <HStack>
              <Button
                colorScheme="red"
                variant="solid"
                size="lg"
                onClick={handleCancelTransaction}
              >
                Batalkan Pengajuan Sewa
              </Button>
              {/* <Link to="/list-sewa">
              <Button colorScheme="gray" variant="solid" size="lg">
                Kembali ke daftar sewa
              </Button>
            </Link> */}
            </HStack>
          </VStack>
        </Center>


          
        )
      ) : (
        <Text>Loading...</Text>
      )}
    </Box>
  );
};

export default DetailTransaksi;