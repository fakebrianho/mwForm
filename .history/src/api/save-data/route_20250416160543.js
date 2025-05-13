import { NextResponse } from 'next/server'
import { insert, find } from '@/lib/dbHelpers'

export async function GET() {
	try {
		const users = await find('users')
		return NextResponse.json(users)
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}

export async function POST(request) {
	try {
		const userData = await request.json()
		const newUser = await insert('users', userData)
		return NextResponse.json(newUser, { status: 201 })
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
