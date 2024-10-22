<script lang="ts">
	import { Button } from 'm3-svelte';
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';

	let greeting = $state('press button to do smth');

	const loadData = async () => {
		greeting = await trpc($page).card.test.query();
		console.log("ok")
	};
</script>

<div class="grid place-items-center space-y-2">
	<h1 class="text-4xl">Flashcards have never been this good</h1>
	<Button type="tonal" on:click={async () => loadData()}>Let's go</Button>
	<p>{greeting}</p>
</div>
