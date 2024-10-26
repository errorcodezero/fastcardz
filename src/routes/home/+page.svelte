<script lang="ts">
	import type { PageData } from './$types';
	import { CardClickable, Button } from 'm3-svelte';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="grid place-items-center space-y-2">
	<h1 class="text-4xl">Jump into a study session</h1>
	<div class="flex space-x-3">
		{#each data.decks as deck}
			<a href={`/deck/${deck.id}`}
				><CardClickable type="elevated">
					<span class="text-xl">{deck.name}</span>
				</CardClickable></a
			>
		{/each}
	</div>

	<Button
		type="tonal"
		on:click={() =>
			trpc($page).card.createDeck.mutate({
				name: 'testDeck'
			})}>Make test deck</Button
	>
</div>
