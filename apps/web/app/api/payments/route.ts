import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { sql as sqlTemplate } from '../utils/sql';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, status, paymentIntentId, userId } = await request.json();

    const result = await sql(
      sqlTemplate`
        INSERT INTO payments (user_id, amount, currency, status, payment_intent_id, created_at)
        VALUES (${userId || 'default-user'}, ${amount}, ${currency}, ${status}, ${paymentIntentId}, NOW())
        RETURNING *
      `
    );

    return NextResponse.json(result[0]);
  } catch (error: any) {
    console.error('Error saving payment:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save payment' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'default-user';

    const result = await sql(
      sqlTemplate`
        SELECT * FROM payments 
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
      `
    );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}
