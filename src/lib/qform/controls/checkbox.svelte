<script lang="ts">
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';

	export let key: string;
	export let data: boolean | undefined = $$props.default;
	export let label: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let required: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let autofocus: boolean | undefined = undefined;
	export let isLoading = false;

	// export let options: any = {};

	let value: boolean = data ?? false;
	let id: string = key;

	$: updateData(value);
	$: updateValue(data);

	function updateData(val: boolean) {
		const setData = val || undefined;
		if (data !== setData) {
			data = setData;
		}
	}

	function updateValue(val: boolean | undefined) {
		const setValue = val ?? false;
		if (value !== setValue) {
			value = setValue;
		}
	}
</script>

<div class="control-boolean items-top mx-2 my-3 flex space-x-2">
	<Checkbox
		{id}
		name={key}
		disabled={disabled || isLoading}
		{required}
		{autofocus}
		bind:checked={data}
	/>
	<div class="grid gap-1.5 leading-none">
		<Label
			for={id}
			class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			{label}{#if required}<sup class="text-red-500">*</sup>{/if}
		</Label>
		{#if description}
			<p class="text-sm text-muted-foreground">
				{@html description}
			</p>
		{/if}
	</div>
</div>
