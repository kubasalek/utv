'use server';
import { sql } from '@/lib/db';
import { getSession } from '@/lib/session';

import { getUserRoles } from '@/lib/actions/permissions';

interface personalData {
    email: string;
    phone: string;
}

interface ICEData {
    phone: string;
    label: string;
}

export async function updatePersonalData({ email, phone } : personalData) {
    throw new Error("Not implemented");
    await new Promise(r => setTimeout(r, 200));
}

export async function updateICE({ phone, label } : ICEData) {
    throw new Error("Not implemented");
    await new Promise(r => setTimeout(r, 200));
}