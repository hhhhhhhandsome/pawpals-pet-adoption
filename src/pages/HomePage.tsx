import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, MapPin, ChevronDown, Bolt, Heart, Home, MessageCircle, User, PawPrint, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchPets } from '../services/api';
import { cn } from '../lib/utils';
import type { Pet } from '../types';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'dog' | 'cat' | 'rabbit'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPets = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPets({
        type: activeCategory,
        q: searchQuery,
      });
      setPets(data);
    } catch (err) {
      console.error('Failed to load pets:', err);
      setError('Failed to load pets. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    loadPets();
  }, [loadPets]);

  // Debounced search
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = (value: string) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    const timeout = setTimeout(() => {
      setSearchQuery(value);
    }, 400);
    setSearchTimeout(timeout);
  };

  const featuredPets = pets.filter(p => p.isUrgent);

  return (
    <div className="relative mx-auto flex h-screen w-full max-w-md flex-col overflow-hidden bg-background-light shadow-2xl">
      <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar pb-24">
        {/* Header */}
        <header className="flex items-center justify-between px-6 pt-12 pb-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-primary mb-1">
              <MapPin size={16} />
              <span className="text-xs font-bold tracking-wide uppercase">San Francisco, CA</span>
              <ChevronDown size={14} />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
              Good Morning,<br />Jessica 👋
            </h2>
          </div>
          <div className="relative shrink-0">
            <div className="h-12 w-12 rounded-full border-2 border-white shadow-sm overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB09kJJC1duO_UvoFmo2-SgtyRur-kSXtERoQiV1sJCvQvKqLI6DG8Vt6nwtiZdELQcYIGZmhE2Si7ux0AnGdX4_Gsp0_4rMQY2bSxbJAP7H7Rwp_X7d6zjUwCZRqtNrW0sgC7LlyoJamma5ZzhUlKm6vwXY8R5ZF1d2x-rDnEQsjC82Q4VVnAiAMMqeQZp9dgL3STpjqMmqsxzpSKyQkFT-o7vAcJWvcWaH8FpauObvQYMiwM2b0NU8jbjZl2FFCaBTwOGbahmURtE"
                alt="User profile"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
          </div>
        </header>

        {/* Search */}
        <div className="px-6 py-2">
          <div className="group flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all focus-within:ring-2 focus-within:ring-primary/50">
            <Search className="text-gray-400 group-focus-within:text-primary" size={20} />
            <input
              type="text"
              placeholder="Search by breed, age, or name..."
              className="flex-1 bg-transparent border-none p-0 text-base placeholder:text-gray-400 focus:ring-0"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            <button className="flex items-center justify-center rounded-lg bg-primary/10 p-2 text-primary hover:bg-primary hover:text-white transition-colors">
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex w-full gap-3 overflow-x-auto px-6 py-6 no-scrollbar">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 transition-all active:scale-95",
              activeCategory === 'all' ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-white text-gray-600 shadow-sm ring-1 ring-gray-100"
            )}
          >
            <PawPrint size={18} />
            <span className="font-semibold">All</span>
          </button>
          <button
            onClick={() => setActiveCategory('dog')}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 transition-all active:scale-95",
              activeCategory === 'dog' ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-white text-gray-600 shadow-sm ring-1 ring-gray-100"
            )}
          >
            <span className="text-xl">🐶</span>
            <span className="font-medium">Dogs</span>
          </button>
          <button
            onClick={() => setActiveCategory('cat')}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 transition-all active:scale-95",
              activeCategory === 'cat' ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-white text-gray-600 shadow-sm ring-1 ring-gray-100"
            )}
          >
            <span className="text-xl">🐱</span>
            <span className="font-medium">Cats</span>
          </button>
          <button
            onClick={() => setActiveCategory('rabbit')}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 transition-all active:scale-95",
              activeCategory === 'rabbit' ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-white text-gray-600 shadow-sm ring-1 ring-gray-100"
            )}
          >
            <span className="text-xl">🐰</span>
            <span className="font-medium">Rabbits</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mx-6 rounded-2xl bg-red-50 p-6 text-center">
            <p className="text-red-600 font-medium mb-3">{error}</p>
            <button
              onClick={loadPets}
              className="rounded-full bg-red-100 px-5 py-2 text-sm font-semibold text-red-700 hover:bg-red-200 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Featured Section */}
            {featuredPets.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between px-6 mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Featured Friends</h3>
                  <button className="text-sm font-semibold text-primary">See All</button>
                </div>
                <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 no-scrollbar">
                  {featuredPets.map(pet => (
                    <Link to={`/pet/${pet.id}`} key={pet.id} className="relative shrink-0 snap-center h-64 w-64 overflow-hidden rounded-[2rem] shadow-lg group">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                      <img
                        src={pet.images[0]}
                        alt={pet.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <button className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-colors">
                        <Heart size={20} />
                      </button>
                      <div className="absolute bottom-4 left-4 z-20 text-white">
                        <h4 className="text-xl font-bold">{pet.name}</h4>
                        <p className="text-sm font-medium opacity-90">{pet.breed} • {pet.age}</p>
                        {pet.isUrgent && (
                          <div className="mt-2 inline-flex items-center rounded-md bg-primary/90 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
                            <Bolt size={12} className="mr-1" /> Urgent
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Grid Section */}
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Nearby Pets</h3>
              </div>
              {pets.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <PawPrint size={48} className="mb-3 opacity-50" />
                  <p className="text-sm font-medium">No pets found</p>
                  <p className="text-xs mt-1">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {pets.map(pet => (
                    <Link
                      to={`/pet/${pet.id}`}
                      key={pet.id}
                      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img src={pet.images[0]} alt={pet.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                        <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white hover:text-red-500 transition-colors">
                          <Heart size={16} />
                        </button>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <h4 className="truncate font-bold text-gray-900">{pet.name}</h4>
                          <div className={cn("flex items-center justify-center size-5 rounded-full", pet.gender === 'male' ? 'bg-blue-50 text-blue-400' : 'bg-pink-50 text-pink-400')}>
                            <span className="text-xs font-bold">{pet.gender === 'male' ? '♂' : '♀'}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{pet.breed}</p>
                        <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
                          <span className="text-xs font-semibold text-gray-700">{pet.age}</span>
                          <div className="flex items-center gap-0.5 text-xs text-primary">
                            <MapPin size={12} />
                            <span>{pet.distance}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
        <div className="h-20"></div>
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full glass z-50 rounded-t-3xl pb-6 pt-2">
        <div className="flex items-center justify-around px-2">
          <button className="flex flex-col items-center gap-1 p-3 text-primary">
            <Home size={24} fill="currentColor" />
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-3 text-gray-400 hover:text-gray-600 transition-colors">
            <Heart size={24} />
            <span className="text-[10px] font-medium">Favorites</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-3 text-gray-400 hover:text-gray-600 transition-colors relative">
            <div className="relative">
              <MessageCircle size={24} />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white ring-2 ring-white">2</span>
            </div>
            <span className="text-[10px] font-medium">Messages</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-3 text-gray-400 hover:text-gray-600 transition-colors">
            <User size={24} />
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
