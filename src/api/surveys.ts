import {authedApi} from "../utils/api/client.ts";
import {Survey} from "../models/surveys.ts";

export const apiGetSurveyDetail = (surveyId: string) =>
    authedApi.get<Survey>(`/survey/detail/${surveyId}`);