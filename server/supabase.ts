import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.');
    console.error('   Please create a .env file with:');
    console.error('   SUPABASE_URL=your_supabase_url');
    console.error('   SUPABASE_ANON_KEY=your_supabase_anon_key');
    process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseKey);
