'use client';

import { useState, useEffect } from 'react';
import BottomNav from '@/app/components/BottomNav';

type Goal = {
  id: number;
  goal_type: string;
  target_value: number;
  target_unit: string;
  current_value: number;
  start_date: string;
  target_date: string;
  is_active: boolean;
};

const goalTypes = [
  { value: 'weight_loss', label: 'Weight Loss', unit: 'kg', icon: 'ph-scales' },
  { value: 'weight_gain', label: 'Weight Gain', unit: 'kg', icon: 'ph-trend-up' },
  { value: 'workout_streak', label: 'Workout Streak', unit: 'days', icon: 'ph-fire' },
  { value: 'total_workouts', label: 'Total Workouts', unit: 'workouts', icon: 'ph-trophy' },
  { value: 'calories_burned', label: 'Calories Burned', unit: 'kcal', icon: 'ph-lightning' },
  { value: 'pushups', label: 'Push-ups Goal', unit: 'reps', icon: 'ph-barbell' },
];

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    goal_type: 'weight_loss',
    target_value: '',
    target_date: '',
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals`);
      const data = await res.json();
      if (data.success) {
        setGoals(data.goals);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async () => {
    if (!newGoal.target_value || !newGoal.target_date) {
      alert('Please fill all fields');
      return;
    }

    const selectedGoalType = goalTypes.find(g => g.value === newGoal.goal_type);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal_type: newGoal.goal_type,
          target_value: parseInt(newGoal.target_value),
          target_unit: selectedGoalType?.unit,
          target_date: newGoal.target_date,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setGoals([data.goal, ...goals]);
        setShowAddModal(false);
        setNewGoal({ goal_type: 'weight_loss', target_value: '', target_date: '' });
      }
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const handleUpdateProgress = async (id: number, currentValue: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, current_value: currentValue }),
      });

      const data = await res.json();
      if (data.success) {
        setGoals(goals.map(g => (g.id === id ? data.goal : g)));
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const handleDeleteGoal = async (id: number) => {
    if (!confirm('Are you sure you want to delete this goal?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success) {
        setGoals(goals.filter(g => g.id !== id));
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const getGoalInfo = (goalType: string) => {
    return goalTypes.find(g => g.value === goalType) || goalTypes[0];
  };

  const getProgressPercentage = (goal: Goal) => {
    return Math.min(100, Math.round((goal.current_value / goal.target_value) * 100));
  };

  const getDaysRemaining = (targetDate: string) => {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pb-24">
        <div className="text-slate-400">Loading goals...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-500 to-brand-600 text-white px-6 pt-12 pb-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold">My Goals</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <i className="ph-bold ph-plus text-xl"></i>
          </button>
        </div>
        <p className="text-white/80 text-sm">Track your fitness journey</p>
      </div>

      {/* Goals List */}
      <div className="px-6 py-6 space-y-4">
        {goals.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <i className="ph-duotone ph-target text-6xl text-slate-300 mb-4"></i>
            <p className="text-slate-500 mb-4">No goals yet. Set your first goal!</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 transition-colors"
            >
              Add Goal
            </button>
          </div>
        ) : (
          goals.map((goal) => {
            const goalInfo = getGoalInfo(goal.goal_type);
            const progress = getProgressPercentage(goal);
            const daysLeft = getDaysRemaining(goal.target_date);

            return (
              <div key={goal.id} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
                      <i className={`${goalInfo.icon} text-2xl text-brand-600`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{goalInfo.label}</h3>
                      <p className="text-xs text-slate-500">
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <i className="ph ph-trash text-xl"></i>
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">
                      {goal.current_value} / {goal.target_value} {goal.target_unit}
                    </span>
                    <span className="text-sm font-semibold text-brand-600">{progress}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-brand-600 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Update Progress */}
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Update progress"
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const value = parseInt((e.target as HTMLInputElement).value);
                        if (value >= 0) {
                          handleUpdateProgress(goal.id, value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      const value = parseInt(input.value);
                      if (value >= 0) {
                        handleUpdateProgress(goal.id, value);
                        input.value = '';
                      }
                    }}
                    className="px-4 py-2 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-colors"
                  >
                    <i className="ph-bold ph-check text-lg"></i>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4">
          <div className="bg-white rounded-t-3xl w-full max-w-lg p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Add New Goal</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <i className="ph ph-x text-2xl"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Goal Type
                </label>
                <select
                  value={newGoal.goal_type}
                  onChange={(e) => setNewGoal({ ...newGoal, goal_type: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500"
                >
                  {goalTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Target Value ({goalTypes.find(g => g.value === newGoal.goal_type)?.unit})
                </label>
                <input
                  type="number"
                  value={newGoal.target_value}
                  onChange={(e) => setNewGoal({ ...newGoal, target_value: e.target.value })}
                  placeholder="e.g., 10"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Target Date
                </label>
                <input
                  type="date"
                  value={newGoal.target_date}
                  onChange={(e) => setNewGoal({ ...newGoal, target_date: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500"
                />
              </div>

              <button
                onClick={handleAddGoal}
                className="w-full py-4 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 transition-colors"
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
