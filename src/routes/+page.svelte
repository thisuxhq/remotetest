<script lang="ts">
import { enhanceText } from '../lib/remote/auth.remote';

let inputText = '';
let enhancedText = '';
let loading = false;
let error = '';

async function handleEnhance() {
	loading = true;
	error = '';
	enhancedText = '';
	try {
		const result = await enhanceText({ text: inputText });
		enhancedText = result.enhancedText;
	} catch (e) {
		if (e instanceof Error) {
			error = e.message;
		} else {
			error = 'Failed to enhance text.';
		}
	} finally {
		loading = false;
	}
}
</script>

<main>
	<h1>Text Enhancer</h1>
	<textarea bind:value={inputText} rows="5" cols="50" placeholder="Enter text to enhance..."></textarea>
	<br>
	<button onclick={handleEnhance} disabled={loading || !inputText}>Enhance</button>
	{#if loading}
		<p>Enhancing...</p>
	{/if}
	{#if error}
		<p style="color: red">{error}</p>
	{/if}
	{#if enhancedText}
		<h2>Enhanced Text</h2>
		<div style="white-space: pre-wrap; border: 1px solid #ccc; padding: 1em;">{enhancedText}</div>
	{/if}
</main>
