import {
    Step,
    StepIcon,
    StepIndicator,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Box,
} 
from '@chakra-ui/react'

interface StepperProps {
    currentStep: number;
}

const StepperDaftarProperti = ({ currentStep }: StepperProps) => {
    const steps = [
        { title: 'Data Properti', description: '📋' },
        { title: 'Data Foto', description: '📸' },
        { title: 'Fasilitas Properti', description: '🏠' },
        { title: 'Harga Properti', description: '💰' },
      ];

    return (
          <Stepper size='lg' index={currentStep} gap='0' colorScheme='orange' my='20px'>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={step.description}
                    active={step.description}
                  />
                </StepIndicator>
    
                <Box flexShrink='0'>
                  <StepTitle>{step.title}</StepTitle>
                </Box>
    
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
      );
};

export default StepperDaftarProperti;