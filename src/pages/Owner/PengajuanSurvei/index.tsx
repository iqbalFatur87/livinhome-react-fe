import { HStack, Stack, Text, useToast } from "@chakra-ui/react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import TableCompo from "../../../components/TableCompo";
import { FiEdit } from "react-icons/fi";
import ModalKonfirmasi from "./components/ModalKonfirmasi";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API } from "../../../utils/constant/api";
import { AUTHORIZATION_HEADERS } from "../../../utils/helper/helper";
import LoadingComponent from "../../../components/LoadingComponent";

const index = () => {
  const toast = useToast();
  const [dataState, setDataState] = useState<any>([]);
  const [dataTolakSurvei, setDataTolakSurvei] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  // const [confirmSuccess, setConfirmSuccess] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<any>(null);
  const getData = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_API}/survey/calon-penyewa`, AUTHORIZATION_HEADERS)
      .then((res) => {
        setDataState(res.data.data);
      })
      .catch((e) => {
        toast({
          description: e.response.data.meta.message.join(", "),
          status: "error",
          variant: "subtle",
          duration: 9000,
          isClosable: true,
        });
        setDataState([]);
      });
    setLoading(false);
  };
  const getDataTolakSSurvei = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_API}/survey/tolak-survey`, AUTHORIZATION_HEADERS)
      .then((res) => {
        setDataTolakSurvei(res.data.data);
      })
      .catch((e) => {
        toast({
          description: e.response.data.meta.message.join(", "),
          status: "error",
          variant: "subtle",
          duration: 9000,
          isClosable: true,
        });
        setDataTolakSurvei([]);
      });
    setLoading(false);
  };

  useEffect(() => {
    getData();
    getDataTolakSSurvei();
  }, []);
  return loading ? (
    <LoadingComponent />
  ) : (
    <Stack gap={"30px"}>
      {/* <pre>{JSON.stringify(dataTolakSurvei, null, 2)}</pre>
      <pre>{JSON.stringify(selectedId, null, 2)}</pre> */}

      {dataState.length ? (
        <TableCompo
          tableName={"Jadwal Survei Calon Penyewa"}
          additionalComponent={
            <HStack fontSize={"16px"}>
              <MdOutlineNotificationsActive style={{ fontWeight: "bold", fontSize: "20px" }} />
              <Text>Pastikan kamu sudah mempersiapkan diri bertemu dengan calon penyewa di waktu yang sudah ditentukan</Text>
            </HStack>
          }
          columns={[
            {
              title: "No",
              key: "no",
            },
            {
              title: "Nama Properti",
              key: "namaProperti",
            },
            {
              title: "Nama Calon Penyewa",
              key: "namaCalonPenyewa",
            },
            {
              title: "Waktu",
              key: "waktu",
            },
            {
              title: "Aksi",
              key: "aksi",
              align: "right",
              render: (value: any) => (
                <HStack justifyContent={"end"} cursor={"pointer"} onClick={() => setSelectedId(value?.aksi || null)}>
                  <FiEdit style={{ fontWeight: "bold", fontSize: "16px" }} />
                </HStack>
              ),
            },
          ]}
          data={dataState.map((i: any, index: number) => ({
            no: index + 1,
            namaProperti: i?.property?.[0]?.nama || "",
            namaCalonPenyewa: i?.user?.[0]?.fullname || "",
            waktu: i?.tanggal || "",
            aksi: i?.id,
          }))}
        />
      ) : null}

      {dataTolakSurvei.length ? (
        <TableCompo
          tableName={"Riwayat Penolakan Survei Calon Penyewa"}
          columns={[
            {
              title: "No",
              key: "no",
            },
            {
              title: "Nama Properti",
              key: "namaProperti",
            },
            {
              title: "Nama Calon Penyewa",
              key: "namaCalonPenyewa",
            },
            {
              title: "Waktu",
              key: "waktu",
            },
            // {
            //   title: "Keterangan",
            //   key: "keterangan",
            //   align: "right",
            // },
          ]}
          data={dataTolakSurvei.map((i: any, index: number) => ({
            no: index + 1,
            namaProperti: i?.property?.[0]?.nama || "",
            namaCalonPenyewa: i?.user?.[0]?.fullname || "",
            waktu: i?.tanggal || "",
            keterangan: i?.id,
          }))}
        />
      ) : null}

      {selectedId ? (
        <ModalKonfirmasi
          selectedId={selectedId}
          onClose={() => {
            setSelectedId(null);
          }}
          getData={getData}
          getDataTolakSSurvei={getDataTolakSSurvei}
        />
      ) : null}
    </Stack>
  );
};

export default index;
