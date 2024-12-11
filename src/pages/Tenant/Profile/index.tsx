import {
  Button,
  Center,
  HStack,
  Image,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { useEffect, useState } from "react";
import LoadingComponent from "../../../components/LoadingComponent";
import axios from "axios";
import { BASE_API } from "../../../utils/constant/api";
import {
  authorityCheck,
  AUTHORIZATION_HEADERS,
} from "../../../utils/helper/helper";
import ModalUpdatePhotoProfil from "./components/ModalUpdatePhotoProfile";
import {
  customBorder,
  inputBackgroundColor,
  inputColor,
  primaryTextColor,
} from "../../../components/theme";

const ProfileUpdate = () => {
  const [loading, setLoading] = useState(true);
  const [dataState, setDataState] = useState<any>(null);
  const [initDataState, setInitDataState] = useState<any>(null);
  const [listKota, setListKota] = useState<any>([]);
  const [idCardFile, setIdCardFile] = useState<File | null>(null); // State to manage KTP file upload
  const [photoFile, setphotoFile] = useState<File | null>(null); // State to manage KTP file upload
  const toast = useToast();

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_API}/profile/renter`,
        AUTHORIZATION_HEADERS
      );
      setInitDataState(res.data.data);
      setDataState(res.data.data);
    } catch (error) {
      setDataState(null);
    }
    setLoading(false);
  };

  const getListKota = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/indonesia.json");
      const kotaList = res.data.flatMap((provinsi: any) =>
        provinsi.listKota.map((kota: any) =>
          kota.name
            .replace(/KABUPATEN\s+/i, "")
            .replace(/KOTA\s+/i, "")
            .trim()
        )
      );
      setListKota(kotaList);
    } catch (error) {
      console.error("Error fetching cities", error);
    }
    setLoading(false);
  };

  const updateForm = (field: string, newValue: any) => {
    setDataState((prev: any) => ({ ...prev, [field]: newValue }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdCardFile(e.target.files[0]); // Update the file state
    }
  };

  const handlephotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setphotoFile(e.target.files[0]); // Update the file state
    }
  };

  const submit = async () => {
    setLoading(true);
    const dateOfBirth = new Date(dataState.date_of_birth);
    const formattedDateOfBirth = Math.trunc(
      new Date(dateOfBirth).getTime() / 1000.0
    );

    const formData = new FormData();
    formData.append("fullname", dataState?.fullname);
    formData.append("gender", dataState?.gender);
    formData.append("date_of_birth", `${formattedDateOfBirth}`);
    formData.append("phone_number", dataState?.phone_number);
    formData.append("job", dataState?.job);
    formData.append("school_name", dataState?.school_name);
    formData.append("city", dataState?.city);
    formData.append("status", dataState?.status);
    formData.append("last_education", dataState?.last_education);
    formData.append("emergency_contact", dataState?.emergency_contact);

    if (idCardFile) {
      formData.append("id_card", idCardFile);
    }

    if (photoFile) {
      formData.append("photo_profile", photoFile); // Ensure the 'photo' field is passed correctly
    }

    try {
      await axios.post(`${BASE_API}/profile/renter/update`, formData, {
        headers: {
          ...AUTHORIZATION_HEADERS.headers,
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        description: "Berhasil update profil",
        status: "success",
        variant: "subtle",
        duration: 9000,
        isClosable: true,
      });
      getData();
    } catch (error : any) {
      if (error.response?.status === 403) {
        // Handle the 403 error (Unauthorized or Forbidden)
        toast({
          description: "Anda tidak memiliki izin untuk melakukan tindakan ini",
          status: "error",
          variant: "subtle",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          description:
            error.response?.data?.meta?.message?.join(", ") ||
            "Terjadi kesalahan",
          status: "error",
          variant: "subtle",
          duration: 9000,
          isClosable: true,
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getListKota();
    getData();
  }, []);

  if (loading) return <LoadingComponent />;

  return (
    <Center>
      <Stack width="100%" maxWidth="500px" gap="20px">
        <Stack alignSelf="center" alignItems="center" cursor="pointer">
          <Image
            src={dataState?.photo_profile|| "/avatar.png"}
            width="100px"
            height="100px"
            objectFit="contain"
          />
          {/* File input for KTP upload */}
          <FormFileInput
            label="Upload Photo Profile Anda (Upload File)"
            onChange={handlephotoFileChange}
          />
        </Stack>

        <NotificationBanner />

        <FormField
          label="Nama Lengkap"
          value={dataState?.fullname}
          onChange={(e) => updateForm("fullname", e.target.value)}
        />
        <FormSelect
          label="Jenis Kelamin"
          value={dataState?.gender}
          onChange={(e) => updateForm("gender", e.target.value)}
          options={[
            { label: "Laki-Laki", value: 1 },
            { label: "Perempuan", value: 0 },
          ]}
        />
        <FormField
          label="Tanggal Lahir"
          value={dataState?.date_of_birth}
          onChange={(e) => updateForm("date_of_birth", e.target.value)}
          type="date"
        />
        <FormField
          label="No Handphone"
          value={dataState?.phone_number}
          onChange={(e) => updateForm("phone_number", e.target.value)}
        />
        <FormSelect
          label="Pekerjaan"
          value={dataState?.job}
          onChange={(e) => updateForm("job", e.target.value)}
          options={[
            { label: "Mahasiswa", value: "Mahasiswa" },
            { label: "PNS", value: "PNS" },
            { label: "Swasta", value: "Swasta" },
            { label: "Wira Usaha", value: "Wira Usaha" },
          ]}
        />
        <FormField
          label="Nama Sekolah"
          value={dataState?.school_name}
          onChange={(e) => updateForm("school_name", e.target.value)}
        />
        <FormSelect
          label="Kota Asal"
          value={dataState?.city}
          onChange={(e) => updateForm("city", e.target.value)}
          options={listKota.map((kota: string) => ({
            label: kota,
            value: kota,
          }))}
        />
        <FormSelect
          label="Status"
          value={dataState?.status}
          onChange={(e) => updateForm("status", e.target.value)}
          options={[
            { label: "Kawin", value: "kawin" },
            { label: "Belum Kawin", value: "Belum Kawin" },
            { label: "Cerai", value: "Cerai" },
          ]}
        />
        <FormSelect
          label="Pendidikan Terakhir"
          value={dataState?.last_education}
          onChange={(e) => updateForm("last_education", e.target.value)}
          options={[
            { label: "SMA", value: "SMA" },
            { label: "S1", value: "S1" },
            { label: "S2", value: "S2" },
            { label: "S3", value: "S3" },
          ]}
        />

        <Image
          src={
            dataState?.id_card ||
            "https://livin-api.rrens.me/uploads/ktp/renter"
          }
          width="100px"
          height="100px"
          objectFit="contain"
        />

        {/* File input for KTP upload */}
        <FormFileInput
          label="No KTP (Upload File)"
          onChange={handleFileChange}
        />

        <FormField
          label="No Kontak Darurat"
          value={dataState?.emergency_contact}
          onChange={(e) => updateForm("emergency_contact", e.target.value)}
        />

        <HStack justifyContent="center">
          <Button onClick={() => setDataState(initDataState)}>Batal</Button>
          <Button colorScheme="yellow" onClick={submit}>
            Simpan
          </Button>
        </HStack>
      </Stack>
    </Center>
  );
};

// Custom Components for reusability

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string; value: any }[];
}

interface FormFileInputProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const NotificationBanner = () => (
  <HStack
    justifyContent="center"
    backgroundColor="rgba(0, 0, 0, 0.05)"
    borderRadius="8px"
    padding="4px"
  >
    <MdOutlineNotificationsActive />
    <Text>Harap lengkapi semua data yang dibutuhkan di atas</Text>
  </HStack>
);

const FormField: React.FC<FormFieldProps> = ({ label, value, onChange, type = "text" }) => (
  <Stack>
    <Text>{label}</Text>
    <Input
      value={value}
      onChange={onChange}
      borderRadius="12px"
      backgroundColor={inputBackgroundColor()}
      color={inputColor()}
      _placeholder={{ color: "gray.500" }}
      type={type}
    />
  </Stack>
);

const FormSelect: React.FC<FormSelectProps> = ({ label, value, onChange, options}) => (
  <Stack>
    <Text>{label}</Text>
    <Select
      value={value}
      onChange={onChange}
      borderRadius="12px"
      backgroundColor={inputBackgroundColor()}
      color={inputColor()}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  </Stack>
);

const FormFileInput: React.FC<FormFileInputProps> = ({ label, onChange }) => (
  <Stack>
    <Text>{label}</Text>
    <Input
      type="file"
      onChange={onChange}
      accept=".jpg, .jpeg, .png, .pdf"
      borderRadius="12px"
    />
  </Stack>
);

export default ProfileUpdate;
