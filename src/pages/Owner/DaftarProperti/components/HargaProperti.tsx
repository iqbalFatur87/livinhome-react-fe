import { Button, HStack, Input, Select, Stack, Text } from "@chakra-ui/react";
import { customBorder, inputBackgroundColor, inputColor, primaryTextColor, primaryTextTitleColor } from "../../../../components/theme";

const HargaProperti = (props: { dataState: any; setDataState: any; submit: any }) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formatToRupiah = (value: number): string => {
    return formatter.format(value);
  };

  const parseFromRupiah = (value: string): number => {
    return Number(value.replace(/[^\d,-]/g, ""));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = parseFromRupiah(e.target.value);
    if (!isNaN(rawValue)) {
      if (props.dataState?.minimum_sewa == 1) {
        props.setDataState((prev: any) => ({
          ...prev,
          harga_sewa_1_bulan: rawValue,
          harga_sewa_3_bulan: 0,
          harga_sewa_tahun: 0,
        }));
      } else if (props.dataState?.minimum_sewa == 3) {
        props.setDataState((prev: any) => ({
          ...prev,
          harga_sewa_1_bulan: 0,
          harga_sewa_3_bulan: rawValue,
          harga_sewa_tahun: 0,
        }));
      } else if (props.dataState?.minimum_sewa == 12) {
        props.setDataState((prev: any) => ({
          ...prev,
          harga_sewa_1_bulan: 0,
          harga_sewa_3_bulan: 0,
          harga_sewa_tahun: rawValue,
        }));
      }
    }
  };

  const getCurrentValue = () => {
    if (props.dataState?.minimum_sewa == 1) {
      return formatToRupiah(props.dataState?.harga_sewa_1_bulan || 0);
    } else if (props.dataState?.minimum_sewa == 3) {
      return formatToRupiah(props.dataState?.harga_sewa_3_bulan || 0);
    } else if (props.dataState?.minimum_sewa == 12) {
      return formatToRupiah(props.dataState?.harga_sewa_tahun || 0);
    }
    return formatToRupiah(0);
  };

  return (
    <Stack gap={"25px"}>
      <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"center"} fontSize={"xl"}>
        Lengkapi Informasi Harga Sewa Kontrakan Kamu
      </Text>
      {props.dataState?.minimum_sewa ? (
        <Stack>
          <HStack flexWrap={"wrap"}>
            <Text color={primaryTextColor()}>Harga Sewa Per {props.dataState?.minimum_sewa} Bulan</Text>
            <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
          </HStack>
          <Input
            value={getCurrentValue()}
    onChange={handlePriceChange}
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
          />
        </Stack>
      ) : null}

      <Stack>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()}>Rekening Bank Pribadi</Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Select
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
          value={props.dataState?.bank}
          onChange={(e) => props.setDataState((prev: any) => ({ ...prev, bank: e.target.value }))}
        >
          <option>Pilih Bank</option>
          <option value={"bca"}>Bank Central Asia (BCA)</option>
          <option value={"bni"}>Bank Negara Indonesia (BNI)</option>
          <option value={"bri"}>Bank Rakyat Indonesia (BRI)</option>
          <option value={"bsi"}>Bank Syariah Indonesia (BSI)</option>
          <option value={"mandiri"}>Mandiri</option>
        </Select>
      </Stack>

      <Stack>
        <Button
          onClick={props.submit}
          color={"white"}
          backgroundColor={"black"}
          borderRadius={"30px"}
          size={"md"}
          _hover={{ backgroundColor: "black" }}
          marginTop={"20px"}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default HargaProperti;
