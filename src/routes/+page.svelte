<script>
	import { NavList, NavListLink } from 'm3-svelte';
	import iconHomeOutline from "@ktibow/iconset-material-symbols/home-outline";
	import iconHome from "@ktibow/iconset-material-symbols/home";

	// <NavListLink type="auto" href="https://google.com"></NavListLink>
	// Most of this code is optimized like shit, but I am too lazy and dumb to do anything :D
</script>


<h1>Flashcards done right. They're fastcards.</h1>
<NavList type="rail">
	<NavListLink type="rail" href="/" selected={false} icon={iconHomeOutline}>Home</NavListLink>
	<NavListLink type="rail" href="/shit" selected={true} icon={iconHome}>Home</NavListLink>
</NavList>
