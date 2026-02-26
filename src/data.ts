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
  health: string[];
  isUrgent?: boolean;
  type: 'dog' | 'cat' | 'rabbit';
}

export const PETS: Pet[] = [
  {
    id: 'mochi',
    name: 'Mochi',
    breed: 'Golden Retriever',
    age: '2 Yrs',
    weight: '24 kg',
    color: 'Gold',
    gender: 'male',
    distance: '2.5 km',
    location: 'San Francisco, CA',
    description: "Mochi is a bundle of sunshine wrapped in golden fur! He loves belly rubs, playing fetch in the park, and cuddling on rainy days. He's very friendly with kids and other dogs, though he can be a bit shy with cats at first. He is house-trained and knows basic commands like \"sit\" and \"stay\".",
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAind7AR2i2xqDlt9PWSLX3XzVs7nuiiJtLbyvjqWLR0UvLaV_pVR28LShj8NrtdG_8dF9JTWIlb6lB3g8cYy3dEls6_DZhCZI8m03M742byujjPfKYogv1LI6f1swzs-UMIaaYODsVwM9_EvGNC8H4hVbkv5VFI-nEtIY33nTZhFpWuaZwWih0nSXwpJvein8d902RVh5Mf2aeilNj4nG9GaWTKC7aHoGQmhUl1rKiZxic6DLL0jFroPDh-r7UFEsai3z4ZzzAXJ7A',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAdofUr6mP-1AejTl9CyyO0W02214aTKL0FIPr60yUz5aneSjxo3GTnBFCKlfUPLX3N3GGOe1Epy3Va3aSu3kG7ri3gugPJnxrkVTX-RA2hEmOAnIHb_sCy_LPganGSlfOVvBfiQ3ESGBCu0ayPACS5M0GhJgF99uK555JgydZDz_JDa5tETEWrmewlJL8XkBvlFb1SalVhSnMiWD_hAQ-i3Jld6hLI3i7iJiZ3rhbS2YzoFL3792IsvcciqYuLDHcklhjbKeLRfP45',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDmD-aCmFBV8n7sLf3yiG0yiQAYsC1iQmKWJAPOqErMvdc_kgcU35STXfKhYt66BpEnJOmro9t4l_pM243sZ2Wwl3nge30CqdsdjXfkfuOmLKd3Z48CetFZ2gqg-kZlm0oF-F_6UpdoGldSVylJaD43t5sdrtsnX_rOFVr_ImGIbfhUN3vP98nPSgF9TRD4eJapGWBtD-8-ipf9uEj2VoYA7trSTr00_n0HcmlD-6RsHS76O_XA5bXFZhblsp2PL4-ECUcjSt_uIdZQ'
    ],
    owner: {
      name: 'Sarah Jenkins',
      role: 'Owner • Paws Shelter',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpWVc_H5yLMm1OukUADe5kAiDj_OHtjxP3dUBOniAtAH6eGgn4nABkcB-lZbyiAEEFeFUSWafvx4ajqXB_f7EMI6K0QUan-Z7KYPf410IGJ-qOsKBhqGGkjD-y0tW9r_o_5wgHIWmurscbR1ZyHppQ2Eh76GqtemVUjH-cKIWom8tKcHdcNduM5sqNtoBOZaO1dGMES0aIj83XlxD_LoDMMsqqwY89KrqbeHPrXb4cymcngN40cl_ZbaESVViVGcjDeTqlZnOQDlx'
    },
    health: ['Vaccinated', 'Neutered', 'House Trained'],
    isUrgent: true,
    type: 'dog'
  },
  {
    id: 'bella',
    name: 'Bella',
    breed: 'Golden Retriever',
    age: '2 Yrs',
    gender: 'female',
    distance: '2.5 km',
    location: 'San Francisco, CA',
    description: "Bella is a sweet and energetic girl looking for an active family.",
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAWcE0Hy2oTZb2IsFnL6zMDuGrYLpMGxuj0uN7eLDKb1farREuSZPcmMdofk1G3y5-8xJPunmLdXAHT2HAy1tC8YFDklfMWHebfRP-f3OjN9Mc7o3prqSHEsSfbvlqW8IHos8Lmjw4yG-tNaJTrW8sRR08KoCx4m4gKxJCvFDHOcnrYN-OFxFHoZhHppbOmrTaoDhSkeQ4553JBrGf4EeCUqY_B9a8ctqWf6HZxdLBHenuvdyXQDeX0e-CQitU3u1A0AHS1FyAQ0mtN'],
    owner: {
      name: 'Sarah Jenkins',
      role: 'Owner • Paws Shelter',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpWVc_H5yLMm1OukUADe5kAiDj_OHtjxP3dUBOniAtAH6eGgn4nABkcB-lZbyiAEEFeFUSWafvx4ajqXB_f7EMI6K0QUan-Z7KYPf410IGJ-qOsKBhqGGkjD-y0tW9r_o_5wgHIWmurscbR1ZyHppQ2Eh76GqtemVUjH-cKIWom8tKcHdcNduM5sqNtoBOZaO1dGMES0aIj83XlxD_LoDMMsqqwY89KrqbeHPrXb4cymcngN40cl_ZbaESVViVGcjDeTqlZnOQDlx'
    },
    health: ['Vaccinated'],
    isUrgent: true,
    type: 'dog'
  },
  {
    id: 'luna',
    name: 'Luna',
    breed: 'Siamese',
    age: '1 Yr',
    gender: 'female',
    distance: '5.0 km',
    location: 'San Francisco, CA',
    description: "Luna is a graceful Siamese cat who loves quiet afternoons.",
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDS0A44ZFNQLlkz05cI5teee7GX7PXWrkL6UAJ6iy9sY5stNtz8vbVunfdB1wIRtWZHm7xZZAFcrSzeMFDxNPabVHDsqniyN44ciCmiJzmBZmqICk7Bkb5Cqy8PzLYBJwbFZ7gZY_uN1lXCFJtMJ5tASLAx2HnEwxm-E-JgHkG1mOiUwzYjDz-eD5cDRYgCT1Bl6MMavZzmE4r1DW6kRkaGiPtzC8M6d-uBw5B-dn1oR3r7Yj_0zQRoSG2ZhH33wwE65JE28z3sewyz'],
    owner: {
      name: 'Sarah Jenkins',
      role: 'Owner • Paws Shelter',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpWVc_H5yLMm1OukUADe5kAiDj_OHtjxP3dUBOniAtAH6eGgn4nABkcB-lZbyiAEEFeFUSWafvx4ajqXB_f7EMI6K0QUan-Z7KYPf410IGJ-qOsKBhqGGkjD-y0tW9r_o_5wgHIWmurscbR1ZyHppQ2Eh76GqtemVUjH-cKIWom8tKcHdcNduM5sqNtoBOZaO1dGMES0aIj83XlxD_LoDMMsqqwY89KrqbeHPrXb4cymcngN40cl_ZbaESVViVGcjDeTqlZnOQDlx'
    },
    health: ['Vaccinated'],
    type: 'cat'
  },
  {
    id: 'max',
    name: 'Max',
    breed: 'French Bulldog',
    age: '3 mos',
    gender: 'male',
    distance: '2.5 km',
    location: 'San Francisco, CA',
    description: "Max is a playful puppy with a big heart.",
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDr0RkHPlek06Q6lm_S_xrQ3gMDg_cRKoDnFYOnNLsyuvg8fuLiMixVcLKrc0KqCHTYOMyoRSWmbnFCH7-ZVTzVi8hIv3dE2wBM9HO6sRqRmNJcFNV7_sBFDLZDv_X6raTtMUZtfL9PaqKGOxba1_GM8TAWyxoUUrq5dj7R2ubbRPZdBRxHLQc-InyBJySFtLakCEqxwX-atyBulwlvVKokjg9CW5wI3hgJihr8mjJz1bI3OrW239OeaizeQwocF7jZjl4PqktLHbEs'],
    owner: {
      name: 'Sarah Jenkins',
      role: 'Owner • Paws Shelter',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpWVc_H5yLMm1OukUADe5kAiDj_OHtjxP3dUBOniAtAH6eGgn4nABkcB-lZbyiAEEFeFUSWafvx4ajqXB_f7EMI6K0QUan-Z7KYPf410IGJ-qOsKBhqGGkjD-y0tW9r_o_5wgHIWmurscbR1ZyHppQ2Eh76GqtemVUjH-cKIWom8tKcHdcNduM5sqNtoBOZaO1dGMES0aIj83XlxD_LoDMMsqqwY89KrqbeHPrXb4cymcngN40cl_ZbaESVViVGcjDeTqlZnOQDlx'
    },
    health: ['Vaccinated'],
    type: 'dog'
  },
  {
    id: 'oreo',
    name: 'Oreo',
    breed: 'Dutch Rabbit',
    age: '6 mos',
    gender: 'male',
    distance: '10 km',
    location: 'San Francisco, CA',
    description: "Oreo is a fluffy rabbit who loves carrots.",
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDtmX-bgeLhf9Ag3sFLkvyXzVOGvOx1PLsJiatLXLp78uAmsdSG-4rl8CQNVbCIYk_V83qyQc20HcOZe6j37xfJuGfHfJmvoHP9aLleuHCeTYDHarc1h23X5q5BFVnEE-bMIeunwmk5q-Osc53jnZQZrujVLNN3Ne1CJF_Z9uOSg0AhULCtIbDIJ8zskZSXzYxdI7cc5ZLFJzXG3ds4spWdVDrg1xfrtcdHSfk9JSr1S_CYVU9_UuYhZA1hIUmbL53nWkvcDG-kRsl9'],
    owner: {
      name: 'Sarah Jenkins',
      role: 'Owner • Paws Shelter',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpWVc_H5yLMm1OukUADe5kAiDj_OHtjxP3dUBOniAtAH6eGgn4nABkcB-lZbyiAEEFeFUSWafvx4ajqXB_f7EMI6K0QUan-Z7KYPf410IGJ-qOsKBhqGGkjD-y0tW9r_o_5wgHIWmurscbR1ZyHppQ2Eh76GqtemVUjH-cKIWom8tKcHdcNduM5sqNtoBOZaO1dGMES0aIj83XlxD_LoDMMsqqwY89KrqbeHPrXb4cymcngN40cl_ZbaESVViVGcjDeTqlZnOQDlx'
    },
    health: ['Vaccinated'],
    type: 'rabbit'
  },
  {
    id: 'daisy',
    name: 'Daisy',
    breed: 'Beagle Mix',
    age: '4 yrs',
    gender: 'female',
    distance: '1.2 km',
    location: 'San Francisco, CA',
    description: "Daisy is a friendly beagle mix who gets along with everyone.",
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBNhZKJaojWMIReETxNcxdSDkTry2Pk-bt71F2oSa-1P-g9kMR4g-fGCPdZgD30cXt8a9r_f15TzQN7EB-QLSED9uyT2k4RBYCV_VP97un3kskqvD-5yxa-t65cNKVSz_rcewVHftN6hovePU9uILimT9QFd54e2Gt5DXROGRTzG-7hjkO3DLDuYkUVbUZYU0RSsRqqzdMgrUE0Cwb7RK5JXP5TAVRBq8XoqBLN9ZTYKnA-ytZcHo-rZWq0uRny4yTK8ovC4yJzRVd5'],
    owner: {
      name: 'Sarah Jenkins',
      role: 'Owner • Paws Shelter',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpWVc_H5yLMm1OukUADe5kAiDj_OHtjxP3dUBOniAtAH6eGgn4nABkcB-lZbyiAEEFeFUSWafvx4ajqXB_f7EMI6K0QUan-Z7KYPf410IGJ-qOsKBhqGGkjD-y0tW9r_o_5wgHIWmurscbR1ZyHppQ2Eh76GqtemVUjH-cKIWom8tKcHdcNduM5sqNtoBOZaO1dGMES0aIj83XlxD_LoDMMsqqwY89KrqbeHPrXb4cymcngN40cl_ZbaESVViVGcjDeTqlZnOQDlx'
    },
    health: ['Vaccinated'],
    type: 'dog'
  },
  {
    id: 'milo',
    name: 'Milo',
    breed: 'Tabby',
    age: '2 mos',
    gender: 'male',
    distance: '6 km',
    location: 'San Francisco, CA',
    description: "Milo is a tiny tabby kitten full of energy.",
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuARFdZDVO9HHc0SlYIGPCGiZLTn0WONnsG8-vYpb4GV9G8OIg4RH1938zOvtJKyQMJV5VI8boThKj8e8f6OAdHvm0Yud8PVOM_HYRxnlI5H4R51DStbLWY76AlmTreju5GKWOvyWIRRZNstwkR7SeUYk0awQGn6ojOTN3rBDtkJHZQ_JGT6uz13HRj1pNoeeifDiUJCq83P70lI2Nap4U9FUGGstaVkzKtwiHVjbOEM3PRJDnPipMzoZVDGBoSZq6QVMjyDZlThKIfw'],
    owner: {
      name: 'Sarah Jenkins',
      role: 'Owner • Paws Shelter',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpWVc_H5yLMm1OukUADe5kAiDj_OHtjxP3dUBOniAtAH6eGgn4nABkcB-lZbyiAEEFeFUSWafvx4ajqXB_f7EMI6K0QUan-Z7KYPf410IGJ-qOsKBhqGGkjD-y0tW9r_o_5wgHIWmurscbR1ZyHppQ2Eh76GqtemVUjH-cKIWom8tKcHdcNduM5sqNtoBOZaO1dGMES0aIj83XlxD_LoDMMsqqwY89KrqbeHPrXb4cymcngN40cl_ZbaESVViVGcjDeTqlZnOQDlx'
    },
    health: ['Vaccinated'],
    type: 'cat'
  }
];
