export const SurveyStatus = {
    Pending: null,
    Approved: 1,
    Rejected: 0,
} as const;

export type SurveyStatus = typeof SurveyStatus[keyof typeof SurveyStatus];

export type Survey = {
    id: number,
    property_id: number,
    user_id: number,
    jam_mulai: string,
    jam_selesai: string,
    tanggal: string,
    status: SurveyStatus,
    is_cancel: 1 | 0,
    reason_id: number,
    deleted_at: string | null,
    created_at: string,
    updated_at: string
}