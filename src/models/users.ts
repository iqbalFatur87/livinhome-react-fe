import {Gender} from "./transactions.ts";

export type User = {
    id: number;
    fullname: string;
    phone_number: string;
}

export type UserRole = 'renter' | 'owner' | 'admin';

export type UserProfile = {
    id: number,
    fullname: string,
    gender: Gender,
    date_of_birth: string,
    phone_number: string,
    job: string | null,
    school_name: string | null,
    city: string | null,
    status: string | null,
    last_education: string | null,
    emergency_contact: string | null,
    photo_profile: string | null,
    id_card: string | null,
    id_card_with_person: string | null,
    roles: UserRole,
    email: string,
    email_verified_at: string | null,
    created_at: string,
    updated_at: string,
    bank: string | null,
    rekening: string | null
}
/**
 * job: undefined,
*           school_name: undefined,
*           city: undefined,
*           status: undefined,
*           last_education: undefined,
*           emergency_contact: undefined
 */
export type UserProfilePublic = Omit<
    UserProfile,
    'job' | 'school_name' | 'city' | 'status' | 'last_education' | 'emergency_contact'
>;