import { command } from '$app/server';

export const simulateAIGeneration = command('unchecked', async (payload) => {
	return {
		enhancedText: 'This is a simulated AI generation: ' + payload.text
	};
});
