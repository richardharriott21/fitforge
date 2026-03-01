'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ActiveSessionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'Full Body Blast';
  
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [startTime] = useState(Date.now());
  const [showCompletion, setShowCompletion] = useState(false);

  const exercises = [
    { name: 'Jumping Jacks', duration: 45, rest: 15, type: 'Warm Up' },
    { name: 'Push Ups', reps: 15, rest: 30, type: 'Set 1' },
    { name: 'Squats', reps: 20, rest: 30, type: 'Set 1' },
    { name: 'Plank Hold', duration: 45, rest: 30, type: 'Set 1' },
    { name: 'Mountain Climbers', duration: 40, rest: 30, type: 'Set 2' },
    { name: 'Lunges', reps: 12, rest: 30, type: 'Set 2' },
    { name: 'Burpees', reps: 10, rest: 30, type: 'Set 2' },
    { name: 'Cool Down Stretch', duration: 60, rest: 0, type: 'Cool Down' }
  ];

  const currentEx = exercises[currentExercise];

  useEffect(() => {
    if (isPaused || !currentEx.duration) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentExercise, isPaused, currentEx]);

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setTimeRemaining(exercises[currentExercise + 1].duration || 45);
      setIsPaused(false);
    } else {
      completeWorkout();
    }
  };

  const completeWorkout = async () => {
    // Save to workout history
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/workout-history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user123',
          planId: null,
          planName: planName,
          exercisesCompleted: currentExercise + 1,
          totalExercises: exercises.length,
          durationMinutes: Math.floor((Date.now() - startTime) / 60000),
          caloriesBurned: Math.floor((Date.now() - startTime) / 60000) * 8,
          notes: ''
        })
      });
    } catch (error) {
      console.error('Error saving workout history:', error);
    }
    
    setShowCompletion(true);
  };

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex flex-col items-center justify-center p-6 text-white">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-6">
            <i className="ph-fill ph-check text-6xl"></i>
          </div>
          <h1 className="text-4xl font-bold mb-3">Workout Complete!</h1>
          <p className="text-white/80 mb-2">Great job finishing your session</p>
          <p className="text-2xl font-bold mb-8">{Math.floor((Date.now() - startTime) / 60000)} minutes</p>
          
          <div className="space-y-3">
            <button
              onClick={() => router.push('/history')}
              className="w-full bg-white text-blue-600 rounded-full py-4 font-bold shadow-lg hover:scale-105 transition-transform"
            >
              View History
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full py-4 font-bold"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 text-white pb-8">
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <button 
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
        >
          <i className="ph ph-x text-xl"></i>
        </button>
        <div className="text-center">
          <p className="text-sm text-white/80">Exercise {currentExercise + 1}/{exercises.length}</p>
          <p className="text-xs text-white/60">{currentEx.type}</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
          <i className="ph ph-gear text-xl"></i>
        </button>
      </div>

      {/* Timer/Reps Display */}
      <div className="flex flex-col items-center justify-center py-8">
        {currentEx.duration ? (
          <>
            <div className="relative w-64 h-64 mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="16"
                  fill="none"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke="white"
                  strokeWidth="16"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 112}`}
                  strokeDashoffset={`${2 * Math.PI * 112 * (1 - timeRemaining / currentEx.duration)}`}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl font-bold">{timeRemaining}</div>
                  <div className="text-sm text-white/60">seconds</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center mb-8">
            <div className="text-8xl font-bold">{currentEx.reps}</div>
            <div className="text-xl text-white/80">reps</div>
          </div>
        )}

        <h2 className="text-3xl font-bold text-center mb-4">{currentEx.name}</h2>
        
        {currentEx.rest > 0 && (
          <p className="text-white/70 text-sm">Rest: {currentEx.rest}s after this exercise</p>
        )}
      </div>

      {/* Exercise Animation/Image Placeholder */}
      <div className="mx-6 mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 flex items-center justify-center border border-white/10">
          <i className="ph-fill ph-person-simple-throw text-8xl text-white/40"></i>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 space-y-3">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-full bg-white text-blue-600 rounded-full py-5 font-bold text-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
        >
          <i className={`ph-fill ${isPaused ? 'ph-play' : 'ph-pause'} text-2xl`}></i>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        
        <button
          onClick={nextExercise}
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full py-5 font-bold text-lg"
        >
          {currentExercise === exercises.length - 1 ? 'Finish Workout' : 'Next Exercise'}
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {exercises.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentExercise 
                ? 'bg-white w-6' 
                : idx < currentExercise 
                ? 'bg-white/60' 
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ActiveSessionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    }>
      <ActiveSessionContent />
    </Suspense>
  );
}
