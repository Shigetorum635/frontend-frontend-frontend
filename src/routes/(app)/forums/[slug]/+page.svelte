<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import { Button, Tile } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { user } from '../../../../../stores/user';
	let error = '';
	let threads = [];
	onMount(async () => {
		console.log(`THE SLUG IS ${$page.params.slug}`);
		const response = await fetch(
			`${env.PUBLIC_URL}:${env.PUBLIC_PORT}/forums/categories/${$page.params.slug}`,
			{
				method: 'GET',
				credentials: 'include',
				headers: {
					credentials: 'same-origin',
					'Content-Type': 'application/json'
				}
			}
		).catch((err) => (error = err));

		if (!response.ok || response.status != 200) return (error = 'Not found.');

		const data = await response.json();
		console.log(data);
		threads = data.threads;
		console.log(threads);
	});
</script>

<div class="flex gap-4">
	<a href="/forums"><Button>Go Back</Button></a>
	{#if $user.id != 0}
		<a href="/forums/{$page.params.slug}/new"
			><Button class="border-white border mt-1 hover:border-transparent transition-all outline-none"
				>Create Post</Button
			></a
		>
	{/if}
</div>
<div class="grid gap-2 grid-cols-1 mt-4">
	{#each threads as thread}
		<a href="/forums/{$page.params.slug}/{thread.id}"
			><Tile>
				<div class="text-lg">{thread.title}</div>
				<div class="">{thread.content.substring(0, 40)}...</div>
			</Tile></a
		>
	{/each}
</div>
