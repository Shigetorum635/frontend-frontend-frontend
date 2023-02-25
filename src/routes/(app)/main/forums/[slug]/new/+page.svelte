<script>
	// @ts-ignore
	import { onMount } from 'svelte';
	import { Button, TextInput, TextArea } from 'carbon-components-svelte';
	import { goto } from '$app/navigation';
	import { user } from '../../../../../../stores/user';
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';

	let title = '';
	let content = '';
	let error = '';

	const post = async () => {
		const body = JSON.stringify({ title, content, categoryId: $page.params.slug });
		const response = await fetch(`${env.PUBLIC_URL}:${env.PUBLIC_PORT}/forums/create`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				credentials: 'same-origin',
				'Content-Type': 'application/json'
			},
			body: body
		});

		switch (response.status) {
			case 400:
				console.log(`I say Incorrect credentials because I am status ${response.status}`);
				error = 'Account already exists!';
				break;
			case 404:
				console.log(`I say Account not found because I am status ${response.status}`);
				error = 'Account not found!';
				break;
			case 500:
				console.log(`I say Server Error because I am status ${response.status}`);
				error = 'Server Error!';
				break;
		}
        const data = await response.json()
        console.log(data)
	};

	onMount(() => {
		if ($user.id == 0) {
			goto('/main');
		}
	});
</script>

<a href="/main/forums"><Button>Go Back</Button></a>
<div class="w-2/3 ">
	{#if error != ''}
		<div class="p-2 border-t-4 border-red-600 bg-white text-black">
			<div class="text-sm">{error}</div>
		</div>
	{/if}
	<TextInput
		labelText="Title of Post"
		placeholder="Wimpy's is such a great place."
		bind:value={title}
	/>
	<TextArea labelText="Body of the Post" placeholder="Lorem Ipsum... baby!" bind:value={content} />
	<Button label="Send" class="border-white border " on:click={() => post()}>Create</Button>
</div>
