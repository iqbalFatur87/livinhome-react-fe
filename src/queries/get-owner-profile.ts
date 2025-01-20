import {useQuery} from "@tanstack/react-query";
import {apiGetOwnerProfile} from "../api/profile.ts";

export function useGetQueryOwnerProfile() {
    return useQuery({
        queryKey: ['profile', 'owner'],
        queryFn: async () => {
            return await apiGetOwnerProfile();
        }
    })
}