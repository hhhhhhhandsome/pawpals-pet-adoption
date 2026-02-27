import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase, transformPet, PetRow } from './_lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
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
    }

    if (req.method === 'POST') {
        try {
            const petData = req.body;
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
                return res.status(500).json({ error: error.message });
            }

            const pet = transformPet(data as PetRow);
            return res.status(201).json(pet);
        } catch (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
