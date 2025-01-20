import {
  Box,
  Button,
  Center,
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
import {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useQueryGetTransactionDetail} from "../../../queries/get-transaction-detail.ts";

const Berhasil = () => {
  const [activeStep, setActiveStep] = useState(4);
  const steps = [
    { description: 'Ajukan Sewa' },
    { description: 'Pemilik Menyetujui' },
    { description: 'Pembayaran' },
    { description: 'Check In' },
  ];
  const { id: transactionId } = useParams();

  const { data: response, isPending } = useQueryGetTransactionDetail({ transactionId })

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

      {isPending && <Text>Loading...</Text>}

      {!isPending && response?.data && (
          <>
            <Center>
              <Button
                  variant={'solid'}
                  colorScheme={'green'}
                  height={'350px'}
                  width="200px"
                  border={'2px'}
                  borderRadius={'full'}
              >
                <VStack textAlign={'center'}>
                  <Text>{response.data.transaction.checkin}</Text>
                  <Text fontWeight="bold">
                    {' '}
                    {new Date(response.data.transaction.checkin).getDate()}
                  </Text>
                  <Text>
                    {new Date(response.data.transaction.checkin).toLocaleString('id-ID', {
                      month: 'long',
                    })}
                  </Text>
                </VStack>
              </Button>
            </Center>

            <Link to={'/searching'}>
              <Button variant={'solid'} colorScheme={'green'} width="100%">
                Kembali
              </Button>
            </Link>
          </>
      )}
    </Box>
  );
};

export default Berhasil;
