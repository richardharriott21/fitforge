'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

interface Exercise {
  id: number;
  plan_id: number;
  exercise_name: string;
  sets: number | null;
  reps: number | null;
  duration_seconds: number | null;
  notes: string;
  order_index: number;
  video_url: string | null;
}

function WorkoutDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get('id');

  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddExercise, setShowAddExercise] = useState(false);

  useEffect(() => {
    if (planId) {
      fetchPlanDetails();
    }
  }, [planId]);

  const fetchPlanDetails = async () => {
    try {
      const [planRes, exercisesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workout-plans`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workout-exercises?planId=${planId}`)
      ]);

      const plans = await planRes.json();
      const foundPlan = plans.find((p: WorkoutPlan) => p.id === parseInt(planId!));
      setPlan(foundPlan || null);

      const exercisesData = await exercisesRes.json();
      setExercises(exercisesData);
    } catch (error) {
      console.error('Error fetching plan details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Plan not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen pb-32">
        {/* Header Image */}
        <div className="relative w-full h-64">
          {plan.image_url ? (
            <img src={plan.image_url} className="w-full h-full object-cover" alt={plan.name} />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-400 to-brand-600"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
          >
            <i className="ph ph-arrow-left text-xl"></i>
          </button>

          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs font-bold text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-full mb-2 inline-block">
              {plan.category}
            </span>
            <h1 className="text-3xl font-display font-bold text-white mb-2">{plan.name}</h1>
            <p className="text-white/90 text-sm">{plan.description}</p>
          </div>
        </div>

        {/* Plan Info */}
        <div className="px-6 py-6 bg-white -mt-4 rounded-t-3xl relative z-10">
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <i className="ph-fill ph-clock text-brand-500 text-xl"></i>
              <span className="text-sm text-slate-600">{plan.duration_minutes} min</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ph-fill ph-lightning text-brand-500 text-xl"></i>
              <span className="text-sm text-slate-600">{plan.difficulty}</span>
            </div>
          </div>

          {/* Exercises Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-bold text-dark-900">Exercises</h2>
              {plan.is_custom && (
                <button
                  onClick={() => setShowAddExercise(true)}
                  className="text-brand-500 text-sm font-medium flex items-center gap-1"
                >
                  <i className="ph ph-plus text-lg"></i> Add Exercise
                </button>
              )}
            </div>

            {exercises.length === 0 ? (
              <div className="bg-slate-50 rounded-2xl p-8 text-center">
                <i className="ph ph-barbell text-4xl text-slate-300 mb-2"></i>
                <p className="text-slate-500 text-sm">No exercises added yet</p>
                {plan.is_custom && (
                  <button
                    onClick={() => setShowAddExercise(true)}
                    className="mt-4 px-6 py-2 bg-brand-500 text-white rounded-full text-sm font-medium"
                  >
                    Add First Exercise
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {exercises.map((exercise, index) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} index={index} isCustomPlan={plan.is_custom} onDelete={fetchPlanDetails} />
                ))}
              </div>
            )}
          </div>

          {/* Start Workout Button */}
          <button
            onClick={() => router.push(`/start-workout?planId=${planId}`)}
            className="w-full bg-brand-500 text-white font-bold py-4 rounded-full shadow-lg active:scale-95 transition-transform"
          >
            Start Workout
          </button>
        </div>

        {/* Add Exercise Modal */}
        {showAddExercise && (
          <AddExerciseModal
            planId={parseInt(planId!)}
            orderIndex={exercises.length}
            onClose={() => setShowAddExercise(false)}
            onSuccess={() => {
              setShowAddExercise(false);
              fetchPlanDetails();
            }}
          />
        )}
      </div>
      <BottomNav />
    </>
  );
}

function ExerciseCard({ exercise, index, isCustomPlan, onDelete }: { exercise: Exercise; index: number; isCustomPlan: boolean; onDelete: () => void }) {
  const [deleting, setDeleting] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Delete this exercise?')) return;
    
    setDeleting(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workout-exercises?id=${exercise.id}`, { method: 'DELETE' });
      onDelete();
    } catch (error) {
      console.error('Error deleting exercise:', error);
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-slate-100 rounded-2xl p-4">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-brand-50 rounded-full flex items-center justify-center text-brand-500 font-bold text-sm flex-shrink-0">
            {index + 1}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-dark-900 mb-1">{exercise.exercise_name}</h3>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              {exercise.sets && exercise.reps && (
                <span>{exercise.sets} sets × {exercise.reps} reps</span>
              )}
              {exercise.duration_seconds && (
                <span>{Math.floor(exercise.duration_seconds / 60)}:{(exercise.duration_seconds % 60).toString().padStart(2, '0')}</span>
              )}
            </div>
            {exercise.notes && (
              <p className="text-xs text-slate-400 mt-1">{exercise.notes}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {exercise.video_url && (
              <button
                onClick={() => setShowVideo(true)}
                className="text-brand-500 hover:text-brand-600 active:scale-90 transition-transform"
              >
                <i className="ph-fill ph-play-circle text-2xl"></i>
              </button>
            )}
            {isCustomPlan && (
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="text-red-400 hover:text-red-500 active:scale-90 transition-transform"
              >
                <i className="ph ph-trash text-lg"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && exercise.video_url && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" onClick={() => setShowVideo(false)}>
          <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">{exercise.exercise_name}</h3>
              <button onClick={() => setShowVideo(false)} className="text-white text-2xl">
                <i className="ph ph-x"></i>
              </button>
            </div>
            <div className="bg-black rounded-2xl overflow-hidden aspect-video">
              <video
                src={exercise.video_url}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AddExerciseModal({ planId, orderIndex, onClose, onSuccess }: { planId: number; orderIndex: number; onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    exercise_name: '',
    sets: '',
    reps: '',
    duration_seconds: '',
    notes: '',
    video_url: '',
  });
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workout-exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan_id: planId,
          exercise_name: formData.exercise_name,
          sets: formData.sets ? parseInt(formData.sets) : null,
          reps: formData.reps ? parseInt(formData.reps) : null,
          duration_seconds: formData.duration_seconds ? parseInt(formData.duration_seconds) : null,
          notes: formData.notes,
          order_index: orderIndex,
          video_url: formData.video_url || null,
        }),
      });

      if (res.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error adding exercise:', error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-0" onClick={onClose}>
      <div 
        className="bg-white rounded-t-3xl w-full max-w-lg p-6 pb-8 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-dark-900">Add Exercise</h2>
          <button onClick={onClose} className="text-slate-400 text-2xl">
            <i className="ph ph-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Exercise Name</label>
            <input
              type="text"
              required
              value={formData.exercise_name}
              onChange={(e) => setFormData({ ...formData, exercise_name: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="e.g., Push-ups"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Sets</label>
              <input
                type="number"
                min="1"
                value={formData.sets}
                onChange={(e) => setFormData({ ...formData, sets: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Reps</label>
              <input
                type="number"
                min="1"
                value={formData.reps}
                onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="12"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Duration (seconds, optional)</label>
            <input
              type="number"
              min="1"
              value={formData.duration_seconds}
              onChange={(e) => setFormData({ ...formData, duration_seconds: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Video URL (optional)</label>
            <input
              type="url"
              value={formData.video_url}
              onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="https://example.com/video.mp4"
            />
            <p className="text-xs text-slate-400 mt-1">Add a demonstration video URL</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Notes (optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              rows={2}
              placeholder="Form tips, rest time, etc."
            />
          </div>

          <button
            type="submit"
            disabled={adding}
            className="w-full bg-brand-500 text-white font-bold py-4 rounded-full shadow-lg active:scale-95 transition-transform disabled:opacity-50"
          >
            {adding ? 'Adding...' : 'Add Exercise'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function WorkoutDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-slate-500">Loading...</p></div>}>
      <WorkoutDetailContent />
    </Suspense>
  );
}
