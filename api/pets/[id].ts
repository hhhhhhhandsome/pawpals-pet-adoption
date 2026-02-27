import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase, transformPet, PetRow } from '../_lib/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { id } = req.query;

        const { data, error } = await supabase
            .from('pets')
            .select('*, owners(*)')
            .eq('id', id as string)
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
}
