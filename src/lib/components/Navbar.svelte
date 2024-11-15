<script lang="ts">
	import { NavList, NavListLink, NavListButton } from 'm3-svelte';
	import iconHomeOutline from '@ktibow/iconset-material-symbols/home-outline';
	import iconHome from '@ktibow/iconset-material-symbols/home';
	import iconPerson from '@ktibow/iconset-material-symbols/person';
	import iconPersonOutline from '@ktibow/iconset-material-symbols/person-outline';
	import iconPlayingCards from '@ktibow/iconset-material-symbols/playing-cards'
	import iconPlayingCardsOutline from '@ktibow/iconset-material-symbols/playing-cards-outline'
	import iconLogOut from '@ktibow/iconset-material-symbols/logout'
	import type { IconifyIcon } from '@iconify/types';
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';

	interface Route {
		href: string;
		name: string;
		icon: IconifyIcon;
		selectedIcon: IconifyIcon;
	}
	const routes: Route[] = [
		{
			name: 'Home',
			icon: iconHomeOutline,
			selectedIcon: iconHome,
			href: '/home'
		},
		{
			name: 'Study',
			icon: iconPlayingCardsOutline,
			selectedIcon: iconPlayingCards,
			href: '/study'
		},
		{
			name: 'Settings',
			icon: iconPersonOutline,
			selectedIcon: iconPerson,
			href: '/settings'
		},
	];
</script>

{#if $page.data.session}
	<div class="fixed inset-x-0 bottom-0">
		<NavList type="bar">
			{#each routes as route}
				<NavListLink
					type="bar"
					href={route.href}
					selected={$page.url.pathname === route.href}
					icon={route.icon}>{route.name}</NavListLink
				>
			{/each}
			<NavListButton on:click={() => signOut()} selected={false} type="bar" icon={iconLogOut}>
				Sign Out
			</NavListButton>
		</NavList>
	</div>
{/if}
