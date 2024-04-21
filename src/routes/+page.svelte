<script lang="ts">
	import { QForm } from '$lib/index.ts';

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
</script>

<QForm {schema} />
