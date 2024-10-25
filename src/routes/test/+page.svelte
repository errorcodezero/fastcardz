<script lang="ts">
	// Will remove when we finish testing stuff
	import { Button, TextField } from "m3-svelte";
	import { trpc } from "$lib/trpc/client";
	import { page } from "$app/stores";
	
	let dataGetCards = $state({});
	const fetchGetCards = async () => {
		dataGetCards = await trpc($page).card.getCards.query({
			id: 0
		}).catch(() => "request failed")
	}

	let dataCreateDeck = $state({});
	const fetchCreateDeck = async () => {
		dataCreateDeck = await trpc($page).card.createDeck.query({
			name: "test deck woah"
		}).catch(() => "request failed");
	}
</script>

<TextField name="Deck ID"/>
<Button type="tonal" on:click={fetchGetCards}>getCards</Button>
<p>Data: {dataGetCards.toString()}</p>

<br/>

<TextField name="Deck Name"/>
<Button type="tonal" on:click={fetchCreateDeck}>createDeck</Button>
<p>Data: {dataCreateDeck.toString().toString()}</p>
