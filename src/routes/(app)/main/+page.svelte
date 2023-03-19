<script>
	import {
		Tile,
		Link,
		Button
	} from 'carbon-components-svelte';

	const spoofImage =
		'https://st2.depositphotos.com/1028880/11190/i/450/depositphotos_111903254-stock-photo-turkish-national-flag-waving-in.jpg';
</script>

<h1 class="text-4xl">Welcome to <span class="font-bold">ANOMIA</span></h1>
<p>Anomia is the privacy and SBC hub open for discussion, news and many other events!</p>
<p class="text-sm">
	To get started <Link href="/register">make an account</Link> or <Link href="/login">login</Link>
</p>

<h2 class="py-4 text-2xl font-bold">Recent News</h2>
<div class="grid grid-cols-1 md:grid-cols-6 gap-4">
	<Tile class="">
		<img
			src="https://cdn.pixabay.com/photo/2017/09/17/16/35/boats-2758962_960_720.jpg"
			class="h-64 w-full object-cover "
			alt=""
			srcset=""
		/>
		<p class="text-2xl hover:underline pt-3 ">Edrogan fucking dies</p>
		<p class="pb-2">The President of turkey fucking died the other day due to brain injury, lmao</p>
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
		<p class="text-2xl hover:underline pt-3 ">Polytoria Egg Hunt!</p>
		<p class="pb-2">Polytoria's Egg Hunt is in the wild!</p>
		<Button kind="danger" class="border border-white">Participate!</Button>
	</Tile>
</div>
