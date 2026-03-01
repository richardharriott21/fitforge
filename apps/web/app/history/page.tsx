'use client';

import { useEffect, useState } from 'react';
import { Calendar, Clock, Flame, TrendingUp, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface WorkoutHistoryItem {
  id: number;
  plan_name: string;
  exercises_completed: number;
  total_exercises: number;
  duration_minutes: number;
  calories_burned: number;
  completed_at: string;
  notes: string | null;
}

export default function WorkoutHistory() {
  const [history, setHistory] = useState<WorkoutHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalMinutes: 0,
    totalCalories: 0,
    thisWeek: 0
  });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workout-history?userId=user123`);
      const data = await res.json();
      setHistory(data);
      
      // Calculate stats
      const totalWorkouts = data.length;
      const totalMinutes = data.reduce((sum: number, w: WorkoutHistoryItem) => sum + (w.duration_minutes || 0), 0);
      const totalCalories = data.reduce((sum: number, w: WorkoutHistoryItem) => sum + (w.calories_burned || 0), 0);
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const thisWeek = data.filter((w: WorkoutHistoryItem) => new Date(w.completed_at) > oneWeekAgo).length;
      
      setStats({ totalWorkouts, totalMinutes, totalCalories, thisWeek });
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteWorkout = async (id: number) => {
    if (!confirm('Delete this workout from history?')) return;
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workout-history?id=${id}`, {
        method: 'DELETE'
      });
      fetchHistory();
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <h1 className="text-3xl font-bold mb-2">Workout History</h1>
        <p className="text-blue-100">Track your fitness journey</p>
      </div>

      {/* Stats Cards */}
      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium">Total Workouts</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalWorkouts}</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-medium">This Week</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.thisWeek}</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-orange-600 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium">Total Minutes</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalMinutes}</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-red-600 mb-1">
            <Flame className="w-4 h-4" />
            <span className="text-xs font-medium">Calories Burned</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalCalories}</p>
        </div>
      </div>

      {/* History List */}
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Recent Workouts</h2>
        
        {history.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No workouts completed yet</p>
            <p className="text-sm text-gray-500 mt-1">Start a workout to track your progress!</p>
          </div>
        ) : (
          history.map((workout) => (
            <div key={workout.id} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{workout.plan_name}</h3>
                  <p className="text-xs text-gray-500">
                    {format(new Date(workout.completed_at), 'MMM d, yyyy • h:mm a')}
                  </p>
                </div>
                <button
                  onClick={() => deleteWorkout(workout.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>{workout.exercises_completed}/{workout.total_exercises} exercises</span>
                </div>
                {workout.duration_minutes && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{workout.duration_minutes} min</span>
                  </div>
                )}
                {workout.calories_burned && (
                  <div className="flex items-center gap-1 text-gray-600">
                    <Flame className="w-4 h-4" />
                    <span>{workout.calories_burned} cal</span>
                  </div>
                )}
              </div>
              
              {workout.notes && (
                <p className="text-sm text-gray-600 mt-2 italic">"{workout.notes}"</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
