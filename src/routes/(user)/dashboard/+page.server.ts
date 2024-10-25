import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formLoginSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	if (!event.cookies.get('token')) {
		redirect(302, '/');
	}

	return {
		form: await superValidate(zod(z.object({ num: z.number().min(0).max(10) })))
	};
};
