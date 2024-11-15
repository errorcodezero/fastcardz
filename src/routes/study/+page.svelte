<script lang="ts">
	import deck from '$lib/fakedeck';
	import { Button, ButtonLink, Card, Dialog } from 'm3-svelte';
	let randomCard = $state(deck[Math.floor(Math.random() * deck.length)]);

	let done: number[] = [];
	let open = $state(false);
	const generate = () => {
		front = true;
		let a = Math.floor(Math.random() * deck.length);
		if (done.length >= 6) open = true;
		done.push(a);
		randomCard = deck[Math.floor(Math.random() * deck.length)];
	};

	const cont = () => {
		done = [];
		open = false;
	}

	let front = $state(true);
</script>

<div class="grid place-items-center pl-5 pr-5">
	<Card type="filled">
		<p class="text-2xl">{front ? randomCard.front : randomCard.back}</p>
		<br />
		<Button type="filled" on:click={() => (front = !front)}>Show Answer</Button>
		<br />
		<Button disabled={front} type="tonal" on:click={() => generate()}>Correct</Button>
		<br />
		<Button disabled={front} type="tonal" on:click={() => generate()}>Wrong</Button>
	</Card>

	<Dialog headline="Study Break" bind:open>
		Take a break from studying for a bit.
		<svelte:fragment slot="buttons">
			<Button type="outlined" on:click={() => cont()}>Continue</Button>
			<ButtonLink type="tonal" href="/home">Go Home</ButtonLink>
		</svelte:fragment>
	</Dialog>
</div>
