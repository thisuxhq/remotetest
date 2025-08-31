<script lang="ts">
	let { children } = $props();
</script>

<div>
	<main>
		{@render children()}
	</main>
</div>