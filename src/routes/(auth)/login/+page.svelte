<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { Recaptcha, recaptcha, observer } from 'svelte-recaptcha-v2';
	import { env } from '$env/dynamic/public';
	import { FluidForm, TextInput, PasswordInput, Link, Button } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { user } from '../../../stores/user';
	const regex =
		/^[a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFF9D\uFFE0-\uFFEE]{3,20}$/;

	let password = '';
	let username = '';
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
	const login = async () => {

		if (!regex.test(username)) return (error = 'Please fill in the username properly!');
		if (password.length <= 3)
			return (error = "Invalid Password! Make sure you type one that's minimally valid!");
		const body = JSON.stringify({ username, password, captchaResponse });
		const response = await fetch(`${env.PUBLIC_URL}:${env.PUBLIC_PORT}/user/login`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				credentials: 'same-origin',
				'Content-Type': 'application/json'
			},
			body: body
		}).catch((err) => (error = err));
		console.log(response);

		switch (response.status) {
			case 400:
				console.log(`I say Incorrect credentials because I am status ${response.status}`);
				error = 'Incorrect Credentials!';
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

		const data = await response.json();
		if (!data.user || data.user == undefined) return;

		user.set(data);

		return goto('/main');
	};

	onMount(() => {
		if ($user.id != 0) {
			goto('/main');
		}
	});
</script>

<div class="">
	<div class="w-2/4 mx-auto">
		<div class="text-2xl font-bold text-center mb-2 w-full">LOGIN</div>
		<FluidForm>
			<TextInput
				class="w-full"
				labelText="User name"
				placeholder="Enter user name..."
				required
				bind:value={username}
			/>
			<PasswordInput
				bind:value={password}
				required
				type="password"
				labelText="Password"
				placeholder="Enter password..."
			/>
		</FluidForm>
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
		<div class="flex justify-between">
			<Button on:click={() => {recaptcha.execute()
				login()}} class="w-full border border-white hover:border-transparent"
				>Login</Button
			>
		</div>
	</div>
</div>
