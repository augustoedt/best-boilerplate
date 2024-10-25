
import type { Handle } from '@sveltejs/kit';
import { treatyApi, type App } from '$lib/server/api';

export const handle: Handle = async ({ event, resolve }) => {

    event.locals.app = treatyApi;

	const response = await resolve(event);
    
	return response;
};