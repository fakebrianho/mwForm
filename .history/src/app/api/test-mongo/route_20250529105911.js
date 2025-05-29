import { NextResponse } from 'next/server'

export async function GET() {
	try {
		// Check if MONGODB_URI exists
		if (!process.env.MONGODB_URI) {
			return NextResponse.json(
				{
					error: 'MONGODB_URI not found in environment variables',
					suggestion: 'Create a .env.local file with MONGODB_URI',
				},
				{ status: 500 }
			)
		}

		// Show URI format (without exposing credentials)
		const uri = process.env.MONGODB_URI
		const uriInfo = {
			hasMongoPrefix: uri.startsWith('mongodb'),
			hasSRV: uri.includes('mongodb+srv'),
			hasSSL: uri.includes('ssl'),
			hasRetryWrites: uri.includes('retryWrites'),
			length: uri.length,
		}

		// Try to import and test MongoDB connection
		const { getDb } = await import('@/lib/mongodb')
		const db = await getDb()

		// Test with a simple ping
		await db.admin().ping()

		return NextResponse.json(
			{
				status: 'SUCCESS',
				message: 'MongoDB connection working!',
				uriInfo,
				timestamp: new Date().toISOString(),
			},
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json(
			{
				status: 'ERROR',
				error: error.message,
				name: error.name,
				code: error.code,
				stack: error.stack?.split('\n').slice(0, 5), // First 5 lines of stack
				timestamp: new Date().toISOString(),
			},
			{ status: 500 }
		)
	}
}
