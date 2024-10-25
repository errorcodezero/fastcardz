<script lang="ts">
	// Will remove when we finish testing stuff
	import { Button, TextField } from "m3-svelte";
	import { trpc } from "$lib/trpc/client";
	import { page } from "$app/stores";
	
	let dataGetCards = $state({});
	let dataGetInput = $state(1);
	const fetchGetCards = async () => {
		dataGetCards = await trpc($page).card.getCards.query({
			id: dataGetInput
		}).catch(() => "request failed")
	}
	
	let dataCreateDeck = $state({});
	let dataCreateInput = $state("");
	const dataCreateInputExtras = {
		type: "number"
	}
	const fetchCreateDeck = async () => {
		dataCreateDeck = await trpc($page).card.createDeck.query({
			name: "test deck"
		})
	}
</script>

<TextField name="Deck ID" extraOptions={dataCreateInputExtras}/>
<Button type="tonal" on:click={fetchGetCards}>getCards</Button>
<p>Data: {dataGetCards}</p>

<br/>

<TextField name="Deck Name" value={dataCreateInput}/>
<Button type="tonal" on:click={fetchCreateDeck}>createDeck</Button>
<p>Data: {dataCreateDeck.toString()}</p>
