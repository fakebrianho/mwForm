import { NextResponse } from 'next/server'
import { insert, find } from '@/lib/dbHelpers'
import { getDb } from '@/lib/mongodb'

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
		console.log('userdata', userData)
		const db = await getDb()
		const collection = db.collection('user_collection')
		const newUser = await collection.insertOne(userData)
		return NextResponse.json(newUser, { status: 201 })
	} catch (error) {
		console.log('err', error)
		return NextResponse.json({ error: error.message }, { status: 500 })
	}
}
