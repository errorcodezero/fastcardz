<script lang="ts">
	import { CardClickable } from 'm3-svelte';
	import type { PageData } from './$types';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<h1>Cards: {data.cards.length}</h1>
{#each data.cards as card}
	<a href={`/deck/${card.id}`}
		><CardClickable type="elevated">
			<span class="text-xl">{card.front}</span>
			<br />
			<span class="text-xl">{card.back}</span>
		</CardClickable></a
	>
{/each}
