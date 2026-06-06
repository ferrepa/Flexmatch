/**
 * Seed-Script: Befüllt MongoDB Atlas mit den Beispieljobs.
 * Ausführen mit: node scripts/seed.js
 */
import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { jobs } from '../src/lib/jobs.js';

const uri = process.env.MONGODB_URI;
if (!uri) {
	console.error('❌ MONGODB_URI fehlt in .env');
	process.exit(1);
}

const client = new MongoClient(uri);

try {
	await client.connect();
	console.log('✅ Verbunden mit MongoDB Atlas');

	const db = client.db('flexmatchDB');
	const collection = db.collection('jobs');

	// Bestehende Jobs löschen
	await collection.deleteMany({});
	console.log('🗑  Alte Jobs gelöscht');

	// Jobs ohne id-Feld einfügen (MongoDB vergibt _id)
	const jobsToInsert = jobs.map(({ id, ...rest }) => rest);
	const result = await collection.insertMany(jobsToInsert);
	console.log(`✅ ${result.insertedCount} Jobs eingefügt`);

	// Eingefügte IDs anzeigen
	Object.values(result.insertedIds).forEach((id, i) => {
		console.log(`   Job ${i + 1}: ${id.toString()}`);
	});
} catch (err) {
	console.error('❌ Fehler:', err.message);
} finally {
	await client.close();
	console.log('🔌 Verbindung geschlossen');
}
