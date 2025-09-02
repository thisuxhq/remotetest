import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Handle Railway proxy headers for proper origin detection
	const forwardedProto = event.request.headers.get('x-forwarded-proto');
	const forwardedHost = event.request.headers.get('x-forwarded-host');

	// Reconstruct the actual URL when behind Railway proxy
	if (forwardedProto && forwardedHost) {
		const actualOrigin = `${forwardedProto}://${forwardedHost}`;

		// Create a new request with proper origin header if it's missing
		if (!event.request.headers.get('origin')) {
			const headers = new Headers(event.request.headers);
			headers.set('origin', actualOrigin);

			// Create new request with corrected headers
			const newRequest = new Request(event.request, { headers });
			event.request = newRequest;
		}

		// Also ensure the URL reflects the correct protocol and host
		if (event.url.protocol !== forwardedProto + ':' || event.url.host !== forwardedHost) {
			event.url = new URL(event.url.pathname + event.url.search, actualOrigin);
		}
	}

	// Log the origin for debugging CSRF issues
	console.log('=== Request Debug Info ===');
	console.log('Request URL:', event.url.toString());
	console.log('Origin header:', event.request.headers.get('origin'));
	console.log('Host header:', event.request.headers.get('host'));
	console.log('Referer header:', event.request.headers.get('referer'));
	console.log('Environment ORIGIN:', process.env.ORIGIN);
	console.log('Environment NODE_ENV:', process.env.NODE_ENV);
	console.log('X-Forwarded-Proto header:', event.request.headers.get('x-forwarded-proto'));
	console.log('X-Forwarded-Host header:', event.request.headers.get('x-forwarded-host'));
	console.log('================================');

	const response = await resolve(event);

	// Add security headers
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	return response;
};
