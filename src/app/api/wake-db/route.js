import { NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'

export async function GET() {
	try {
		console.log('Attempting to wake up MongoDB Atlas cluster...')
		const db = await getDb()

		// Simple ping to wake up the cluster
		await db.admin().ping()

		console.log('MongoDB Atlas cluster is now active!')
		return NextResponse.json(
			{
				message: 'Database is awake and ready!',
				timestamp: new Date().toISOString(),
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error('Failed to wake up database:', error.message)
		return NextResponse.json(
			{
				error: 'Failed to wake up database',
				details: error.message,
			},
			{ status: 500 }
		)
	}
}
