<script>
	import { goto } from '$app/navigation';

	// @ts-nocheck

	import { env } from '$env/dynamic/public';
	import {
		FluidForm,
		TextInput,
		PasswordInput,
		Loading,
		Button,
		Checkbox,
		InlineNotification,
		ToastNotification
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { user } from '../../../stores/user';
	const regex =
		/^[a-zA-Z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFF9D\uFFE0-\uFFEE]{3,20}$/;

	let password = '';
	let loading = false;
	let password_2 = '';
	let username = '';
	let error = '';
	let success = '';
	let hasErrored = error === '' ? false : true;
	const register = async () => {
		if (password != password_2)
			return (error = 'Password mismatch! Make sure to type the same one.');
		if (!regex.test(username)) return (error = 'Please fill in the username properly!');
		if (password.length <= 3)
			return (error = "Invalid Password! Make sure you type one that's minimally valid!");

		const body = JSON.stringify({ username, password });
		loading = true;
		const response = await fetch(`${env.PUBLIC_URL}:${env.PUBLIC_PORT}/user/register`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				credentials: 'same-origin',
				'Content-Type': 'application/json'
			},
			body: body
		}).catch((err) => (error = err));
		loading = false;
		console.log(response);

		switch (response.status) {
			case 400:
				console.log(`I say Incorrect credentials because I am status ${response.status}`);
				error = 'Account already exists!';
				loading = false;
				break;
			case 404:
				console.log(`I say Account not found because I am status ${response.status}`);
				error = 'Account not found!';
				loading = false;
				break;
			case 500:
				console.log(`I say Server Error because I am status ${response.status}`);
				error = 'Server Error!';
				loading = false;
				break;
		}
		loading = false;
		const data = await response.json();
		success = 'Account succesfully created! Please login.';
	};

	onMount(() => {
		if ($user.id != 0) {
			goto('/main');
		}
	});
</script>

{#if loading}
	<Loading />
{/if}
<div class="">
	<div class="w-2/4 mx-auto">
		{#if error != ''}
			<ToastNotification title="Error" subtitle={error} />
		{/if}
		<div class="text-2xl font-bold text-center mb-2 w-full">REGISTER</div>
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
			<PasswordInput
				bind:value={password_2}
				required
				type="password"
				labelText="Password"
				placeholder="Repeat password..."
			/>
			<div class="py-2">
				By signing up, you agree to Anomia's Terms of Use, Privacy Policy and Cookie Policy
			</div>
		</FluidForm>
		<div class="flex justify-between">
			<Button
				on:click={() => register()}
				class="w-full border border-white hover:border-transparent">Register</Button
			>
		</div>
		{#if success != ''}
			<div class="border-t border-green-500 my-2 bg-white p-2 text-black text-sm font-bold">
				{success} | <a class="text-blue-400" href="/login">Login</a>
			</div>
		{/if}
	</div>
</div>
