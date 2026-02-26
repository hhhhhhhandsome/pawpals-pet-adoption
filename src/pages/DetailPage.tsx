import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Heart, MapPin, MessageCircle, CheckCircle2, BriefcaseMedical, Home, PawPrint, User, Loader2, X, Send } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPetById, submitAdoptionRequest } from '../services/api';
import { cn } from '../lib/utils';
import type { Pet } from '../types';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAdoptModal, setShowAdoptModal] = useState(false);
  const [adoptForm, setAdoptForm] = useState({
    applicant_name: '',
    applicant_email: '',
    applicant_phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchPetById(id)
      .then(setPet)
      .catch((err) => {
        console.error('Failed to fetch pet:', err);
        setError('Failed to load pet details.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdoptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pet) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitAdoptionRequest({
        pet_id: pet.id,
        ...adoptForm,
      });
      setSubmitSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center max-w-md mx-auto bg-background-light">
        <Loader2 size={40} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 max-w-md mx-auto bg-background-light">
        <p className="text-red-500 font-medium">{error || 'Pet not found'}</p>
        <button
          onClick={() => navigate(-1)}
          className="rounded-full bg-primary px-6 py-2.5 text-white font-semibold hover:brightness-105 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light shadow-2xl">
      {/* Header Actions */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 pt-12 bg-gradient-to-b from-black/40 to-transparent">
        <button
          onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}
          className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition hover:bg-white/30 active:scale-95"
        >
          <ArrowLeft size={24} />
        </button>
        <button className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white transition hover:bg-white/30 active:scale-95 group">
          <Heart size={24} className="group-active:fill-primary group-active:text-primary transition-colors" />
        </button>
      </div>

      {/* Hero Image Carousel */}
      <div className="relative w-full h-[45vh] shrink-0">
        <div
          className="flex h-full w-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
          onScroll={(e) => {
            const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
            const width = (e.target as HTMLDivElement).clientWidth;
            setCurrentImageIndex(Math.round(scrollLeft / width));
          }}
        >
          {pet.images.map((img, idx) => (
            <div key={idx} className="w-full h-full shrink-0 snap-center bg-gray-200 relative">
              <img src={img} alt={`${pet.name} ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
        {/* Pagination Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {pet.images.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "h-2 rounded-full transition-all duration-300 shadow-sm",
                currentImageIndex === idx ? "w-6 bg-primary" : "w-2 bg-white/60 backdrop-blur-sm"
              )}
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative -mt-6 flex-1 rounded-t-[2rem] bg-background-light px-6 pt-8 pb-32"
      >
        {/* Header Info */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{pet.name}</h1>
            <div className="flex items-center gap-1 mt-1 text-slate-500">
              <MapPin size={18} />
              <p className="text-sm font-medium">{pet.location} • {pet.distance} away</p>
            </div>
          </div>
          <div className={cn("flex items-center justify-center size-10 rounded-full", pet.gender === 'male' ? 'bg-blue-50 text-blue-500' : 'bg-pink-50 text-pink-500')}>
            <span className="text-xl font-bold">{pet.gender === 'male' ? '♂' : '♀'}</span>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="flex flex-col items-center justify-center py-4 px-2 rounded-full bg-slate-200 shadow-sm border border-slate-100">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Age</span>
            <div className="w-8 h-[2px] bg-white my-1"></div>
            <span className="text-sm font-bold text-slate-900">{pet.age}</span>
          </div>
          <div className="flex flex-col items-center justify-center py-4 px-2 rounded-full bg-slate-200 shadow-sm border border-slate-100">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Weight</span>
            <div className="w-8 h-[2px] bg-white my-1"></div>
            <span className="text-sm font-bold text-slate-900">{pet.weight || 'N/A'}</span>
          </div>
          <div className="flex flex-col items-center justify-center py-4 px-2 rounded-full bg-slate-200 shadow-sm border border-slate-100">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Color</span>
            <div className="w-8 h-[2px] bg-white my-1"></div>
            <span className="text-sm font-bold text-slate-900">{pet.color || 'N/A'}</span>
          </div>
        </div>

        {/* Pet Owner / Shelter */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-full flex items-center justify-between p-2 rounded-full bg-slate-200 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full overflow-hidden border-2 border-white bg-primary/20 shadow-sm flex items-center justify-center">
                <img
                  src={pet.owner.image || `https://i.pravatar.cc/200?u=${encodeURIComponent(pet.owner.name)}`}
                  alt={pet.owner.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://i.pravatar.cc/200?u=${encodeURIComponent(pet.owner.name)}`;
                  }}
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{pet.owner.name}</h3>
                <p className="text-[10px] text-slate-500">{pet.owner.role}</p>
              </div>
            </div>
            <button className="p-2 mr-1 rounded-full bg-white border border-primary text-primary hover:bg-primary/10 transition-colors">
              <MessageCircle size={18} />
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">About {pet.name}</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            {pet.description}
          </p>
        </div>

        {/* Health Badges */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Health & Details</h2>
          <div className="flex flex-wrap gap-2">
            {pet.health.map((item, idx) => (
              <div
                key={idx}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2",
                  item === 'Vaccinated' && "bg-green-50 text-green-700",
                  item === 'Neutered' && "bg-blue-50 text-blue-700",
                  item === 'House Trained' && "bg-orange-50 text-orange-700"
                )}
              >
                {item === 'Vaccinated' && <CheckCircle2 size={18} />}
                {item === 'Neutered' && <BriefcaseMedical size={18} />}
                {item === 'House Trained' && <Home size={18} />}
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Map Preview */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Location</h2>
          <div className="w-full h-40 rounded-2xl bg-slate-200 overflow-hidden relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuASlWN7paJ0pYY612YTsmLLNjnVCuH2MC3mZwl8PfbDyHmUVtIYLxGYi5VFd5O-wsc3IE85z84w0WGUoJEIM_t56F6uYz8ufFYb6iwbh277p8qYwLO03mRFnIfPQ_owItaBBGk-kAWgNaM1sYSqR3w65xF8OnbkZ22Ed9CddnALZD9JcXm5-9C-B_w6iywMGUDt--LAUMBAu0m5jt4M1w8e0Hu3YH_V1jyP_X24R2gw4fHRWI4fvnizmYDcOsa_cfKF_kqGPfQdx2E7"
              alt="Map"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                <div className="size-4 rounded-full bg-primary border-2 border-white shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-10 max-w-md mx-auto">
        <div className="h-12 w-full bg-gradient-to-t from-background-light via-background-light/80 to-transparent pointer-events-none"></div>
        <div className="bg-background-light px-6 pb-8 pt-2 flex gap-4">
          <button className="flex-1 h-14 rounded-xl border-2 border-slate-200 bg-transparent text-slate-900 font-bold text-base hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
            Contact
          </button>
          <button
            onClick={() => setShowAdoptModal(true)}
            className="flex-[2] h-14 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <PawPrint size={20} fill="currentColor" />
            Adopt Me
          </button>
        </div>
      </div>

      {/* Adoption Request Modal */}
      <AnimatePresence>
        {showAdoptModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => !submitting && setShowAdoptModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md rounded-t-[2rem] bg-white p-6 pt-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  {submitSuccess ? '🎉 Request Sent!' : `Adopt ${pet.name}`}
                </h2>
                <button
                  onClick={() => {
                    setShowAdoptModal(false);
                    setSubmitSuccess(false);
                    setSubmitError(null);
                  }}
                  className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {submitSuccess ? (
                <div className="text-center py-6">
                  <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-50">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <p className="text-slate-600 mb-6">
                    Your adoption request for <strong>{pet.name}</strong> has been submitted successfully!
                    The shelter will contact you soon.
                  </p>
                  <button
                    onClick={() => {
                      setShowAdoptModal(false);
                      setSubmitSuccess(false);
                    }}
                    className="w-full h-12 rounded-xl bg-primary text-white font-bold hover:brightness-105 transition"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAdoptSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={adoptForm.applicant_name}
                      onChange={(e) => setAdoptForm(prev => ({ ...prev, applicant_name: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={adoptForm.applicant_email}
                      onChange={(e) => setAdoptForm(prev => ({ ...prev, applicant_email: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={adoptForm.applicant_phone}
                      onChange={(e) => setAdoptForm(prev => ({ ...prev, applicant_phone: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
                    <textarea
                      rows={3}
                      value={adoptForm.message}
                      onChange={(e) => setAdoptForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition resize-none"
                      placeholder="Tell us why you'd like to adopt this pet..."
                    />
                  </div>

                  {submitError && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-14 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <Send size={18} />
                        Submit Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
