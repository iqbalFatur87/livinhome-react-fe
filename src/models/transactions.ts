import {Property} from "./properties.ts";

export const TransactionStatus = {
    Pending: null,
    Success: 1,
    Rejected: 0
} as const;

export type TransactionStatus = typeof TransactionStatus[keyof typeof TransactionStatus];

export enum Gender {
    Female = '0',
    Male  = '1',
}

export type Transaction = {
    id: number;
    user_id: number;
    booking_code: string;
    property_id: number;
    fullname: string;
    phone_number: string;
    gender: Gender;
    job: string;
    duration: string;
    marriage: null;
    number_of_renters: number;
    school_name: string;
    id_card: string;
    checkin: string;
    additional_note: null;
    status: TransactionStatus;
    bank: string | null;
    payment_date: Date | null;
    is_cancel: boolean | null;
    proof_of_payment: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export type TransactionDetail = {
    deadline: {
        date: string;
        remaining_time: string;
    },
    transaction: Transaction;
    property: Property;
}