import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  Text,
  useDisclosure,
  useSteps,
  useToast,
  VStack,
} from '@chakra-ui/react';
import {Link, useParams} from 'react-router-dom';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {BASE_API} from '../../../utils/constant/api';

const SurveyScheduler = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [surveyData, setSurveyData] = useState<any>(null);
  const [detailData, setDetailData] = useState<any>(null);
  const [jamMulai, setJamMulai] = useState('');
  const [jamSelesai, setJamSelesai] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [dates, setDates] = useState<Date[]>([]);
  const toast = useToast();
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const times = [
    '08:00 - 09:00',
    '10:00 - 11:00',
    '12:00 - 13:00',
    '14:00 - 15:00',
    '16:00 - 17:00',
  ];
  const token = localStorage.getItem('token');

  const steps = [
    { description: 'Pilih Waktu Survei' },
    { description: 'Pemilik Menyetujui' },
    { description: 'Cek Unit' },
  ];

  // Generate dates starting from today for the next 7 days
  useEffect(() => {
    const today = new Date();
    const tempDates = [];

    for (let i = 0; i < 7; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i);
      tempDates.push(newDate);
    }

    setDates(tempDates);
  }, []);

  const { id } = useParams<{ id: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchDetailData = async () => {
    try {
      const ResponseData = await axios.get(
        `${BASE_API}/property/detail-property/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataDetail = ResponseData.data.data;
      setDetailData(dataDetail);
    } catch (error) {
      console.error('Error fetching survey data:', error);
    }
  };

  const fetchSurveyData = async () => {
    try {
      const response = await axios.get(`${BASE_API}/survey/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Assuming your survey data is inside response.data.data array
      const surveyDetails = response.data.data[0];
      setSurveyData(surveyDetails);
      console.log('Fetched survey data:', surveyDetails);
    } catch (error) {
      console.error('Error fetching survey data:', error);
    }
  };

  useEffect(() => {
    fetchSurveyData();
    fetchDetailData();
  }, [id, token]);

  const handleSubmitSurvey = async () => {
    if (selectedDate && selectedTime) {
      const jamMulai = selectedTime.split(' - ')[0];
      const jamSelesai = selectedTime.split(' - ')[1];
      // const formattedDate = `${date.getFullYear()}-${String(
      //   date.getDate()
      // ).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      // date.setHours(0, 0, 0, 0);

      // const date = new Date(selectedDate);
      const data = Math.trunc(new Date(selectedDate).getTime() / 1000.0);
      // Mengonversi tanggal ke timestamp (dalam milidetik), kemudian ubah menjadi detik
      // const epochTimestamp = (date.getTime() / 1000);
      // const timestampString = (date.getTime() / 1000).toString();
      // const timestamp = parseInt(timestampString.slice(0, -2));
      const surveyPayload = {
        property_id: id,
        jam_mulai: jamMulai,
        jam_selesai: jamSelesai,
        tanggal: data,
      };
      try {
        const response = await axios.post(
          `${BASE_API}/survey/submit-survey`,
          surveyPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Response:', response.data);
        window.location.reload();
        // Show success alert or toast notification
        toast({
          title: 'Survei berhasil diajukan.',
          description: 'Silakan tunggu konfirmasi jadwal survei Anda.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error submitting survey:', error);
        toast({
          title: 'Gagal mengajukan survei.',
          description: 'Terjadi kesalahan saat mengirimkan permintaan survei.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      alert('Pilih hari dan waktu sebelum mengajukan survei.');
    }
  };

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const latitude = parseFloat(detailData?.latitude);
  const longitude = parseFloat(detailData?.longitude);

  useEffect(() => {
    if (surveyData?.status === 1 || surveyData?.status === 0) {
      setActiveStep(3);
    }
  }, [surveyData]);
  const isLatLngValid = !isNaN(latitude) && !isNaN(longitude);
  const handleEditSurvey = async () => {
    try {
      const surveyPayload = {
        survey_id: surveyData?.id,
        property_id: id,
        jam_mulai: jamMulai,
        jam_selesai: jamSelesai,
        tanggal: tanggal,
      };

      const response = await axios.post(
        `${BASE_API}/survey/edit-submit-survey`,
        surveyPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data);
      toast({
        title: 'Survei berhasil diubah.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      onClose();
      fetchSurveyData(); // Refresh survey data
    } catch (error) {
      console.error('Error editing survey:', error);
      toast({
        title: 'Gagal mengubah survei.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <HStack spacing={12} align="start">
      <VStack align="stretch" spacing={6} width="60%">
        <Stepper size="lg" index={activeStep}>
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

        {surveyData ? (
          <Box>
            <Center my={4}>
              <VStack>
                {surveyData.status === 1 ? (
                  <Box>
                    <Text fontWeight={'bold'}>
                      Pemilik Menyetujui Pengajuan Survei Anda!
                    </Text>
                    <Text>
                      Mohon datang sesuai dengan waktu yang telah ditentukan
                    </Text>
                  </Box>
                ) : surveyData.status === 0 ? (
                  <Box>
                    <Text fontWeight={'bold'}>
                      Pemilik Menolak Pengajuan Survei Anda!
                    </Text>
                    <Text>
                      Mohon tunggu sampai pemilik menyetujui pengajuan survei
                      anda
                    </Text>
                  </Box>
                ) : (
                  <Box>
                    <Text fontWeight={'bold'}>Pengajuan Berhasil</Text>
                    <Text>
                      Mohon tunggu sampai pemilik menyetujui pengajuan survei
                      anda
                    </Text>
                  </Box>
                )}

                <Button
                  variant={'solid'}
                  colorScheme={
                    surveyData.status === 1
                      ? 'green'
                      : surveyData.status === 0
                      ? 'red'
                      : 'yellow'
                  }
                  height={'350px'}
                  width="200px"
                  border={'2px'}
                  borderRadius={'full'}
                >
                  <VStack textAlign={'center'}>
                    <Text>
                      {new Intl.DateTimeFormat('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }).format(new Date(surveyData.tanggal))}
                    </Text>

                    <Text fontWeight="bold">
                      {' '}
                      {new Date(surveyData.tanggal).getDate()}
                    </Text>
                    <Text>
                      {new Date(surveyData.tanggal).toLocaleString('id-ID', {
                        month: 'long',
                      })}
                    </Text>
                  </VStack>
                </Button>
              </VStack>
            </Center>

            <Button
              variant={'solid'}
              colorScheme={
                surveyData.status === 1
                  ? 'green'
                  : surveyData.status === 0
                  ? 'red'
                  : 'yellow'
              }
              width="100%"
            >
              {surveyData.jam_mulai} | {surveyData.jam_selesai}
            </Button>

            <Flex mt={4} gap={4}>
              <Link to={'/searching'}>
                <Button>Kembali</Button>
              </Link>

              {surveyData.status == 1 ? (
                <Link to={`/survey/batal/${surveyData.id}`}>
                  <Button colorScheme={'red'} width="100%">
                    Survey Batal
                  </Button>
                </Link>
              ) : surveyData.status == null ? (
                <Button width="100%" onClick={onOpen} colorScheme="blue">
                  Edit Survey
                </Button>
              ) : (
                ''
              )}
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Survei</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing={4}>
                    <Text>Jam Mulai</Text>
                    <Input
                      type="time"
                      placeholder="Jam Mulai"
                      value={jamMulai}
                      onChange={(e) => setJamMulai(e.target.value)}
                    />
                    <Text>Jam Selesai</Text>

                    <Input
                      type="time"
                      placeholder="Jam Selesai"
                      value={jamSelesai}
                      onChange={(e) => setJamSelesai(e.target.value)}
                    />
                    <Input
                      type="date"
                      placeholder="Tanggal"
                      value={tanggal}
                      onChange={(e) => setTanggal(e.target.value)}
                    />
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" onClick={handleEditSurvey}>
                    Simpan
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        ) : (
          <>
            <Box>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Pilih Hari Survei
              </Text>
              <Grid templateColumns="repeat(7, 1fr)" gap={2}>
                {dates.map((date) => (
                  <GridItem key={date}>
                    <Button
                      onClick={() => setSelectedDate(date)}
                      variant={selectedDate === date ? 'solid' : 'outline'}
                      colorScheme={selectedDate === date ? 'blue' : 'gray'}
                      height={'200px'}
                      width="100%"
                      border={'2px'}
                      borderRadius={'full'}
                    >
                      <VStack>
                        <Text>{days[date.getDay()]}</Text>
                        <Text fontWeight="bold">{date.getDate()}</Text>
                        <Text>
                          {date.toLocaleString('id-ID', { month: 'long' })}
                        </Text>
                        <Text>
                          {date.toLocaleString('id-ID', { year: 'numeric' })}
                        </Text>
                      </VStack>
                    </Button>
                  </GridItem>
                ))}
              </Grid>
            </Box>

            <Box>
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Pilih Waktu
              </Text>
              <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                {times.map((time) => (
                  <GridItem key={time}>
                    <Button
                      onClick={() => setSelectedTime(time)}
                      variant={selectedTime === time ? 'solid' : 'outline'}
                      colorScheme={selectedTime === time ? 'blue' : 'gray'}
                      width="100%"
                    >
                      {time}
                    </Button>
                  </GridItem>
                ))}
              </Grid>
            </Box>

            <Button colorScheme="blue" size="lg" onClick={handleSubmitSurvey}>
              Ajukan Survei
            </Button>
          </>
        )}
      </VStack>

      <VStack align="stretch" width="40%">
        <Box borderWidth={1} borderRadius="md" overflow="hidden">
          <Image src={detailData?.image[0]} alt="" />
          <Box p={4}>
            <Flex>
              <Text fontWeight="bold" mr={2}>
                {detailData?.kategori}
              </Text>
              <Text fontWeight="bold"> {detailData?.nama}</Text>
            </Flex>
            <Text fontSize="sm" color="gray.500">
              {detailData?.alamat}
            </Text>
          </Box>
        </Box>
        <Box height="500px">
          {isLatLngValid ? (
            <MapContainer
              center={[latitude, longitude]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              <Marker position={[latitude, longitude]}>
                <Popup>
                  <Text fontWeight="bold">{detailData?.nama}</Text>
                  <Text>
                    Rp. {detailData?.harga_sewa_1_bulan.toLocaleString()}/Bulan
                  </Text>
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <Text>Loading map...</Text> // Placeholder jika latitude dan longitude tidak valid
          )}
        </Box>
      </VStack>
    </HStack>
  );
};

export default SurveyScheduler;
