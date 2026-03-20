import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { isAdminAuthenticated } from '@/lib/auth'

// PATCH — update booking status (new → contacted → confirmed → cancelled)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!await isAdminAuthenticated())
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { status } = await req.json()
  const { data, error } = await supabaseAdmin
    .from('bookings')
    .update({ status })
    .eq('id', params.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}