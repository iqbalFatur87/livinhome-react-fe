import { useNavigate } from "react-router-dom";
import CryptoAES from "crypto-js/aes";
import CryptoENC from "crypto-js/enc-utf8";
import { DATA } from "../constant/localStorage";
import { SECRET_KEY } from "../constant/secretKey";

export const generateTimestamp = (year: number, month: number = 1, date: number = 1): number => {
  const timestamp = new Date(year, month - 1, date).getTime();
  return timestamp;
};
export const convertToHumanDate = (timeStamp: string | number): string => {
  if (typeof timeStamp == "string") {
    return (
      new Date(parseInt(timeStamp)).toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) || "-"
    );
  } else {
    return (
      new Date(timeStamp).toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) || "-"
    );
  }
};
export const epocToInput = (timeStamp: string | number): string => {
  return `${new Date(timeStamp).getFullYear()}-${String(new Date(timeStamp).getMonth()).padStart(2, "0")}-${String(
    new Date(timeStamp).getDate()
  ).padStart(2, "0")}`;
};

export const convertToBillNumber = (num: number | string): string => {
  if (typeof num == "string") {
    return `Rp. ${parseInt(num, 10).toLocaleString()},-` || "-";
  } else {
    return `Rp. ${num.toLocaleString()},-` || "-";
  }
};

export const getFlavor = (): string => {
  return import.meta.env.VITE_MODE;
};

export const getDaysName = (epoc: number): string => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  var dayName = days[new Date(epoc).getDay()];
  return dayName;
};
export const getHours = (epoc: number): string => {
  return `${("0" + new Date(epoc).getHours()).slice(-2)}:${("0" + new Date(epoc).getMinutes()).slice(-2)}`;
};
export const logout = () => {
  localStorage.clear();
  location.href = "/auth/login";
};

export const authorityCheck = (errorStatus: number): void => {
  if (errorStatus === 401) {
    logout();
  } else if (errorStatus === 403) {
    const navigate = useNavigate();
    navigate("/unauthorized");
  }
};

export const encrypt = (originalData: any) => {
  return CryptoAES.encrypt(JSON.stringify(originalData), SECRET_KEY).toString();
};
export const decrypt = (originalData: string) => {
  if (typeof originalData == "string") {
    const decrypted = JSON.parse(CryptoAES.decrypt(originalData, SECRET_KEY).toString(CryptoENC));
    return decrypted;
  } else {
    return null;
  }
};

export const LOCAL_STORAGE = () => {
  try {
    return decrypt(localStorage[DATA.toString()]);
  } catch (error) {
    return null;
  }
};

export const AUTHORIZATION_HEADERS = {
  headers: {
    Accept: "application/json",
    Authorization: `${localStorage.token}`,
  },
};
