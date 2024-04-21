<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Loader } from 'lucide-svelte';

	export let key: string;
	export let data: string | undefined = $$props.default;
	export let label: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let disabled: boolean = false;
	export let isLoading = false;
	export let options: Record<string, any> = {};

	let value: string = data ?? '';
	let id: string = key;

	$: updateData(value);
	$: updateValue(data);

	function updateData(val: string) {
		const setData = val || undefined;
		if (data !== setData) {
			data = setData;
		}
	}

	function updateValue(val: string | undefined) {
		const setValue = val ?? '';
		if (value !== setValue) {
			value = setValue;
		}
	}
</script>

<div class="control-string">
	<div class="mx-2 my-2 grid gap-1">
		<Button
			{id}
			name={key}
			variant={options?.form?.variant || 'default'}
			type="submit"
			disabled={disabled || isLoading}
			class={disabled || isLoading ? 'bg-gray-600 dark:bg-gray-100' : ''}
		>
			{#if isLoading}
				<Loader class="animate-spin" />
			{:else}
				{label}
			{/if}
		</Button>
		{#if description}
			<p class="text-sm text-muted-foreground">{@html description}</p>
		{/if}
	</div>
</div>
