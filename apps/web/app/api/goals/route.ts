import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const goals = await sql`SELECT * FROM user_goals WHERE is_active = true ORDER BY created_at DESC`;
    return NextResponse.json({ success: true, goals });
  } catch (error) {
    console.error('Error fetching goals:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch goals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { goal_type, target_value, target_unit, target_date } = body;

    const result = await sql`
      INSERT INTO user_goals (goal_type, target_value, target_unit, target_date, is_active)
      VALUES (${goal_type}, ${target_value}, ${target_unit}, ${target_date}, true)
      RETURNING *
    `;

    return NextResponse.json({ success: true, goal: result[0] });
  } catch (error) {
    console.error('Error creating goal:', error);
    return NextResponse.json({ success: false, error: 'Failed to create goal' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, current_value } = body;

    const result = await sql`
      UPDATE user_goals
      SET current_value = ${current_value}
      WHERE id = ${id}
      RETURNING *
    `;

    return NextResponse.json({ success: true, goal: result[0] });
  } catch (error) {
    console.error('Error updating goal:', error);
    return NextResponse.json({ success: false, error: 'Failed to update goal' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    await sql`
      UPDATE user_goals
      SET is_active = false
      WHERE id = ${id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting goal:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete goal' }, { status: 500 });
  }
}
