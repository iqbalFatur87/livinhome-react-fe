import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import { borderRadius, primaryTextColor, secondaryTextColor } from "../../../../components/theme";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API } from "../../../../utils/constant/api";

import LoadingComponent from "../../../../components/LoadingComponent";
import { authorityCheck, AUTHORIZATION_HEADERS, convertToHumanDate } from "../../../../utils/helper/helper";

const index = () => {
  const navigate = useNavigate();
  const [dataState, setDataState] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getData = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_API}/pengajuan/list`, AUTHORIZATION_HEADERS)
      .then((res) => setDataState(res.data.data))
      .catch((e) => authorityCheck(e.response.status));
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return loading ? (
    <LoadingComponent />
  ) : (
    <>
      {/* <pre>{JSON.stringify(dataState, null, 2)}</pre> */}
      <Stack>
        <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"start"} fontSize={"xl"}>
          Pengajuan Sewa
        </Text>
        <HStack fontSize={"16px"}>
          <MdOutlineNotificationsActive style={{ fontWeight: "bold", fontSize: "20px" }} />
          <Text>Pastikan kamu sudah mempersiapkan diri bertemu dengan calon penyewa di waktu yang sudah ditentukan</Text>
        </HStack>
      </Stack>

      <HStack flexWrap={"wrap"}>
        {dataState.map((i: any, index: number) => (
          <Stack
            // minHeight={"391px"}
            width={{ base: "100%", md: "464px" }}
            borderRadius={borderRadius()}
            borderColor={"rgba(197, 142, 36, 1)"}
            borderWidth={"1px"}
            padding={"16px"}
            key={index}
          >
            <Stack borderBottom={"1px"} borderColor={"rgba(179, 179, 179, 1)"} paddingBottom={"10px"}>
              <Text fontWeight={"bold"} color={primaryTextColor()} textAlign={"start"} fontSize={"md"}>
                Pengajuan Sewa
              </Text>
            </Stack>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"} color={primaryTextColor()}>
                {i?.property?.[0]?.nama}
              </Text>
              <Text color={secondaryTextColor()}>{i?.property?.[0]?.kategori}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"} color={primaryTextColor()}>
                Nama
              </Text>
              <Text color={secondaryTextColor()}>{i?.fullname}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"} color={primaryTextColor()}>
                Tanggal Masuk
              </Text>
              <Text color={secondaryTextColor()}>{convertToHumanDate(i.tanggal_masuk)}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"} color={primaryTextColor()}>
                Durasi Sewa
              </Text>
              <Text color={secondaryTextColor()}>{i?.property?.[0]?.minimum_sewa || 0} Bulan</Text>
            </HStack>
            <Text textAlign={"center"} color={"rgba(212, 47, 47, 1)"} marginTop={"20px"}>
              {i?.deadline}
            </Text>
            <Button
              onClick={() => navigate(`/owner/pengajuan-sewa/info-pengajuan-sewa/${i.id}`)}
              color={"white"}
              backgroundColor={"black"}
              size={"sm"}
              _hover={{ backgroundColor: "black" }}
              marginTop={"20px"}
            >
              Info Selengkapnya
            </Button>
          </Stack>
        ))}
      </HStack>
    </>
  );
};

export default index;
