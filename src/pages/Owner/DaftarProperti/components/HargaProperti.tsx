import { HStack, Input, Radio, RadioGroup, Select, Stack, Text } from "@chakra-ui/react";
import { customBorder, inputBackgroundColor, inputColor, primaryTextColor, primaryTextTitleColor } from "../../../../components/theme";

const HargaProperti = (props: { dataState: any; setDataState: any }) => {
  return (
    <Stack gap={"25px"}>
      <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"center"} fontSize={"xl"}>
        Lengkapi Informasi Harga Sewa Kontrakan Kamu
      </Text>
      <Stack>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()}>Jangka Waktu Minimum Sewa</Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <RadioGroup value={props.dataState?.waktuMinimumSewa} onChange={(e) => props.setDataState((prev: any) => ({ ...prev, waktuMinimumSewa: e }))}>
          <Stack direction="row">
            <Radio colorScheme="yellow" value="1">
              1 Bulan
            </Radio>
            <Radio colorScheme="yellow" value="3">
              3 Bulan
            </Radio>
            <Radio colorScheme="yellow" value="12">
              1 Tahun
            </Radio>
          </Stack>
        </RadioGroup>
      </Stack>

      {props.dataState?.waktuMinimumSewa ? (
        <Stack>
          <HStack flexWrap={"wrap"}>
            <Text color={primaryTextColor()}>Harga Sewa Per {props.dataState?.waktuMinimumSewa} Bulan</Text>
            <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
          </HStack>
          <Input
            value={
              props.dataState?.waktuMinimumSewa == 1
                ? props.dataState?.harga_sewa_1_bulan
                : props.dataState?.waktuMinimumSewa == 3
                ? props.dataState?.harga_sewa_3_bulan
                : props.dataState?.waktuMinimumSewa == 12
                ? props.dataState?.harga_sewa_tahun
                : 0
            }
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                if (props.dataState?.waktuMinimumSewa == 1) {
                  props.setDataState((prev: any) => ({
                    ...prev,
                    harga_sewa_1_bulan: Number(e.target.value),
                    harga_sewa_3_bulan: 0,
                    harga_sewa_tahun: 0,
                  }));
                } else if (props.dataState?.waktuMinimumSewa == 3) {
                  props.setDataState((prev: any) => ({
                    ...prev,
                    harga_sewa_1_bulan: 0,
                    harga_sewa_3_bulan: Number(e.target.value),
                    harga_sewa_tahun: 0,
                  }));
                } else if (props.dataState?.waktuMinimumSewa == 12) {
                  props.setDataState((prev: any) => ({
                    ...prev,
                    harga_sewa_1_bulan: 0,
                    harga_sewa_3_bulan: 0,
                    harga_sewa_tahun: Number(e.target.value),
                  }));
                }
              }
            }}
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
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()}>Nomor Rekening</Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Input
          value={props.dataState?.rekening || 0}
          onChange={(e) => {
            if (!isNaN(Number(e.target.value))) {
              props.setDataState((prev: any) => ({ ...prev, rekening: Number(e.target.value) }));
            }
          }}
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
        />
        {/* <Button color={"white"} backgroundColor={"black"} borderRadius={"30px"} size={"md"} _hover={{ backgroundColor: "black" }}>
          Check Rekening
        </Button> */}
      </Stack>
    </Stack>
  );
};

export default HargaProperti;
