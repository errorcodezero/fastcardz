<script lang="ts">
	import { Button, Dialog, TextField, Icon, ButtonLink } from 'm3-svelte';
	import { page } from '$app/stores';
	import iconBrush from '@ktibow/iconset-material-symbols/brush';
	import iconPlayingCards from '@ktibow/iconset-material-symbols/playing-cards';
	import iconSchool from '@ktibow/iconset-material-symbols/school';

	let open = false;
</script>

<svelte:head>
	<title>Home | Fastcardz</title>
</svelte:head>

<div class="grid place-items-center space-y-2 pt-3">
	<h1 class="text-4xl">Good Evening, {$page.data.session?.user?.name}</h1>

	<div>
		<Button iconType="left" type="tonal" on:click={() => (open = true)}
			><Icon icon={iconPlayingCards} />Create Deck</Button
		>
		<ButtonLink iconType="left" type="tonal" href="/study"
			><Icon icon={iconSchool} />Study</ButtonLink
		>
	</div>

	<Dialog headline="Create new deck" bind:open>
		<TextField name="Name" />
		<br />
		<TextField name="Description" />
		<svelte:fragment slot="buttons">
			<Button type="text">Create Manually</Button>
			<Button iconType="left" type="tonal"><Icon icon={iconBrush} />Create with AI</Button>
		</svelte:fragment>
	</Dialog>
</div>
