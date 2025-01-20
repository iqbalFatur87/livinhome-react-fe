import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Grid,
  GridItem,
  useToast,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps, // Import useToast from Chakra UI
} from "@chakra-ui/react";
import {
  MdChevronRight,
  MdCalendarViewMonth,
  MdModeEdit,
  MdHome,
} from "react-icons/md";

const SurveyScheduler = () => {
  const steps = [
    { title: "First", description: "Pilih Waktu Survei" },
    { title: "Second", description: "Pemilik Menyetujui" },
    { title: "Third", description: "Cek Unit" },
  ];
  const { activeStep, setActiveStep } = useSteps({
    index: 2,
    count: steps.length,
  });

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
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Pengajuan Berhasil
          </Text>
          <Text fontSize="lg" mb={4}>
            Mohon tunggu sampai pemilik menyetujui pengajuan survei anda
          </Text>
          <Grid templateColumns="repeat(7, 1fr)" gap={2}>
            <GridItem
              border={"2px"}
              borderRadius={"full"}
              bgColor={"white"}
              _hover={{
                background: "gray.400",
                color: "teal.500",
              }}
              _pressed={{
                background: "gray.400",
                color: "teal.500",
              }}
            >
              <Button
                color={"black"}
                height={"200px"}
                colorScheme={"white"}
                width="100%"
              >
                <VStack>
                  <Text>Senin</Text>
                  <Text fontWeight="bold">33</Text>
                  <Text>Oktober</Text>
                </VStack>
              </Button>
            </GridItem>
          </Grid>
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Pilih Waktu
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap={2}>
            <GridItem>
              <Button width="100%">12.00 - 30.00</Button>
            </GridItem>
          </Grid>
        </Box>

        <Button colorScheme="blue" size="lg">
          Ajukan Survei
        </Button>
      </VStack>

      <VStack align="stretch" width="40%">
        <Box borderWidth={1} borderRadius="md" overflow="hidden">
          <Image src="/api/placeholder/400/200" alt="Kontrakan Pak Ade" />
          <Box p={4}>
            <Text fontWeight="bold">Kontrakan Pak Ade</Text>
            <Text fontSize="sm" color="gray.500">
              JI. Dipatiukur No. 5, Kota Bandung
            </Text>
          </Box>
        </Box>
        <Button variant="outline" colorScheme="blue" leftIcon={<MdModeEdit />}>
          Lihat Peta
        </Button>
      </VStack>

      
    </HStack>
  );
};

export default SurveyScheduler;
