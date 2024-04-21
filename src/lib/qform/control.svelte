<script lang="ts">
	import * as controls from './controls/index';
	import { createEventDispatcher } from 'svelte';
	import type { PropSchema } from './helper';

	export let key: string;
	export let schema: PropSchema;
	export let data: any = undefined;
	export let isLoading = false;
	export let action: 'UPDATE' | 'CREATE' = 'CREATE';
	export let banded: any = undefined;

	let control: any;

	$: updateControlType(schema);

	function updateControlType(schema: PropSchema) {
		const t = schema?.type;
		if (action === 'UPDATE' && schema.options?.form?.editable === false) {
			schema.disabled = true;
		}
		control = controls[t as keyof typeof controls] as any;
	}

	const dispatch = createEventDispatcher();

	function onLoading(e: any) {
		dispatch('loading', e.detail);
	}
</script>

<svelte:component
	this={control}
	{key}
	{...schema}
	bind:data
	on:loading={onLoading}
	{isLoading}
	{banded}
/>
