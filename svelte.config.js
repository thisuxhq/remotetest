import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			protocol_header: 'X-Forwarded-Proto',
			host_header: 'X-Forwarded-Host'
		}),
		// Configure CSRF protection for production mode - moved to correct location
		csrf: {
			trustedOrigins: ['*']
		},
		experimental: {
			// RPC flag
			remoteFunctions: true
		}
	}
};

export default config;
