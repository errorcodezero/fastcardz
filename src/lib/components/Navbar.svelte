<script lang="ts">
	import { NavList, NavListLink } from 'm3-svelte';
	import iconHomeOutline from '@ktibow/iconset-material-symbols/home-outline';
	import iconHome from '@ktibow/iconset-material-symbols/home';
	import iconPerson from '@ktibow/iconset-material-symbols/person';
	import iconPersonOutline from '@ktibow/iconset-material-symbols/person-outline';
	import type { IconifyIcon } from '@iconify/types';
	import { page } from '$app/stores';

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
			href: '/'
		},
		{
			name: 'Log In',
			icon: iconPersonOutline,
			selectedIcon: iconPerson,
			href: '/auth'
		}
	];
</script>

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
	</NavList>
</div>
