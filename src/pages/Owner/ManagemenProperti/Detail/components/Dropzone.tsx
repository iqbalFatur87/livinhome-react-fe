import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { Stack, Button, Text, Image } from "@chakra-ui/react";
import { TbCloudUpload } from "react-icons/tb";
import { borderRadius, secondaryTextColor } from "../../../../../components/theme";

interface DropzoneProps {
  loading: boolean;
  image: any;
  index: number;
  onDrop: (acceptedFiles: File[], index: number) => void;
}

const Dropzone = ({ loading, image, index, onDrop }: DropzoneProps) => {
  const onDropCallback = useCallback((acceptedFiles: File[]) => onDrop(acceptedFiles, index), [onDrop, index]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropCallback,
  });

  return (
    <Stack
      boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      borderRadius={"30px"}
      width={"100%"}
      aspectRatio={"16/9"}
      justifyContent={"center"}
      alignItems={"center"}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {loading ? (
        <Button margin={"auto"} isLoading></Button>
      ) : image ? (
        <Image margin={"auto"} maxWidth={"100%"} height={"100%"} objectFit={"contain"} src={image} borderRadius={borderRadius()} />
      ) : (
        <Stack fontSize={"28px"} margin={"auto"} justifyContent={"center"} alignItems={"center"}>
          <TbCloudUpload />
          <Button
            type="submit"
            color={"white"}
            backgroundColor={"black"}
            borderRadius={"30px"}
            size={"md"}
            _hover={{ backgroundColor: "black" }}
            width={"150px"}
          >
            Pilih File
          </Button>
          <Text textAlign={"center"} lineHeight={"4"} fontSize={"sm"} color={secondaryTextColor()}>
            atau drag file kesini
          </Text>
        </Stack>
      )}
    </Stack>
  );
};

export default Dropzone;
