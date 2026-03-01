import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'user123';
    const limit = searchParams.get('limit') || '50';

    const history = await sql`
      SELECT * FROM workout_history 
      WHERE user_id = ${userId}
      ORDER BY completed_at DESC
      LIMIT ${parseInt(limit)}
    `;

    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching workout history:', error);
    return NextResponse.json({ error: 'Failed to fetch workout history' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      userId = 'user123', 
      planId, 
      planName, 
      exercisesCompleted, 
      totalExercises, 
      durationMinutes, 
      caloriesBurned, 
      notes 
    } = body;

    const result = await sql`
      INSERT INTO workout_history (
        user_id, plan_id, plan_name, exercises_completed, 
        total_exercises, duration_minutes, calories_burned, notes
      )
      VALUES (
        ${userId}, ${planId}, ${planName}, ${exercisesCompleted}, 
        ${totalExercises}, ${durationMinutes}, ${caloriesBurned}, ${notes || null}
      )
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error saving workout history:', error);
    return NextResponse.json({ error: 'Failed to save workout history' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'History ID required' }, { status: 400 });
    }

    await sql`DELETE FROM workout_history WHERE id = ${parseInt(id)}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting workout history:', error);
    return NextResponse.json({ error: 'Failed to delete workout history' }, { status: 500 });
  }
}
