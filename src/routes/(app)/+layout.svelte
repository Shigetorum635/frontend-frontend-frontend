<script>
	import 'carbon-components-svelte/css/g100.css';
	import '../../app.css';
	import {
		Header,
		SideNav,
		SideNavItems,
		SideNavMenu,
		SideNavMenuItem,
		SideNavLink,
		SideNavDivider,
		HeaderNav,
		HeaderNavItem,
		SkipToContent,
		HeaderNavMenu,
		Content
	} from 'carbon-components-svelte';
	import { env } from '$env/dynamic/public';
	import {
		Fade,
		LogoGithub,
		LogoDiscord,
		User,
		Logout,
		Forum,
		Home,
		Earth,
		Login
	} from 'carbon-icons-svelte';
	import { user } from '../../stores/user';
	import { onMount } from 'svelte';
	onMount(async () => {
		const response = await fetch(`${env.PUBLIC_URL}:${env.PUBLIC_PORT}/user/me`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				credentials: 'same-origin',
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok || response.status != 200) return;
		const data = await response.json();
		console.log(data);

		user.set(data.user);
	});
	let isSideNavOpen = false;
	const logout = async () => {
		await fetch(`${env.PUBLIC_URL}:${env.PUBLIC_PORT}/user/logout`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				credentials: 'same-origin',
				'Content-Type': 'application/json'
			}
		});
		user.set({
			id: 0,
			username: '',
			verified: false,
			isAdmin: false,
			isBanned: false,
			streak: 0
		});
	};
</script>

<Header company="Penguin Logistics" platformName="ANOMIA" bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavLink icon={Home} href="/" text="Homepage" />
		<SideNavLink icon={Forum} href="/forums" text="Forums" loading="true" />
		<SideNavLink icon={Earth} href="/wwn" text="WW News" />
		<SideNavMenu icon={Fade} text="SBC">
			<SideNavMenuItem href="/sbc/listings" text="Listings" />
			<SideNavMenuItem href="/sbc/news" text="SBC News" />
			<SideNavMenuItem href="/sbc/advertising" text="Advertising" />
		</SideNavMenu>
		<SideNavDivider />
		<SideNavLink href="discordlinkidk" icon={LogoDiscord} text="Discord" />
		<SideNavDivider />
		{#if $user.id != 0}
			<SideNavLink href="/me" icon={User} text="{$user.username} Profile" />
			<SideNavLink
				href="/login"
				icon={Logout}
				text="Log Out"
				on:click={() => {
					logout();
				}}
			/>
		{:else}
			<SideNavLink href="/login" icon={User} text="Log In" />
			<SideNavLink href="/register" icon={Login} text="Sign Up" />
		{/if}
	</SideNavItems>
</SideNav>

<Content><slot /></Content>
