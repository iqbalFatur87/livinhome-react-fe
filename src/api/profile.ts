import {authedApi} from "../utils/api/client.ts";
import {UserProfile} from "../models/users.ts";

export const apiOwnerProfileUpdateProfilePhoto = async (img: File) => {
    const formData = new FormData();
    formData.append('image', img);

    return authedApi.post<string>('/profile/owner/update-image', formData);
}

export const apiOwnerProfileUpdateKtp = async (img: File) => {
    const formData = new FormData();
    formData.append('id_card', img);

    return authedApi.post<string>('/profile/owner/update-ktp', formData);
}

export const apiGetOwnerProfile = async () => {
    return authedApi.get<UserProfile>('/profile/owner');
}