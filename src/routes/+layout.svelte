<script>
	import '../app.css';
	import MaterialStyle from '$lib/components/MaterialStyle.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<MaterialStyle />
{@render children?.()}
<div class="m-40"></div>
<Navbar />
