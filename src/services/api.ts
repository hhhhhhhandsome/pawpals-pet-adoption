import { supabase } from '../lib/supabase';
import type { Pet } from '../types';

interface PetRow {
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

function transformPet(row: PetRow): Pet {
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

/**
 * Fetch all pets with optional filters — directly from Supabase
 */
export async function fetchPets(params?: {
    type?: string;
    q?: string;
}): Promise<Pet[]> {
    let query = supabase
        .from('pets')
        .select('*, owners(*)')
        .order('created_at', { ascending: false });

    if (params?.type && params.type !== 'all') {
        query = query.eq('type', params.type);
    }

    if (params?.q && params.q.trim()) {
        const searchTerm = params.q.trim();
        query = query.or(`name.ilike.%${searchTerm}%,breed.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching pets:', error);
        throw new Error(`Failed to fetch pets: ${error.message}`);
    }

    return (data as PetRow[]).map(transformPet);
}

/**
 * Fetch a single pet by ID — directly from Supabase
 */
export async function fetchPetById(id: string): Promise<Pet> {
    const { data, error } = await supabase
        .from('pets')
        .select('*, owners(*)')
        .eq('id', id)
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            throw new Error('Pet not found');
        }
        throw new Error(`Failed to fetch pet: ${error.message}`);
    }

    return transformPet(data as PetRow);
}

/**
 * Submit an adoption request — directly to Supabase
 */
export async function submitAdoptionRequest(data: {
    pet_id: string;
    applicant_name: string;
    applicant_email: string;
    applicant_phone?: string;
    message?: string;
}) {
    // Verify pet exists
    const { data: pet, error: petError } = await supabase
        .from('pets')
        .select('id, name')
        .eq('id', data.pet_id)
        .single();

    if (petError || !pet) {
        throw new Error('Pet not found');
    }

    // Create adoption request
    const { data: result, error } = await supabase
        .from('adoption_requests')
        .insert({
            pet_id: data.pet_id,
            applicant_name: data.applicant_name,
            applicant_email: data.applicant_email,
            applicant_phone: data.applicant_phone || null,
            message: data.message || null,
            status: 'pending',
        })
        .select()
        .single();

    if (error) {
        throw new Error(`Failed to submit request: ${error.message}`);
    }

    return { ...result, pet_name: pet.name };
}
