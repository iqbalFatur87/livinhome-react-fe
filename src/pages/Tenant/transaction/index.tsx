import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Image,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Select,
} from "@chakra-ui/react";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepStatus,
  StepSeparator,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";
import LoadingComponent from "../../../components/LoadingComponent";
import axios from "axios";
import { BASE_API } from "../../../utils/constant/api";
import { AUTHORIZATION_HEADERS } from "../../../utils/helper/helper";
import { useParams } from "react-router-dom";

const RentalForm = () => {
  const { id } = useParams<{ id: string }>();
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [dataState, setDataState] = useState<any>(null);
  const [dataPropertiState, setDataPropertiState] = useState<any>(null);
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [job, setJob] = useState("");
  const [gender, setGender] = useState(1);
  const [number_of_renters, setnumber_of_renters] = useState(1);
  const [schoolName, setSchoolName] = useState("");
  const [idCard, setIdCard] = useState<File | null>(null);
  const [checkin, setCheckin] = useState<string | null>(null);
  const [duration, setDuration] = useState(1);
  const [additionalNote, setAdditionalNote] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const toast = useToast();

  // Fetch Property Details
  const getProperty = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_API}/property/detail-property/${id}`,
        AUTHORIZATION_HEADERS
      );
      setDataPropertiState(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch User Data
  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_API}/profile/renter`,
        AUTHORIZATION_HEADERS
      );
      const userData = res.data.data;
      setDataState(userData);
      setFullname(userData?.fullname || "");
      setPhoneNumber(userData?.phone_number || "");
      setJob(userData?.job || "");
      setSchoolName(userData?.school_name || "");
    } catch (error) {
      toast({
        title: "Error fetching profile data",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle File Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIdCard(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const storedDuration = localStorage.getItem("rentalDuration");
  // Submit Form
  const handleSubmit = async () => {
    if (!fullname || !phoneNumber || !job || !schoolName || !checkin) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("property_id", id || "");
    formData.append("fullname", fullname);
    formData.append("phone_number", phoneNumber);
    formData.append("job", job);
    formData.append("gender", gender.toString());
    formData.append("number_of_renters", number_of_renters.toString());
    formData.append("school_name", schoolName);
    formData.append("duration", duration.toString());
    formData.append("checkin", checkin || "");
    formData.append("additional_note", additionalNote);

    if (idCard) {
      formData.append("id_card", idCard);
    }

    try {
      const response = await fetch(
        "https://livin-api.rrens.me/api/transaction/store-transaction-data",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const resdata = await response.json();
      localStorage.setItem("idtransaksi", resdata.data.data.id);
      const getid = localStorage.getItem('idtransaksi');

     

      setTimeout(() => {
        window.location.href = `/UploadPembayaran/${getid}`;
      }, 700);

      toast({
        title: "Form submitted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error submitting form",
        description: (error as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const steps = [
    { description: "Ajukan Sewa" },
    { description: "Pemilik Menyetujui" },
    { description: "Pembayaran" },
    { description: "Check In" },
  ];

  // Cleanup URLs
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Initialize Data
  useEffect(() => {
    getProperty();
    getData();

    // Set Checkin and Duration from localStorage
    setCheckin(localStorage.getItem("checkInDate"));
    const storedDuration = localStorage.getItem("rentalDuration");
    setDuration(storedDuration ? parseInt(storedDuration, 10) : 1);
  }, []);

  if (loading) return <LoadingComponent />;

  return (
    <Box maxWidth="800px" margin="auto" padding={4}>
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

      <HStack alignItems="flex-start" spacing={8}>
        <Box flex={1}>
          <Text fontSize="xl" fontWeight="bold" marginBottom={4}>
            Informasi Penyewa
          </Text>
          <VStack align="stretch" spacing={4}>
            <Box>
              <Text fontSize="sm">Nama Lengkap</Text>
              <Input
                placeholder="Nama Lengkap"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </Box>
            <Box>
              <Text fontSize="sm">Pekerjaan</Text>
              <Input
                placeholder="Pekerjaan"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </Box>
            <Box>
              <Text fontSize="sm">Nama Sekolah</Text>
              <Input
                placeholder="Nama Sekolah"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </Box>
            <Box>
              <Text fontSize="sm">Nomer Telepon</Text>
              <Input
                placeholder="Nomer Telpon"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Box>
          </VStack>

          <Text fontSize="xl" fontWeight="bold" marginY={4}>
            Dokumen Penyewa
          </Text>
          {previewUrl && (
            <Image
              src={previewUrl}
              width={200}
              height={200}
              alt="Gambar"
              mb={4}
            />
          )}

          <Box
            borderWidth={1}
            borderStyle="dashed"
            borderRadius="md"
            padding={4}
            marginBottom={4}
          >
            <Input type="file" onChange={handleFileChange} accept="image/*" />
          </Box>

          <Text fontSize="sm">Foto KTP (Wajib)</Text>

          <HStack marginTop={8}>
            <Text>Jumlah Penyewa</Text>
            <NumberInput
              min={1}
              max={4}
              onChange={(valueString) =>
                setnumber_of_renters(Number(valueString))
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </HStack>
          <Box>
            <Text>Durasi Sewa</Text>
            <Select
              disabled
              onChange={(valueString) => setDuration(Number(valueString))}
            >
              <option value={duration}>{duration} Bulan</option>
            </Select>
          </Box>

          <Box>
            <Text fontSize="sm">Jenis Kelamin</Text>
            <Select onChange={(e) => setGender(e.target.value)}>
              <option value={1}>Laki-Laki</option>
              <option value={0}>Perempuan</option>
            </Select>
          </Box>

          <Box marginTop={8}>
            <Text>Catatan Tambahan</Text>
            <Input
              placeholder="Catatan tambahan"
              value={additionalNote}
              onChange={(e) => setAdditionalNote(e.target.value)}
            />
          </Box>

          <Button colorScheme="blue" marginTop={8} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>

        <Box flex={1}>
          <Box borderWidth={1} borderRadius="md" overflow="hidden">
            <Image src={dataPropertiState?.image[0]} alt="Kontrakan Pak Ade" />
            <Box p={4}>
              <Text fontWeight="bold">{dataPropertiState?.nama}</Text>
              <Text fontSize="sm" color="gray.500">
                {dataPropertiState?.alamat}
              </Text>
              <Divider my={4} />
              <Text fontWeight="bold" marginBottom={2}>
                Rincian Pembayaran Uang Muka (DP)
              </Text>
              <HStack justify="space-between">
                <Text fontSize="sm">Biaya sewa unit properti</Text>
                <Text fontSize="sm">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(dataPropertiState?.harga_sewa_1_bulan)}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm">Uang muka DP (20%)</Text>
                <Text fontSize="sm" fontWeight="bold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(dataPropertiState?.harga_sewa_1_bulan * 0.2)}
                </Text>
              </HStack>
              <HStack justify="space-between" fontWeight="bold" marginTop={2}>
                <Text>Total Pembayaran DP</Text>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(dataPropertiState?.harga_sewa_1_bulan * 0.2)}
                </Text>
              </HStack>
              <Divider my={4} />
              <Text fontWeight="bold" marginBottom={2}>
                Rincian Pembayaran Pelunasan
              </Text>
              <HStack justify="space-between">
                <Text fontSize="sm">Total Harga</Text>
                <Text fontSize="sm">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(
                    dataPropertiState?.harga_sewa_1_bulan * storedDuration
                  )}
                </Text>
              </HStack>
              <HStack justify="space-between" fontWeight="bold" marginTop={2}>
                <Text>Total Uang Dp 20%</Text>
                <Text>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(
                    dataPropertiState?.harga_sewa_1_bulan * storedDuration * 0.2
                  )}
                </Text>
              </HStack>
            </Box>
          </Box>
        </Box>
      </HStack>
    </Box>
  );
};

export default RentalForm;
