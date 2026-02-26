import { Router, Request, Response } from 'express';
import { supabase } from '../supabase';
import type { PetRow } from '../../src/types';

const router = Router();

/**
 * Transform a database row (with joined owner) into the frontend Pet format
 */
function transformPet(row: PetRow) {
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
 * GET /api/pets
 * Query params:
 *   - type: filter by pet type ('dog', 'cat', 'rabbit')
 *   - q: search by name or breed (case-insensitive)
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const { type, q } = req.query;

        let query = supabase
            .from('pets')
            .select('*, owners(*)')
            .order('created_at', { ascending: false });

        if (type && type !== 'all') {
            query = query.eq('type', type as string);
        }

        if (q && typeof q === 'string' && q.trim()) {
            const searchTerm = q.trim();
            query = query.or(`name.ilike.%${searchTerm}%,breed.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching pets:', error);
            return res.status(500).json({ error: error.message });
        }

        const pets = (data as PetRow[]).map(transformPet);
        return res.json(pets);
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * GET /api/pets/:id
 * Get a single pet by ID with owner info
 */
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('pets')
            .select('*, owners(*)')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return res.status(404).json({ error: 'Pet not found' });
            }
            console.error('Error fetching pet:', error);
            return res.status(500).json({ error: error.message });
        }

        const pet = transformPet(data as PetRow);
        return res.json(pet);
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * POST /api/pets
 * Create a new pet (for admin use)
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const petData = req.body;

        // Validate required fields
        const required = ['id', 'name', 'breed', 'age', 'gender', 'type', 'images'];
        for (const field of required) {
            if (!petData[field]) {
                return res.status(400).json({ error: `Missing required field: ${field}` });
            }
        }

        const { data, error } = await supabase
            .from('pets')
            .insert({
                id: petData.id,
                name: petData.name,
                breed: petData.breed,
                age: petData.age,
                weight: petData.weight || null,
                color: petData.color || null,
                gender: petData.gender,
                distance: petData.distance || null,
                location: petData.location || null,
                description: petData.description || null,
                images: petData.images,
                owner_id: petData.owner_id || null,
                health: petData.health || [],
                is_urgent: petData.is_urgent || false,
                type: petData.type,
            })
            .select('*, owners(*)')
            .single();

        if (error) {
            console.error('Error creating pet:', error);
            return res.status(500).json({ error: error.message });
        }

        const pet = transformPet(data as PetRow);
        return res.status(201).json(pet);
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
