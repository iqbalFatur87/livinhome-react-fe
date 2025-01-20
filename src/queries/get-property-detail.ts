import {useQuery} from "@tanstack/react-query";
import {apiGetPropertyDetail} from "../api/properties.ts";

type UseGetPropertyDetailArgs = {
    propertyId: string | undefined;
}

export function useQueryGetPropertyDetail({ propertyId}: UseGetPropertyDetailArgs) {
    return useQuery({
        queryKey: ["property-detail", propertyId],
        queryFn: async () => {
            if (!propertyId) throw new Error('Property ID is required');

            return await apiGetPropertyDetail(propertyId);
        }
    })
}