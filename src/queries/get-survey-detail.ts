import {useQuery} from "@tanstack/react-query";
import {apiGetSurveyDetail} from "../api/surveys.ts";
import {apiGetPropertyDetail} from "../api/properties.ts";

type UseGetSurveyDetailArgs = {
    surveyId: string | undefined;
}

export function useQueryGetSurveyDetail({ surveyId }: UseGetSurveyDetailArgs) {
    return useQuery({
        queryKey: ["survey-detail", surveyId],
        queryFn: async () => {
            if (!surveyId) throw new Error('Survey ID is required');

            const surveyRes = await apiGetSurveyDetail(surveyId);
            const propertyRes = await apiGetPropertyDetail(surveyRes.data.property_id.toString());

            return Promise.resolve({
                surveyRes,
                propertyRes,
            });
        }
    })
}