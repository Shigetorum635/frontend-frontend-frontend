<script>
	//@ts-nocheck
	import { Button, TextInput, TextArea } from 'carbon-components-svelte';
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import { goto } from '$app/navigation';
	import { Recaptcha, recaptcha, observer } from 'svelte-recaptcha-v2';
	let title = '';
	let content = '';
	let error = '';
	let captchaResponse = '';

	const onCaptchaReady = (event) => {
		console.log('This is ready');
	};

	const onCaptchaSuccess = (event) => {
		console.log('token received: ' + event.detail.token);
		captchaResponse = event.detail.token;
	};

	const onCaptchaError = (event) => {
		console.log('recaptcha init has failed.');
	};

	const onCaptchaExpire = (event) => {
		console.log('recaptcha api has expired');
	};

	const onCaptchaOpen = (event) => {
		console.log('google decided to challange the user');
	};

	const onCaptchaClose = (event) => {
		console.log('google decided to challange the user');
	};
	const post = async () => {
		recaptcha.execute();
		const body = JSON.stringify({ title, content, categoryId: $page.params.slug, captchaResponse });
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
				error = 'Incorrect post format.';
			case 404:
				console.log(`I say Account not found because I am status ${response.status}`);
				error = 'Account not found!';
			case 500:
				console.log(`I say Server Error because I am status ${response.status}`);
				error = 'Server Error!';
				break;
		}
		const data = await response.json();
		error = data.message;

		if (response.status === 200) {
			setTimeout(() => {
				goto(`/forums/${$page.params.slug}/${data.thread.id}`);
			}, 3000);
		}
	};
</script>

<a href="/forums"><Button>Go Back</Button></a>
<div class="w-2/3 ">
	<div class="text-xl my-2">Create forum post</div>
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
	<Recaptcha
		sitekey={env.PUBLIC_CAPTCHA}
		badge={'inline'}
		size={'invisible'}
		on:success={onCaptchaSuccess}
		on:error={onCaptchaError}
		on:expired={onCaptchaExpire}
		on:close={onCaptchaClose}
		on:ready={onCaptchaReady}
	/>
	<Button label="Send" class="border-white border " on:click={() => post()}>Create</Button>
</div>
