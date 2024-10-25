import type { Actions, PageServerLoad } from './$types.js';
import { message, superValidate } from 'sveltekit-superforms';
import type { App } from '$lib/server/api';
import { treaty } from '@elysiajs/eden';
import { formLoginSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	if (event.cookies.get('token')) {
		// redirect to dashboard page
		return redirect(302, '/dashboard');
	}

	return {
		form: await superValidate(zod(formLoginSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formLoginSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const values = form.data;

		const app = treaty<App>('localhost:5173');

		const { data, error } = await app.api.auth.login.post({
			email: values.email,
			password: values['current-password']
		});

		if (error) {
			return fail(error.status, {
				form,
				error: error.value
			});
		}

		// cookie time of 30 mins
		event.cookies.set('token', data.token, {
			httpOnly: true,
			sameSite: 'lax',
			secure: true,
			expires: new Date(Date.now() + 30 * 60 * 1000),
			path: '/'
		});

		return message(form, 'Login successful');
	}
};
