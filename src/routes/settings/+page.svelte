<script>
	import { signOut } from '@auth/sveltekit/client';
	import { Button, Dialog, LinearProgressIndeterminate } from 'm3-svelte';

	const clearUserData = () => {
		loading = true;
	};

	$effect(() => {
		if (loading == true) {
			setTimeout(() => loaded = true, 6000);
			signOut();
		}
	});

	let loaded = $state(false);
	let open = $state(false);
	let loading = $state(false);
</script>

<div class="grid place-items-center pt-3">
	<Button type="tonal" on:click={() => open = true}>Delete User Data</Button>
</div>

<Dialog headline="Confirm Data Deletion" bind:open>
	<p>YOU CAN'T UNDO THIS!! YOU WILL LOSE ALL USER DATA.</p>
	<br/>
	<Button type="tonal" on:click={() => open = false}>Exit</Button>
	<Button type="outlined" on:click={() => clearUserData()}>Confirm</Button>
	{#if loading}
		{#if !loaded}
			Deleting...
			<LinearProgressIndeterminate />
		{/if}
	{/if}
</Dialog>
