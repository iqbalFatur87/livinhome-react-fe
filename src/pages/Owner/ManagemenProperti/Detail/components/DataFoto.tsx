import React, { useCallback, useState } from "react";
import { Button, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { TbCloudUpload } from "react-icons/tb";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { borderRadius, primaryTextColor, primaryTextTitleColor, secondaryTextColor } from "../../../../../components/theme";

interface DataFotoProps {
  dataState: {
    images: {
      property: {
        bagian_depan?: string | null;
        bagian_jalan?: string | null;
        bagian_dalam?: string | null;
      };
      bathroom: string | null;
    };
  };
  setDataState: React.Dispatch<
    React.SetStateAction<{
      bagian_depan?: string | null;
      bagian_jalan?: string | null;
      bagian_dalam?: string | null;
      bathroom: string | null;
    }>
  >;
}

const DataFoto: React.FC<DataFotoProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  // Fungsi untuk menangani file yang diunggah
  const handleDrop = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string | null>>) => (acceptedFiles: File[]) => {
      setLoading(true);
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setter(reader.result as string); // Mengatur URL gambar
        setLoading(false);
      };

      reader.readAsDataURL(file); // Membaca file sebagai Data URL

      // Opsional: Jika ingin mengirim gambar ke server, kamu bisa menambahkannya di sini
      const formData = new FormData();
      formData.append("image", file);
      // const fileType = file.type;
      // Misalnya, kirim formData ke server menggunakan fetch atau axios
    },
    []
  );

  // Konfigurasi dropzone untuk setiap foto
  const dropzoneConfig: DropzoneOptions = {
    accept: {
      "image/*": [], // Hanya menerima file gambar
    },
  };

  const { getRootProps: getRootPropsDepan, getInputProps: getInputPropsDepan } = useDropzone({
    ...dropzoneConfig,
    onDrop: handleDrop((url) =>
      props.setDataState((prev: any) => ({ ...prev, images: { ...prev.images, property: { ...prev.images.property, bagian_depan: url } } }))
    ),
  });

  const { getRootProps: getRootPropsLuar, getInputProps: getInputPropsLuar } = useDropzone({
    ...dropzoneConfig,
    onDrop: handleDrop((url) =>
      props.setDataState((prev: any) => ({ ...prev, images: { ...prev.images, property: { ...prev.images.property, bagian_jalan: url } } }))
    ),
  });

  const { getRootProps: getRootPropsDalam, getInputProps: getInputPropsDalam } = useDropzone({
    ...dropzoneConfig,
    onDrop: handleDrop((url) =>
      props.setDataState((prev: any) => ({ ...prev, images: { ...prev.images, property: { ...prev.images.property, bagian_dalam: url } } }))
    ),
  });

  const { getRootProps: getRootPropsKamarMandi, getInputProps: getInputPropsKamarMandi } = useDropzone({
    ...dropzoneConfig,
    onDrop: handleDrop((url) => props.setDataState((prev: any) => ({ ...prev, images: { ...prev.images, bathroom: url } }))),
  });

  return (
    <Stack gap="35px">
      {/* <pre>
        {JSON.stringify({
          bagian_depan: props.dataState?.bagian_depan,
          bagian_jalan: props.dataState?.bagian_jalan,
          bagian_dalam: props.dataState?.bagian_dalam,
        })}
      </pre> */}
      <Text fontWeight="bold" color={primaryTextColor()} textAlign="center" fontSize="xl">
        Lengkapi Foto Bangunan Properti Kamu
      </Text>

      {/* Foto Bangunan Bagian Depan */}
      <Stack>
        <HStack flexWrap="wrap">
          <Text color={primaryTextColor()} fontWeight="bold">
            Foto Bangunan Bagian Depan
          </Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Text color={primaryTextColor()}>
          Disarankan agar bentuk foto horizontal agar terlihat lebih bagus dan menyeluruh untuk foto utama kontrakan kamu
        </Text>

        <Stack
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          borderRadius="30px"
          width="100%"
          aspectRatio="16/9"
          justifyContent="center"
          alignItems="center"
          {...getRootPropsDepan()}
        >
          <input {...getInputPropsDepan()} />
          {props.dataState?.images?.property?.bagian_depan ? (
            <Image
              margin="auto"
              maxWidth="100%"
              height="100%"
              objectFit="contain"
              src={props.dataState.images.property.bagian_depan}
              borderRadius={borderRadius()}
            />
          ) : loading ? (
            <Button margin="auto" isLoading />
          ) : (
            <Stack fontSize="28px" margin="auto" justifyContent="center" alignItems="center">
              <TbCloudUpload />
              <Button
                type="button"
                color="white"
                backgroundColor="black"
                borderRadius="30px"
                size="md"
                _hover={{ backgroundColor: "black" }}
                width="150px"
              >
                Pilih File
              </Button>
              <Text textAlign="center" lineHeight="4" fontSize="sm" color={secondaryTextColor()}>
                atau drag file kesini
              </Text>
            </Stack>
          )}
        </Stack>
      </Stack>

      {/* Foto Bangunan Dari Jalan atau Lingkungan Sekitar */}
      <Stack>
        <HStack flexWrap="wrap">
          <Text color={primaryTextColor()} fontWeight="bold">
            Foto Bangunan Dari Jalan atau Lingkungan Sekitar
          </Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Text color={primaryTextColor()}>Perlihatkan keadaan lingkungan sekitar di kontrakan kamu</Text>

        <Stack
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          borderRadius="30px"
          width="100%"
          aspectRatio="16/9"
          justifyContent="center"
          alignItems="center"
          {...getRootPropsLuar()}
        >
          <input {...getInputPropsLuar()} />
          {props.dataState?.images?.property?.bagian_jalan ? (
            <Image
              margin="auto"
              maxWidth="100%"
              height="100%"
              objectFit="contain"
              src={props.dataState?.images?.property?.bagian_jalan}
              borderRadius={borderRadius()}
            />
          ) : loading ? (
            <Button margin="auto" isLoading />
          ) : (
            <Stack fontSize="28px" margin="auto" justifyContent="center" alignItems="center">
              <TbCloudUpload />
              <Button
                type="button"
                color="white"
                backgroundColor="black"
                borderRadius="30px"
                size="md"
                _hover={{ backgroundColor: "black" }}
                width="150px"
              >
                Pilih File
              </Button>
              <Text textAlign="center" lineHeight="4" fontSize="sm" color={secondaryTextColor()}>
                atau drag file kesini
              </Text>
            </Stack>
          )}
        </Stack>
      </Stack>

      {/* Foto Bangunan Bagian Dalam */}
      <Stack>
        <HStack flexWrap="wrap">
          <Text color={primaryTextColor()} fontWeight="bold">
            Foto Bangunan Bagian Dalam
          </Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Text color={primaryTextColor()}>Disarankan agar menggunakan pencahayaan yang terang agar terlihat jelas</Text>

        <Stack
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          borderRadius="30px"
          width="100%"
          aspectRatio="16/9"
          justifyContent="center"
          alignItems="center"
          {...getRootPropsDalam()}
        >
          <input {...getInputPropsDalam()} />
          {props.dataState?.images?.property?.bagian_dalam ? (
            <Image
              margin="auto"
              maxWidth="100%"
              height="100%"
              objectFit="contain"
              src={props.dataState?.images?.property?.bagian_dalam}
              borderRadius={borderRadius()}
            />
          ) : loading ? (
            <Button margin="auto" isLoading />
          ) : (
            <Stack fontSize="28px" margin="auto" justifyContent="center" alignItems="center">
              <TbCloudUpload />
              <Button
                type="button"
                color="white"
                backgroundColor="black"
                borderRadius="30px"
                size="md"
                _hover={{ backgroundColor: "black" }}
                width="150px"
              >
                Pilih File
              </Button>
              <Text textAlign="center" lineHeight="4" fontSize="sm" color={secondaryTextColor()}>
                atau drag file kesini
              </Text>
            </Stack>
          )}
        </Stack>
      </Stack>

      <Stack>
        <HStack flexWrap="wrap">
          <Text color={primaryTextColor()} fontWeight="bold">
            Foto Kamar Mandi
          </Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Text color={primaryTextColor()}>Disarankan agar menggunakan pencahayaan yang terang agar terlihat jelas</Text>

        <Stack
          boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          borderRadius="30px"
          width="100%"
          aspectRatio="16/9"
          justifyContent="center"
          alignItems="center"
          {...getRootPropsKamarMandi()}
        >
          <input {...getInputPropsKamarMandi()} />
          {props.dataState?.images?.bathroom ? (
            <Image
              margin="auto"
              maxWidth="100%"
              height="100%"
              objectFit="contain"
              src={props.dataState?.images?.bathroom}
              borderRadius={borderRadius()}
            />
          ) : loading ? (
            <Button margin="auto" isLoading />
          ) : (
            <Stack fontSize="28px" margin="auto" justifyContent="center" alignItems="center">
              <TbCloudUpload />
              <Button
                type="button"
                color="white"
                backgroundColor="black"
                borderRadius="30px"
                size="md"
                _hover={{ backgroundColor: "black" }}
                width="150px"
              >
                Pilih File
              </Button>
              <Text textAlign="center" lineHeight="4" fontSize="sm" color={secondaryTextColor()}>
                atau drag file kesini
              </Text>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DataFoto;
