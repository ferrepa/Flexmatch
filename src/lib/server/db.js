import { MongoClient, ObjectId } from 'mongodb';
import crypto from 'node:crypto';
import { jobs as staticJobs } from '$lib/jobs.js';

// process.env funktioniert zuverlässiger in Netlify Functions als $env/static/private
const MONGODB_URI = process.env.MONGODB_URI;

let client;
let db;

async function getDb() {
	if (!MONGODB_URI) return null; // Kein URI -> Fallback / kein Persistieren
	if (!client) {
		client = new MongoClient(MONGODB_URI, {
			serverSelectionTimeoutMS: 5000,
			connectTimeoutMS: 5000
		});
		await client.connect();
		db = client.db('flexmatchDB');
	}
	return db;
}

/** Gibt alle Jobs zurück – MongoDB Atlas, mit Fallback auf statische Jobdaten. */
export async function getAllJobs() {
	try {
		const database = await getDb();
		if (!database) return staticJobs;
		const docs = await database.collection('jobs').find({}).toArray();
		if (!docs.length) return staticJobs;
		return docs.map((doc) => ({ ...doc, id: doc._id.toString(), _id: undefined }));
	} catch (err) {
		console.warn('[db] MongoDB nicht erreichbar – Fallback auf statische Jobdaten:', err.message);
		return staticJobs;
	}
}

/** Gibt einen Job anhand der ID zurück, oder null – mit Fallback. */
export async function getJobById(id) {
	try {
		const database = await getDb();
		if (!database) return staticJobs.find((j) => j.id === id) ?? null;
		let doc = null;
		try {
			doc = await database.collection('jobs').findOne({ _id: new ObjectId(id) });
		} catch {
			return staticJobs.find((j) => j.id === id) ?? null;
		}
		if (!doc) return staticJobs.find((j) => j.id === id) ?? null;
		return { ...doc, id: doc._id.toString(), _id: undefined };
	} catch (err) {
		console.warn('[db] MongoDB nicht erreichbar – Fallback:', err.message);
		return staticJobs.find((j) => j.id === id) ?? null;
	}
}

/** Speichert eine Bewerbung in der Datenbank. Gibt null zurück, wenn keine DB verfügbar ist. */
export async function createBewerbung(bewerbung) {
	const database = await getDb();
	if (!database) return null;
	const result = await database.collection('bewerbungen').insertOne({
		...bewerbung,
		status: 'In Prüfung',
		datum: new Date()
	});
	return result.insertedId.toString();
}

// ------- Authentifizierung (Prototyp) -------
function hashPw(password) {
	return crypto.createHash('sha256').update(password).digest('hex');
}

/** Legt einen neuen Benutzer an. { ok:true } oder { ok:false, error }. */
export async function createUser({ name, email, password }) {
	const database = await getDb();
	if (!database) throw new Error('Keine Datenbank verfügbar');
	const existing = await database.collection('users').findOne({ email });
	if (existing) return { ok: false, error: 'Diese E-Mail ist bereits registriert.' };
	await database.collection('users').insertOne({
		name,
		email,
		passwordHash: hashPw(password),
		createdAt: new Date()
	});
	return { ok: true };
}

/** Prüft Login-Daten. Gibt { email, name } zurück oder null. */
export async function verifyUser(email, password) {
	const database = await getDb();
	if (!database) return null;
	const u = await database.collection('users').findOne({ email });
	if (u && u.passwordHash === hashPw(password)) return { email: u.email, name: u.name };
	return null;
}
