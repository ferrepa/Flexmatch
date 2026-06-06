import { getAllJobs } from '$lib/server/db.js';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (!locals.user) redirect(303, '/login');
	const jobs = await getAllJobs();
	return { jobs };
}
