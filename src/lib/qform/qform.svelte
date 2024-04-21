<script lang="ts">
	import { cloneObject } from './helper.js';
	import { createEventDispatcher } from 'svelte';
	import { Loader } from 'lucide-svelte';
	import Control from './control.svelte';
	import type { Schema } from './helper.js';

	const dispatch = createEventDispatcher();

	export let schema: Schema;
	export let data: Record<string, any> = {};
	export let isLoading = false;
	export let action: 'UPDATE' | 'CREATE' = 'CREATE';

	$: dereferencing = dereference(schema);

	function dereference(schema: any) {
		dispatch('loading', false);
		// isLoading = false;
		if (!schema) return;
		return cloneObject(schema);
	}

	function onSubmit() {
		// dispatch('submit', validate());
		dispatch('submit', data);
	}

	function onLoading(e: any) {
		dispatch('loading', e.detail);
		isLoading = e.detail;
	}
</script>

{#if schema}
	<div class={schema.class || 'text-left'}>
		{#if schema.title || schema.description}
			<div class="mx-2 mb-3">
				<p class="font-bold">{schema.title}</p>
				<p class="text-sm text-muted-foreground">{schema.description}</p>
			</div>
		{/if}
		<form class="my-2" on:submit|preventDefault={onSubmit}>
			{#await dereferencing}
				<center><Loader class="animate-spin" /></center>
			{:then dereferenced}
				<div class="flex flex-row flex-wrap items-center md:min-w-[310px] md:flex-col">
					{#each Object.keys(dereferenced.properties) as pkey}
						{@const form = dereferenced.properties[pkey]?.options?.form}
						{#if form?.show !== false}
							<!-- <div
								style={dereferenced.properties[pkey]?.options?.form?.flex
									? `flex: ${dereferenced.properties[pkey].options.form.flex}`
									: 'flex: 100%'}
							> -->
							<div class="w-full">
								<Control
									key={pkey}
									on:loading={onLoading}
									schema={dereferenced.properties[pkey]}
									bind:data={data[pkey]}
									{isLoading}
									{action}
									banded={data[form?.banded]}
								/>
							</div>
						{/if}
					{/each}
				</div>
			{:catch error}
				<div class="error">ERROR: {error.message}</div>
			{/await}

			{#if $$slots.default}
				<div class="actions">
					<slot />
				</div>
			{/if}
		</form>
	</div>
{:else}
	<p>Schema not found.</p>
{/if}
