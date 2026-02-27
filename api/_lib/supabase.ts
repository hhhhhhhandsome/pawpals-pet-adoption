import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY env vars');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PetRow {
    id: string;
    name: string;
    breed: string;
    age: string;
    weight?: string | null;
    color?: string | null;
    gender: string;
    distance?: string | null;
    location?: string | null;
    description?: string | null;
    images: string[];
    owners?: { name: string; role?: string; image?: string } | null;
    health: string[];
    is_urgent: boolean;
    type: string;
}

export function transformPet(row: PetRow) {
    return {
        id: row.id,
        name: row.name,
        breed: row.breed,
        age: row.age,
        weight: row.weight ?? undefined,
        color: row.color ?? undefined,
        gender: row.gender,
        distance: row.distance ?? '',
        location: row.location ?? '',
        description: row.description ?? '',
        images: row.images,
        owner: row.owners
            ? {
                name: row.owners.name,
                role: row.owners.role ?? '',
                image: row.owners.image ?? '',
            }
            : { name: 'Unknown', role: '', image: '' },
        health: row.health,
        isUrgent: row.is_urgent,
        type: row.type,
    };
}
