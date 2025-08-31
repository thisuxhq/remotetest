import { command, getRequestEvent } from '$app/server';

export const simulateAIGeneration = command('unchecked', async (payload) => {
	const { request } = getRequestEvent();
	const origin = request.headers.get('origin');
	console.log('origin :', origin);

	return {
		enhancedText: 'This is a simulated AI generation: ' + payload.text
	};
});
