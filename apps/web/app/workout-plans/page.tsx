'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/app/components/BottomNav';

interface WorkoutPlan {
  id: number;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  duration_minutes: number;
  image_url: string;
  is_custom: boolean;
}

export default function WorkoutPlansPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All Plans');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workout-plans`);
      const data = await res.json();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlans = filter === 'All Plans' 
    ? plans 
    : plans.filter(plan => plan.category === filter.toUpperCase());

  const customPlans = filteredPlans.filter(p => p.is_custom);
  const defaultPlans = filteredPlans.filter(p => !p.is_custom);

  return (
    <>
      <div className="pt-[55px] relative min-h-screen pb-32">
        {/* Header */}
        <header className="flex items-center justify-between px-6 mb-6">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-0.5">Explore</p>
            <h1 className="text-3xl font-display font-bold text-dark-900">Workout Plans</h1>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
          >
            <i className="ph ph-plus text-xl"></i>
          </button>
        </header>

        <main className="w-full">
          {/* Filter Chips */}
          <section className="mb-8">
            <div className="flex items-center gap-3 px-6 overflow-x-auto no-scrollbar">
              {['All Plans', 'Yoga', 'Cardio', 'Strength', 'HIIT'].map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap ${
                    filter === category
                      ? 'bg-dark-900 text-white shadow-md'
                      : 'bg-white text-slate-500 border border-slate-100 active:bg-slate-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Custom Plans */}
          {customPlans.length > 0 && (
            <section className="px-6 space-y-5 mb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-bold text-dark-900">My Custom Plans</h3>
              </div>
              {customPlans.map((plan) => (
                <WorkoutPlanCard 
                  key={plan.id} 
                  plan={plan} 
                  onDelete={() => {
                    fetchPlans();
                  }}
                />
              ))}
            </section>
          )}

          {/* Default Plans */}
          <section className="px-6 space-y-5">
            {customPlans.length > 0 && (
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-bold text-dark-900">Recommended</h3>
              </div>
            )}
            {loading ? (
              <p className="text-slate-500 text-center">Loading...</p>
            ) : defaultPlans.length === 0 ? (
              <p className="text-slate-500 text-center">No plans found</p>
            ) : (
              defaultPlans.map((plan) => (
                <WorkoutPlanCard key={plan.id} plan={plan} />
              ))
            )}
          </section>

          <div className="h-10"></div>
        </main>

        {/* Create Plan Modal */}
        {showCreateModal && (
          <CreatePlanModal 
            onClose={() => setShowCreateModal(false)} 
            onSuccess={() => {
              setShowCreateModal(false);
              fetchPlans();
            }}
          />
        )}

        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-overlay" 
             style={{ backgroundImage: 'url(\'https://grainy-gradients.vercel.app/noise.svg\')' }}>
        </div>
      </div>
      <BottomNav />
    </>
  );
}

function WorkoutPlanCard({ plan, onDelete }: { plan: WorkoutPlan; onDelete?: () => void }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this workout plan?')) return;
    
    setDeleting(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workout-plans?id=${plan.id}`, { method: 'DELETE' });
      onDelete?.();
    } catch (error) {
      console.error('Error deleting plan:', error);
      setDeleting(false);
    }
  };

  const categoryColors: Record<string, string> = {
    YOGA: 'text-brand-500 bg-brand-50',
    CARDIO: 'text-blue-500 bg-blue-50',
    STRENGTH: 'text-purple-500 bg-purple-50',
    HIIT: 'text-orange-500 bg-orange-50',
  };

  return (
    <div 
      onClick={() => router.push(`/workout-detail?id=${plan.id}`)}
      className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 active:scale-[0.98] transition-transform"
    >
      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
        {plan.image_url && (
          <img src={plan.image_url} className="w-full h-full object-cover" alt={plan.name} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md mb-2 inline-block ${categoryColors[plan.category] || 'text-slate-500 bg-slate-50'}`}>
              {plan.category}
            </span>
            <h4 className="font-bold text-dark-900 text-lg leading-tight truncate">{plan.name}</h4>
          </div>
          {plan.is_custom ? (
            <button 
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-400 text-xl hover:text-red-500 active:scale-90 transition-transform"
            >
              <i className="ph-fill ph-trash"></i>
            </button>
          ) : (
            <i className="ph-fill ph-check-circle text-slate-200 text-xl"></i>
          )}
        </div>
        <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <i className="ph-fill ph-clock text-slate-300"></i> {plan.duration_minutes} min
          </span>
          <span className="flex items-center gap-1">
            <i className="ph-fill ph-lightning text-slate-300"></i> {plan.difficulty}
          </span>
        </div>
      </div>
    </div>
  );
}

function CreatePlanModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'STRENGTH',
    difficulty: 'Medium',
    duration_minutes: 30,
    image_url: '',
  });
  const [creating, setCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workout-plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating plan:', error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-0" onClick={onClose}>
      <div 
        className="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-8 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-dark-900">Create Workout Plan</h2>
          <button onClick={onClose} className="text-slate-400 text-2xl">
            <i className="ph ph-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Plan Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="e.g., Morning Strength"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              rows={3}
              placeholder="Describe your workout plan..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="STRENGTH">Strength</option>
              <option value="CARDIO">Cardio</option>
              <option value="YOGA">Yoga</option>
              <option value="HIIT">HIIT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Duration (minutes)</label>
            <input
              type="number"
              required
              min="5"
              max="180"
              value={formData.duration_minutes}
              onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Image URL (optional)</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="https://..."
            />
          </div>

          <button
            type="submit"
            disabled={creating}
            className="w-full bg-brand-500 text-white font-bold py-4 rounded-full shadow-lg active:scale-95 transition-transform disabled:opacity-50"
          >
            {creating ? 'Creating...' : 'Create Plan'}
          </button>
        </form>
      </div>
    </div>
  );
}
