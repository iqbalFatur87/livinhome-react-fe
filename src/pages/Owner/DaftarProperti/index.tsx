import { Button, HStack, Stack } from "@chakra-ui/react";
import DaftarProperti from "./components/DataProperty";
import DataFoto from "./components/DataFoto";
import { useEffect, useState } from "react";
import FasilitasProperti from "./components/FasilitasProperti";
import HargaProperti from "./components/HargaProperti";
import axios from "axios";
import { BASE_API } from "../../../utils/constant/api";
import { AUTHORIZATION_HEADERS } from "../../../utils/constant/localStorage";
import { authorityCheck, logout } from "../../../utils/helper/helper";

const index = () => {
  const pageState: string[] = ["daftar properti", "foto properti", "fasilitas properti", "harga properti"];
  const [selectedState, setSelectedState] = useState<number>(0);
  const [dataState, setDataState] = useState<any>({ foto_kamar_tidur: [] });
  const [listRules, setListRules] = useState<any>(null);
  const [indonesia, setIndonesia] = useState<any>([]);
  const getListRules = async () => {
    await axios
      .get(`${BASE_API}/property/get-rules`, AUTHORIZATION_HEADERS)
      .then((res) => setListRules(res.data.data))
      .catch((error) => {
        authorityCheck(error.response.status);
      });
  };
  const getIndonesia = async () => {
    await axios.get("/indonesia.json").then((res) => setIndonesia(res.data));
  };

  useEffect(() => {
    getListRules();
    getIndonesia();
  }, []);
  return (
    <Stack paddingY={"20px"} paddingX={{ base: "8px", md: "50px" }} width={{ base: "100%", md: "70%" }} maxWidth={"1080px"}>
      {/* <pre>{JSON.stringify(dataState, null, 2)}</pre> */}
      {pageState[selectedState] == "daftar properti" ? (
        <DaftarProperti dataState={dataState} setDataState={setDataState} listRules={listRules} indonesia={indonesia} />
      ) : pageState[selectedState] == "foto properti" ? (
        <DataFoto dataState={dataState} setDataState={setDataState} />
      ) : pageState[selectedState] == "fasilitas properti" ? (
        <FasilitasProperti dataState={dataState} setDataState={setDataState} />
      ) : pageState[selectedState] == "harga properti" ? (
        <HargaProperti dataState={dataState} setDataState={setDataState} />
      ) : null}

      <HStack marginTop={"40px"} justifyContent={"center"}>
        {selectedState > 0 ? (
          <Button colorScheme="gray" onClick={() => setSelectedState(selectedState - 1)}>
            Kembali
          </Button>
        ) : null}
        {selectedState < pageState.length - 1 ? (
          <Button colorScheme="yellow" onClick={() => setSelectedState(selectedState + 1)}>
            Lanjutkan
          </Button>
        ) : null}
      </HStack>
      <Button onClick={logout} position={"fixed"} top={"0"} right={0} colorScheme={"red"}>
        Logout
      </Button>
    </Stack>
  );
};

export default index;
