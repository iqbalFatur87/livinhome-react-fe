import React, { useState } from "react";
import { Box, Checkbox, Collapse, IconButton, Stack, VStack } from "@chakra-ui/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { customBorder, inputBackgroundColor, inputColor } from "../../../../../components/theme";

interface Option {
  value: string;
  label: string;
}

interface MultipleSelectProps {
  options: Option[];
  label: string;
  placeholder?: string;
  onChange: (selectedValues: string[]) => void;
  selectedValues: string[];
  width?: string;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({ options, placeholder, selectedValues, width = "100%" }) => {
  const [localSelectedValues, setLocalSelectedValues] = useState<string[]>(selectedValues);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (value: string) => {
    setLocalSelectedValues((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  return (
    <Stack width={width} gap={"0px"}>
      <Box
        p={2}
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
        backgroundColor={inputBackgroundColor()}
        border={customBorder()}
        color={inputColor()}
        borderRadius={"4px"}
        paddingY={"8px"}
        paddingX={"16px"}
      >
        <Stack direction="row" align="center" justify="space-between">
          <Box>{localSelectedValues.length > 0 ? localSelectedValues.join(", ") : placeholder}</Box>
          <IconButton aria-label={isOpen ? "Collapse options" : "Expand options"} icon={isOpen ? <FaChevronUp /> : <FaChevronDown />} size="sm" />
        </Stack>
      </Box>
      <Collapse in={isOpen}>
        <VStack
          paddingY={"8px"}
          paddingX={"16px"}
          spacing={2}
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
          borderRadius={"4px"}
        >
          {options.map((option) => (
            <Checkbox
              width={"100%"}
              key={option.value}
              isChecked={localSelectedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            >
              {option.label}
            </Checkbox>
          ))}
        </VStack>
      </Collapse>
    </Stack>
  );
};

export default MultipleSelect;
