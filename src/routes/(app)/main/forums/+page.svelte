<script>
	// @ts-nocheck

	import { env } from '$env/dynamic/public';
	import { Search, Tile, PaginationNav, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	let categories = [];
	onMount(async () => {
		const response = await fetch(`${env.PUBLIC_URL}:${env.PUBLIC_PORT}/forums/categories`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				credentials: 'same-origin',
				'Content-Type': 'application/json'
			}
		}).catch((err) => (error = err));

		if (!response.ok || response.status != 200) return;

		const data = await response.json();
		console.log(data);
		categories = data.categories;
	});
</script>

<h1 class="text-2xl font-bold mb-2">Latest Discussion</h1>
<Search />

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 py-2">
	{#each categories as category}
		<a href="/main/forums/{category.id}">
			<Tile class="hover:-translate-y-2 transition-all">
				<div class="md:flex justify-between items-center">
					<div>
						<div class="text-xl">{category.name}</div>
					</div>
					<div class="text-sm">{category.description}</div>
				</div>
			</Tile>
		</a>
	{/each}
</div>
