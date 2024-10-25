
import type { Handle } from '@sveltejs/kit';
import { api, type App } from '$lib/server/api';

export const handle: Handle = async ({ event, resolve }) => {

    event.locals.app = api;

	const response = await resolve(event);
    
	return response;
};