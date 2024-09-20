import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { Checkbox, HStack, Input, Radio, RadioGroup, Select, Stack, Text, Textarea } from "@chakra-ui/react";
import { customBorder, inputBackgroundColor, inputColor, primaryTextColor, primaryTextTitleColor } from "../../../../components/theme";
// import MultipleSelect from "./components/MultipleSelect";

interface Position {
  lat: number;
  lng: number;
}

const DaftarProperti = (props: { dataState: any; setDataState: any; listRules: any; indonesia: any }) => {
  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  // const options = [
  //   { value: "option1", label: "Option 1" },
  //   { value: "option2", label: "Option 2" },
  //   { value: "option3", label: "Option 3" },
  //   { value: "option4", label: "Option 4" },
  // ];
  const [position, setPosition] = useState<Position | null>(null);

  const MapEvents = ({ onClick }: { onClick: (position: Position) => void }) => {
    useMapEvents({
      click(event: L.LeafletMouseEvent) {
        const { lat, lng } = event.latlng;
        onClick({ lat, lng });
        // console.log({ latitude: lat, longitude: lng });
        props.setDataState((prev: any) => ({ ...prev, latitude: lat, longtite: lng }));
      },
    });

    return null;
  };

  return (
    <Stack gap={"25px"}>
      {/* <pre>{JSON.stringify(indonesia, null, 2)}</pre> */}
      <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"center"} fontSize={"xl"}>
        Lengkapi Data Properti Kamu
      </Text>
      <Stack>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Nama Kontrakan
          </Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>

        <Input
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
          value={props.dataState?.nama}
          onChange={(e) => props.setDataState((prev: any) => ({ ...prev, nama: e.target.value }))}
        />
      </Stack>

      <Stack>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Tipe Properti
          </Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <RadioGroup value={props.dataState?.kategori} onChange={(e) => props.setDataState((prev: any) => ({ ...prev, kategori: e }))}>
          <Stack direction="row">
            <Radio colorScheme="yellow" value="kontrakan">
              Kontrakan
            </Radio>
            <Radio colorScheme="yellow" value="kost">
              Kost
            </Radio>
          </Stack>
        </RadioGroup>
      </Stack>

      <Stack>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Tanggal Bangun atau Terakhir Renovasi
          </Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>

        <Input
          type="date"
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
          value={props.dataState?.tanggal_dibangun}
          onChange={(e) => props.setDataState((prev: any) => ({ ...prev, tanggal_dibangun: e.target.value }))}
        />
      </Stack>

      <Stack>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Tanggal Siap di Sewakan
          </Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Input
          type="date"
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
          value={props.dataState?.tanggal_mulai_sewa}
          onChange={(e) => props.setDataState((prev: any) => ({ ...prev, tanggal_mulai_sewa: e.target.value }))}
        />
      </Stack>

      <Stack>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Disewakan untuk Pria/Wanita?
          </Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <RadioGroup value={props.dataState?.sewa_untuk} onChange={(e) => props.setDataState((prev: any) => ({ ...prev, sewa_untuk: e }))}>
          <Stack direction="row">
            <Radio colorScheme="yellow" value="Pria">
              Pria
            </Radio>
            <Radio colorScheme="yellow" value="Wanita">
              Wanita
            </Radio>
            <Radio colorScheme="yellow" value="Keudanya">
              Keudanya
            </Radio>
          </Stack>
        </RadioGroup>
      </Stack>

      <Stack>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Deskripsi Properti
          </Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>
        <Textarea
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
          value={props.dataState?.deskripsi}
          onChange={(e) => props.setDataState((prev: any) => ({ ...prev, deskripsi: e.target.value }))}
        />
      </Stack>

      {props.listRules ? (
        <Stack>
          <HStack flexWrap={"wrap"}>
            <Text color={primaryTextColor()} fontWeight={"bold"}>
              Aturan Penyewa
            </Text>
            <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
          </HStack>
          <Stack marginLeft={{ base: "8px", md: "20px" }}>
            {props.listRules.map((i: any, index: number) => (
              <Checkbox
                key={index}
                colorScheme="yellow"
                isChecked={props.dataState?.rules?.includes(i.id) || false}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const currentAturanSewa = props.dataState?.rules || []; // Inisialisasi dengan array kosong jika null

                  if (isChecked) {
                    // Tambahkan ID jika belum ada, menggunakan Set untuk menghindari duplikasi
                    props.setDataState((prev: any) => ({
                      ...prev,
                      rules: [...new Set([...currentAturanSewa, i.id])],
                    }));
                  } else {
                    // Hapus ID dari array jika ID ada
                    props.setDataState((prev: any) => ({
                      ...prev,
                      rules: currentAturanSewa.filter((id: any) => id !== i.id),
                    }));
                  }
                }}
              >
                {i.name}
              </Checkbox>
            ))}
          </Stack>
        </Stack>
      ) : null}

      <Stack>
        <HStack flexWrap={"wrap"}>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Alamat Properti
          </Text>
          <Text color={primaryTextTitleColor()}>*Wajib diisi</Text>
        </HStack>

        <Stack marginLeft={{ base: "8px", md: "20px" }} width={"100%"}>
          <Text color={primaryTextColor()}>Posisikan pin di alamat bangunan kamu dan silakan isi alamat dengan lengkap</Text>
          <MapContainer center={[-6.9175, 107.6191]} zoom={13} style={{ width: "100%", aspectRatio: "2/1" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapEvents onClick={setPosition} />
            {position && (
              <Marker position={[position.lat, position.lng]}>
                <Popup>
                  Latitude: {position.lat}, Longitude: {position.lng}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </Stack>
      </Stack>

      <Stack>
        <Text color={primaryTextColor()} fontWeight={"bold"}>
          Provinsi
        </Text>
        <Select
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
          value={props.dataState?.provinsi}
          onChange={(e) => {
            props.setDataState((prev: any) => ({ ...prev, provinsi: e.target.value }));
            props.setDataState((prev: any) => ({ ...prev, kota: null }));
            props.setDataState((prev: any) => ({ ...prev, kecamatan: null }));
          }}
        >
          <option>Pilih Provinsi</option>
          {props.indonesia.map((provinsi: any, index: number) => (
            <option key={index} value={provinsi.name}>
              {provinsi.name}
            </option>
          ))}
        </Select>
      </Stack>

      {props.dataState?.provinsi ? (
        <Stack>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Kota
          </Text>
          <Select
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
            value={props.dataState?.kota}
            onChange={(e) => {
              props.setDataState((prev: any) => ({ ...prev, kota: e.target.value }));
              props.setDataState((prev: any) => ({ ...prev, kecamatan: null }));
            }}
          >
            <option>Pilih Kota</option>
            {props.indonesia
              .filter((i: any) => i.name === props.dataState.provinsi)[0]
              .listKota.map((kota: any, index: number) => (
                <option key={index} value={kota.name}>
                  {kota.name}
                </option>
              ))}
          </Select>
        </Stack>
      ) : null}

      {props.dataState?.kota ? (
        <Stack>
          <Text color={primaryTextColor()} fontWeight={"bold"}>
            Kecamatan
          </Text>
          <Select
            backgroundColor={inputBackgroundColor()}
            border={customBorder()}
            color={inputColor()}
            value={props.dataState?.kecamatan}
            onChange={(e) => {
              props.setDataState((prev: any) => ({ ...prev, kecamatan: e.target.value }));
            }}
          >
            <option>Pilih Kecamatan</option>
            {props.indonesia
              .filter((i: any) => i.name === props.dataState.provinsi)[0]
              .listKota.filter((j: any) => j.name === props.dataState.kota)[0]
              .listKecamatan.map((kecamatan: any, index: number) => (
                <option key={index} value={kecamatan.name}>
                  {kecamatan.name}
                </option>
              ))}
          </Select>
        </Stack>
      ) : null}

      <Stack>
        <Text color={primaryTextColor()} fontWeight={"bold"}>
          Alamat
        </Text>
        <Input
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
          value={props.dataState?.alamat}
          onChange={(e) => props.setDataState((prev: any) => ({ ...prev, alamat: e.target.value }))}
        />
      </Stack>

      <Stack>
        <Text color={primaryTextColor()} fontWeight={"bold"}>
          Catatan Alamat (Opsional)
        </Text>
        <Input
          backgroundColor={inputBackgroundColor()}
          border={customBorder()}
          color={inputColor()}
          value={props.dataState?.catatan_alamat}
          onChange={(e) => props.setDataState((prev: any) => ({ ...prev, catatan_alamat: e.target.value }))}
        />
      </Stack>
      {/* <Stack>
        <Text color={primaryTextColor()} fontWeight={"bold"}>
          Multiple Select
        </Text>
        <MultipleSelect
          options={options}
          label="Select Options"
          placeholder="Select options..."
          selectedValues={selectedOptions}
          onChange={setSelectedOptions}
        />
      </Stack> */}
    </Stack>
  );
};

export default DaftarProperti;
