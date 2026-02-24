import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const plans = await sql`
      SELECT * FROM workout_plans ORDER BY created_at DESC
    `;
    return NextResponse.json(plans);
  } catch (error) {
    console.error('Error fetching workout plans:', error);
    return NextResponse.json({ error: 'Failed to fetch workout plans' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, category, difficulty, duration_minutes, image_url } = await request.json();
    
    if (!name || !category || !difficulty || !duration_minutes) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO workout_plans (name, description, category, difficulty, duration_minutes, image_url, is_custom)
      VALUES (${name}, ${description || ''}, ${category}, ${difficulty}, ${duration_minutes}, ${image_url || ''}, true)
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error('Error creating workout plan:', error);
    return NextResponse.json({ error: 'Failed to create workout plan' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Plan ID required' }, { status: 400 });
    }

    await sql`DELETE FROM workout_plans WHERE id = ${id} AND is_custom = true`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting workout plan:', error);
    return NextResponse.json({ error: 'Failed to delete workout plan' }, { status: 500 });
  }
}
