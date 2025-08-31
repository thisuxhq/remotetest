import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: { 
		adapter: adapter({
			// Configure CSRF protection for production
			csrf: {
				checkOrigin: true,
				// Allow the origin to be determined from environment variables
				// You can also provide an array of allowed origins
				origin: process.env.ORIGIN || process.env.ALLOWED_ORIGINS?.split(',') || undefined
			}
		}),
		experimental: {
			// RPC flag
			remoteFunctions: true
		}
	 }
};

export default config;
