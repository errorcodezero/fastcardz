<script lang="ts">
	import type { PageData } from './$types';
	import { CardClickable } from 'm3-svelte';

	export let data: PageData;
</script>

<div class="grid place-items-center space-y-2">
	<h1 class="text-4xl">Jump into a study session</h1>
	<h2>Your decks:</h2>
	<div class="flex space-x-3">
		{#each data.decks as deck}
			<a href={`/card/${deck.id}`}
				><CardClickable type="elevated"><span class="text-md">{deck.name}</span></CardClickable></a
			>
		{/each}
	</div>
</div>
