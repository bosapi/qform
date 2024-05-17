<script lang="ts">
	import { QForm, storeForm } from '$lib/index.ts';
	import { onMount } from 'svelte';

	const schema = {
		title: 'Login Form',
		description: 'Please fill the form',
		properties: {
			username: {
				type: 'text',
				label: 'Username',
				required: true,
				minlength: 5,
				maxlength: 30,
				autofocus: true,
				options: {
					form: {
						flex: '100%'
					}
				}
			},
			password: {
				type: 'password',
				label: 'Password',
				required: true,
				minlength: 6,
				maxlength: 30,
				description: '<a href="/forgot-password">Forgot Password?</a>',
				options: {
					form: {
						flex: '100%'
					}
				}
			},
			role: {
				type: 'select',
				label: 'Role',
				required: true
			},
			submit: {
				type: 'submit',
				label: 'Login',
				options: {
					form: {
						variant: 'default',
						flex: '100%'
					}
				}
			}
		}
	};

	onMount(() => {
		setTimeout(() => {
			storeForm.set({
				role: [
					{ id: 0, name: 'Nol' },
					{ id: 1, name: 'Satu' },
					{ id: 2, name: 'Dua' }
				]
			});
		}, 1000);
	});

	let data = {
		password: '123456'
	};
</script>

<QForm {schema} {data} />
