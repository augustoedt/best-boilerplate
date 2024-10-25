// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			app: import('$lib/server/api').api;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
