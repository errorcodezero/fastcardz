<script lang="ts">
	// Will remove when we finish testing stuff

	import { Button } from "m3-svelte";
	import { trpc } from "$lib/trpc/client";
	import { page } from "$app/stores";
	
	let dataGetCards = $state("");
	const fetchGetCards = async () => {
		dataGetCards = await trpc($page).card.getCards.query({
			id: 0
		}).catch(() => "request failed");
		console.log(dataGetCards.toString())
	}
</script>

<Button type="tonal" on:click={fetchGetCards}>getCards</Button>
<p>Data: {dataGetCards.toString()}</p>
