import {
  Button,
  Center,
  VStack,
  Text,
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const Berhasil = () => {
  const [activeStep, setActiveStep] = useState(4);
  const steps = [
    { description: "Ajukan Sewa" },
    { description: "Pemilik Menyetujui" },
    { description: "Pembayaran" },
    { description: "Check In" },
  ];
  const [Datatrans, setData] = useState<any>(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");
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

      // Parse and set remaining time
      // const deadline = response.data.data.deadline;
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  // Fetch data only once when component mounts
  useEffect(() => {
    fetchTransactionData();
  }, [id]);

  return (
    <Box>
      <Stepper m={10} size="lg" index={activeStep}>
        {/* Render stepper */}
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
      <Center>
        <Button
          variant={"solid"}
          colorScheme={"green"}
          height={"350px"}
          width="200px"
          border={"2px"}
          borderRadius={"full"}
        >
          <VStack textAlign={"center"}>
            <Text>{Datatrans?.data.checkin}</Text>
            <Text fontWeight="bold">
              {" "}
              {new Date(Datatrans?.data.checkin).getDate()}
            </Text>
            <Text>
              {new Date(Datatrans?.data.checkin).toLocaleString("id-ID", {
                month: "long",
              })}
            </Text>
          </VStack>
        </Button>
      </Center>
      <Link to={"/searching"}>
        <Button variant={"solid"} colorScheme={"green"} width="100%">
          Kembali
        </Button>
      </Link>
    </Box>
  );
};

export default Berhasil;
