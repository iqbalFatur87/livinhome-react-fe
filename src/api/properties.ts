import {authedApi} from "../utils/api/client.ts";
import {PropertyDetail} from "../models/properties.ts";

export const apiGetPropertyDetail = (propertyId: string) =>
    authedApi.get<PropertyDetail>(`/property/detail-property/${propertyId}`);