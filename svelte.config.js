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
				// Allow multiple origins to handle both HTTP and HTTPS
				origin:
					process.env.ALLOWED_ORIGINS?.split(',') ||
					[
						process.env.ORIGIN,
						process.env.ORIGIN?.replace('https://', 'http://'),
						process.env.ORIGIN?.replace('http://', 'https://')
					].filter(Boolean)
			}
		}),
		experimental: {
			// RPC flag
			remoteFunctions: true
		}
	}
};

export default config;
