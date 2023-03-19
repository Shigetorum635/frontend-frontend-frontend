<script>
	import { Tile, Link, Button } from 'carbon-components-svelte';
	import { user } from '../../stores/user';
</script>

<h1 class="text-4xl">Welcome to <span class="font-bold">ANOMIA</span></h1>
<p>Anomia is the privacy and SBC hub open for discussion, news and many other events!</p>
{#if $user.id == 0}
	<p class="text-sm">
		To get started <Link href="/register">make an account</Link> or <Link href="/login">login</Link>
	</p>
{/if}

<h2 class="py-4 text-2xl font-bold">Recent News</h2>
<div class="grid grid-cols-1 md:grid-cols-6 gap-4">
	<Tile class="">
		<img
			src="https://cdn.pixabay.com/photo/2017/09/17/16/35/boats-2758962_960_720.jpg"
			class="h-64 w-full object-cover "
			alt=""
			srcset=""
		/>
		<p class="text-2xl hover:underline pt-3 ">PLACEHOLDER</p>
		<p class="pb-2">This is a placeholder, the actual news will come soon! :-)</p>
		<Button kind="tertiary" class="">Read More</Button>
	</Tile>
</div>

<h2 class="py-4 text-2xl font-bold">Ongoing Events</h2>
<div class="grid grid-cols-1 md:grid-cols-6 gap-4">
	<Tile class="">
		<img
			src="https://blog.polytoria.com/content/images/2021/12/Polytoria_Meet_The_Team_Dec_21.png"
			class="h-64 w-full object-cover "
			alt=""
			srcset=""
		/>
		<p class="text-2xl hover:underline pt-3 ">PLACEHOLDER</p>
		<p class="pb-2">This is a placeholder, the actual news will come soon! :-)</p>
		<Button kind="danger" class="border border-white">Read More</Button>
	</Tile>
</div>
