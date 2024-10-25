import type { Actions, PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
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

export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.set('token', '', {
			maxAge: 0,
			path: '/'
		});
		redirect(302, '/');
	}
};
