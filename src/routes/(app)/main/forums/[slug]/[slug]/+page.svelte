<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import { Loading, Tile } from 'carbon-components-svelte';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { env } from '$env/dynamic/public';

	let loading = true;
	let error = '';

	const post = writable({
		title: '',
		body: '',
		createdAt: '',
		author: {},
		responses: []
	});
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	const config = {
		method: 'GET',
		credentials: 'include',
		headers: {
			credentials: 'same-origin',
			'Content-Type': 'application/json'
		}
	};

	onMount(async () => {
		console.log('Fetching...');
		const response = await fetch(
			// @ts-ignore
			`${env.PUBLIC_URL}:${env.PUBLIC_PORT}/forums/thread/${$page.params.slug}`,
			{ ...config }
		);

		if (!response || !response.ok) {
			loading = false;
			error = 'Could not fetch thread.';
		}
		const data = await response.json();
		post.set({
			title: data.thread.title,
			body: data.thread.content,
			createdAt: new Date(data.thread.createdAt).toLocaleString('en-us', options),
			author: data.thread.author,
			responses: data.thread.responses
		});
		loading = false;
	});
</script>

{$page.params.slug}

<div transition:slide class="max-w-[800px] mx-auto ">
	{#if loading == true}
		<Loading />
	{/if}

	<Tile>
		<div class="p-1 grid grid-cols-12 gap-0 justify-center">
			<Tile class="col-span-3  p-1" light>
				<img
					alt="{$post.author.username} Profile Picture"
					class="w-32 h-32 mx-auto rounded-xl border p-2 border-black"
					src="https://images-ext-1.discordapp.net/external/eHg-vWvwnWFxQLdxrhHeeTIQFnGOqvGn63mn62Dxyh4/https/st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
				/>
				<div class="bg-gray-200 p-[0.5px] mx-12" />
				<div class="font-bold text-center">{$post.author.username}</div>
				<div>Posted on:</div>
			</Tile>
			<div />
			<div class="col-span-8 p-1">{$post.body}</div>
		</div>
	</Tile>
</div>
