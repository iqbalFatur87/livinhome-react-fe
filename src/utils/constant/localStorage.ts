export const TOKEN: string = import.meta.env.VITE_TOKEN;
export const REGISTER_TOKEN: string = import.meta.env.VITE_REGISTER_TOKEN;
export const REGISTER_UPLOAD: string = import.meta.env.VITE_REGISTER_UPLOAD;
export const EMAIL_VERIFICATION: string = import.meta.env.VITE_EMAIL_VERIFICATION;
export const PHONE_VERIVICATION: string = import.meta.env.VITE_PHONE_VERIVICATION;
export const OTP_VERIFICATION: string = import.meta.env.VITE_OTP_VERIFICATION;
export const SUCCESS_RESET_PASSWORD: string = import.meta.env.VITE_SUCCESS_RESET_PASSWORD;
export const SUCCESS_REGISTER: string = import.meta.env.VITE_SUCCESS_REGISTER;

export const AUTHORIZATION_HEADERS = {
  headers: {
    Authorization: `${localStorage.getItem(TOKEN)}`,
  },
};
