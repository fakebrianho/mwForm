import Datastore from 'nedb'
import path from 'path'

// Create database instances for different collections
const db = {
	// Persistent datastore with automatic loading
	users: new Datastore({
		filename: path.join(process.cwd(), 'data/users.db'),
		autoload: true,
	}),

	// Add more collections as needed
	items: new Datastore({
		filename: path.join(process.cwd(), 'data/items.db'),
		autoload: true,
	}),
}

// Ensure indexes if needed (for faster queries)
db.users.ensureIndex({ fieldName: 'email', unique: true })

export default db
