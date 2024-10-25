import type { Actions, PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formRegisterSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formRegisterSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formRegisterSchema));

		const app = event.locals.app

		if (!form.valid) {
			return fail(400, {
				form,
				error: 'Invalid form'
			});
		}

		const { data, error } = await app.api.auth.register.post({
			email: form.data.email,
			password: form.data.password
		});

		console.log(data, error);

		if (error) {
			return fail(401, {
				error: error.value
			});
		}

		return {
			form,
			data: {
				id: data.id
			}
		};
	}
};
