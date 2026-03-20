import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'
import { isAdminAuthenticated } from '@/lib/auth'

// GET — public, returns all active classes
export async function GET() {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .eq('active', true)
    .order('time')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST — admin only, create a new class
export async function POST(req: NextRequest) {
  if (!await isAdminAuthenticated())
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { data, error } = await supabaseAdmin
    .from('classes')
    .insert([body])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}