import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Log the origin for debugging CSRF issues
	console.log('=== Request Debug Info ===');
	console.log('Request URL:', event.url.toString());
	console.log('Origin header:', event.request.headers.get('origin'));
	console.log('Host header:', event.request.headers.get('host'));
	console.log('Referer header:', event.request.headers.get('referer'));
	console.log('Environment ORIGIN:', process.env.ORIGIN);
	console.log('Environment NODE_ENV:', process.env.NODE_ENV);
	console.log('================================');

	const response = await resolve(event);

	// Add CORS headers for remote functions
	if (event.url.pathname.startsWith('/$rpc/')) {
		response.headers.set('Access-Control-Allow-Origin', event.url.origin);
		response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
		response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
	}

	return response;
};
