<script>
	import { Button } from 'm3-svelte';
	import { signIn } from '@auth/sveltekit/client';
</script>

<div class="grid place-items-center space-y-2">
	<h1 class="text-4xl">Sign In</h1>
	<Button on:click={() => signIn('google')} type="tonal">Google</Button>
</div>
