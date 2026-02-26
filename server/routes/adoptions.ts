import { Router, Request, Response } from 'express';
import { supabase } from '../supabase';

const router = Router();

/**
 * POST /api/adoption-requests
 * Submit a new adoption request
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        const { pet_id, applicant_name, applicant_email, applicant_phone, message } = req.body;

        // Validate required fields
        if (!pet_id || !applicant_name || !applicant_email) {
            return res.status(400).json({
                error: 'Missing required fields: pet_id, applicant_name, applicant_email',
            });
        }

        // Verify pet exists
        const { data: pet, error: petError } = await supabase
            .from('pets')
            .select('id, name')
            .eq('id', pet_id)
            .single();

        if (petError || !pet) {
            return res.status(404).json({ error: 'Pet not found' });
        }

        // Create adoption request
        const { data, error } = await supabase
            .from('adoption_requests')
            .insert({
                pet_id,
                applicant_name,
                applicant_email,
                applicant_phone: applicant_phone || null,
                message: message || null,
                status: 'pending',
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating adoption request:', error);
            return res.status(500).json({ error: error.message });
        }

        return res.status(201).json({
            ...data,
            pet_name: pet.name,
        });
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * GET /api/adoption-requests
 * Get all adoption requests (optionally filter by pet_id or status)
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const { pet_id, status } = req.query;

        let query = supabase
            .from('adoption_requests')
            .select('*, pets(id, name, breed, images)')
            .order('created_at', { ascending: false });

        if (pet_id) {
            query = query.eq('pet_id', pet_id as string);
        }

        if (status) {
            query = query.eq('status', status as string);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching adoption requests:', error);
            return res.status(500).json({ error: error.message });
        }

        return res.json(data);
    } catch (err) {
        console.error('Unexpected error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
