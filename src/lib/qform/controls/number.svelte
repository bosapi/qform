<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	export let key: string;
	export let data: number | undefined = $$props.default;
	export let label: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let pattern: string | undefined = undefined;
	export let required: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let autofocus: boolean | undefined = undefined;
	export let isLoading = false;

	// export let options: any = {};

	let value: number = data ?? 0;
	let id: string = key;

	$: updateData(value);
	$: updateValue(data);

	function updateData(val: number) {
		const setData = val || 0;
		if (data !== setData) {
			data = setData;
		}
	}

	function updateValue(val: number | undefined) {
		const setValue = val ?? 0;
		if (value !== setValue) {
			value = setValue;
		}
	}
</script>

<div class="control-string">
	<div class="mx-2 my-2 grid gap-1">
		<Label class="mb-1" for={id}
			>{label}{#if required}<sup class="text-red-500">*</sup>{/if}</Label
		>
		<Input
			{id}
			name={key}
			type="number"
			{min}
			{max}
			{pattern}
			bind:value
			{required}
			disabled={disabled || isLoading}
			{autofocus}
			class={disabled || isLoading ? 'bg-gray-100 dark:bg-gray-600' : 'bg-white dark:bg-gray-800'}
		/>
		{#if description}
			<p class="text-sm text-muted-foreground">{@html description}</p>
		{/if}
	</div>
</div>
