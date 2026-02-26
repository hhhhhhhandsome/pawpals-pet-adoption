import type { Pet, AdoptionRequest } from '../types';

const API_BASE = '/api';

/**
 * Fetch all pets with optional filters
 */
export async function fetchPets(params?: {
    type?: string;
    q?: string;
}): Promise<Pet[]> {
    const searchParams = new URLSearchParams();

    if (params?.type && params.type !== 'all') {
        searchParams.set('type', params.type);
    }
    if (params?.q && params.q.trim()) {
        searchParams.set('q', params.q.trim());
    }

    const queryString = searchParams.toString();
    const url = `${API_BASE}/pets${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch pets: ${response.statusText}`);
    }
    return response.json();
}

/**
 * Fetch a single pet by ID
 */
export async function fetchPetById(id: string): Promise<Pet> {
    const response = await fetch(`${API_BASE}/pets/${id}`);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Pet not found');
        }
        throw new Error(`Failed to fetch pet: ${response.statusText}`);
    }
    return response.json();
}

/**
 * Submit an adoption request
 */
export async function submitAdoptionRequest(data: {
    pet_id: string;
    applicant_name: string;
    applicant_email: string;
    applicant_phone?: string;
    message?: string;
}): Promise<AdoptionRequest> {
    const response = await fetch(`${API_BASE}/adoption-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to submit request: ${response.statusText}`);
    }
    return response.json();
}
