export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  weight?: string;
  color?: string;
  gender: 'male' | 'female';
  distance: string;
  location: string;
  description: string;
  images: string[];
  owner: {
    name: string;
    role: string;
    image: string;
  };
  owner_id?: string;
  health: string[];
  isUrgent?: boolean;
  is_urgent?: boolean;
  type: 'dog' | 'cat' | 'rabbit';
}

export interface PetRow {
  id: string;
  name: string;
  breed: string;
  age: string;
  weight: string | null;
  color: string | null;
  gender: 'male' | 'female';
  distance: string | null;
  location: string | null;
  description: string | null;
  images: string[];
  owner_id: string | null;
  health: string[];
  is_urgent: boolean;
  type: 'dog' | 'cat' | 'rabbit';
  created_at: string;
  owners?: {
    id: string;
    name: string;
    role: string | null;
    image: string | null;
  };
}

export interface AdoptionRequest {
  id?: string;
  pet_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone?: string;
  message?: string;
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
}
