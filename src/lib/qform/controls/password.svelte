<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Eye, EyeOff } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	export let key: string;
	export let data: string | undefined = $$props.default;
	export let label: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let minlength: number | undefined = undefined;
	export let maxlength: number | undefined = undefined;
	export let pattern: string | undefined = undefined;
	export let required: boolean | undefined = undefined;
	export let disabled: boolean = false;
	export let autofocus: boolean | undefined = undefined;
	export let isLoading = false;

	let value: string = data ?? '';
	let passType: string = 'password';
	let id: string = key;
	let isShow = false;

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

	function onShow() {
		isShow = !isShow;
		passType = isShow ? 'text' : 'password';
	}
</script>

<div class="control-password">
	<div class="mx-2 my-2 grid gap-1">
		<div class="flex items-center justify-between">
			<Label class="mb-1" for={id}>
				{label}{#if required}<sup class="text-red-500">*</sup>{/if}
			</Label>
			<Button
				tabindex={-1}
				on:click={onShow}
				size="icon"
				variant="ghost"
				class="h-auto w-auto p-0 text-gray-500 hover:text-gray-700"
			>
				{#if isShow}
					<EyeOff class="h-4 w-4" />
				{:else}
					<Eye class="h-4 w-4" />
				{/if}
			</Button>
		</div>
		<Input
			{id}
			name={key}
			type={passType}
			{minlength}
			{maxlength}
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
