import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const planId = searchParams.get('planId');

    if (!planId) {
      return NextResponse.json({ error: 'Plan ID required' }, { status: 400 });
    }

    const exercises = await sql`
      SELECT * FROM workout_exercises WHERE plan_id = ${planId} ORDER BY order_index ASC
    `;
    
    return NextResponse.json(exercises);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return NextResponse.json({ error: 'Failed to fetch exercises' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { plan_id, exercise_name, sets, reps, duration_seconds, notes, order_index, video_url } = await request.json();

    if (!plan_id || !exercise_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO workout_exercises (plan_id, exercise_name, sets, reps, duration_seconds, notes, order_index, video_url)
      VALUES (${plan_id}, ${exercise_name}, ${sets || null}, ${reps || null}, ${duration_seconds || null}, ${notes || ''}, ${order_index || 0}, ${video_url || null})
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error adding exercise:', error);
    return NextResponse.json({ error: 'Failed to add exercise' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Exercise ID required' }, { status: 400 });
    }

    await sql`DELETE FROM workout_exercises WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting exercise:', error);
    return NextResponse.json({ error: 'Failed to delete exercise' }, { status: 500 });
  }
}
