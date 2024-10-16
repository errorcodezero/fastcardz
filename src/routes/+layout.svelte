<script>
	import '../app.css';
	import MaterialStyle from '$lib/components/MaterialStyle.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<MaterialStyle />
<slot />
<div class="m-40"></div>
<Navbar />
