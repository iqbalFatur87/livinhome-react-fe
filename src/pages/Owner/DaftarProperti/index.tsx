import { Button, HStack, Stack, useToast } from "@chakra-ui/react";
import DaftarProperti from "./components/DataProperty";
import DataFoto from "./components/DataFoto";
import { useEffect, useState } from "react";
import FasilitasProperti from "./components/FasilitasProperti";
import HargaProperti from "./components/HargaProperti";
import axios from "axios";
import { BASE_API } from "../../../utils/constant/api";
import { AUTHORIZATION_HEADERS, authorityCheck } from "../../../utils/helper/helper";
import LoadingComponent from "../../../components/LoadingComponent";

const index = () => {
  const pageState: string[] = ["daftar properti", "foto properti", "fasilitas properti", "harga properti"];
  const [selectedState, setSelectedState] = useState<number>(0);
  const [dataState, setDataState] = useState<any>({ foto_kamar_tidur: [] });
  const toast = useToast();
  const [listRules, setListRules] = useState<any>(null);
  const [indonesia, setIndonesia] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getListRules = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_API}/property/get-rules`, AUTHORIZATION_HEADERS)
      .then((res) => setListRules(res.data.data))
      .catch((error) => {
        authorityCheck(error.response.status);
      });
    setLoading(false);
  };
  const getIndonesia = async () => {
    setIndonesia([]);
    setLoading(true);
    await axios.get("/indonesia.json").then((res) => setIndonesia(res.data));
    setLoading(false);
  };
  const submit = async () => {
    setLoading(true);
    let dataToSubmit = dataState;
    dataToSubmit.tanggal_dibuat = new Date(dataState.tanggal_dibuat).getTime();
    dataToSubmit.tanggal_mulai_sewa = new Date(dataState.tanggal_mulai_sewa).getTime();
    dataToSubmit.kamar_mandi = 1;
    await axios
      .post(`${BASE_API}/property/register`, dataToSubmit, AUTHORIZATION_HEADERS)
      .then(() => {
        toast({
          description: "Berhasil menambahkan Properti",
          status: "success",
          variant: "subtle",
          duration: 9000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.href = "/owner/management-properti";
        }, 700);
      })
      .catch((error) => {
        authorityCheck(error.response.status);
        toast({
          description: error.response.data.meta.message.join(", "),
          status: "error",
          variant: "subtle",
          duration: 9000,
          isClosable: true,
        });
      });
    setLoading(false);
  };

  useEffect(() => {
    getListRules();
    getIndonesia();
  }, []);
  return loading ? (
    <LoadingComponent />
  ) : (
    <Stack paddingY={"20px"} paddingX={{ base: "8px", md: "50px" }} width={{ base: "100%", md: "70%" }} maxWidth={"1080px"}>
      {/* <pre>{JSON.stringify(dataState, null, 2)}</pre> */}
      {pageState[selectedState] == "daftar properti" ? (
        <DaftarProperti dataState={dataState} setDataState={setDataState} listRules={listRules} indonesia={indonesia} />
      ) : pageState[selectedState] == "foto properti" ? (
        <DataFoto dataState={dataState} setDataState={setDataState} />
      ) : pageState[selectedState] == "fasilitas properti" ? (
        <FasilitasProperti dataState={dataState} setDataState={setDataState} />
      ) : pageState[selectedState] == "harga properti" ? (
        <HargaProperti dataState={dataState} setDataState={setDataState} submit={submit} />
      ) : null}

      <HStack marginTop={"40px"} justifyContent={"center"}>
        {selectedState > 0 ? (
          <Button colorScheme="gray" onClick={() => setSelectedState(selectedState - 1)}>
            Kembali
          </Button>
        ) : null}
        {selectedState < pageState.length - 1 ? (
          <Button colorScheme="orange" onClick={() => setSelectedState(selectedState + 1)}>
            Lanjutkan
          </Button>
        ) : null}
      </HStack>
    </Stack>
  );
};

export default index;
