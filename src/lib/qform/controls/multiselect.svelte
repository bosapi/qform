<script lang="ts">
	import Label from '$lib/components/ui/label/label.svelte';
	import { onMount } from 'svelte';
	import * as funcs from '../functions/index.js';
	import * as Popover from '$lib/components/ui/popover';
	import Button from '$lib/components/ui/button/button.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { ChevronDown } from 'lucide-svelte';

	export let key: string;
	export let data: string | undefined = $$props.default;
	export let label: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let required: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;
	export let isLoading = false;
	export let options: any;

	// export let options: any = {};
	let func: any = funcs;
	let value: string = data ?? '';
	let id: string = key;
	let localLoading = false;
	let filterValues: any[] = [];

	$: updateData(value);
	$: updateValue(data);

	function updateData(val: string) {
		const setData = val || undefined;
		if (data !== setData) {
			data = setData;
		}
		if (required) {
			console.info('This feature is not implemented yet.');
		}
	}

	function updateValue(val: string | undefined) {
		const setValue = val ?? '';
		if (value !== setValue) {
			value = setValue;
		}
	}

	function isChecked(val: string) {
		const adata: string[] | undefined = data?.split(',');
		if (!adata) return false;
		return adata.find((item) => item == val) !== undefined ? true : false;
	}

	async function getData() {
		if (options?.form?.option?.func) {
			localLoading = true;
			const res = (await func[options.form.option.func](options.form.option.params)) || [];
			filterValues = res?.map((val: any) => {
				val.is_checked = isChecked(val.name);
				return val;
			});
			localLoading = false;
		}
	}

	function setData(name: string, state: boolean) {
		let strData = filterValues.reduce((res, item) => {
			if (item.is_checked && item.name != name) {
				if (res !== '') {
					res += ', ';
				}
				res += item.name;
			} else if (name == item.name && state === true) {
				if (res !== '') {
					res += ', ';
				}
				res += item.name;
			}
			return res;
		}, '');

		return strData;
	}

	function onCheckedChange(name: string, state: boolean | string) {
		data = setData(name, state === true ? true : false);
	}

	onMount(getData);
</script>

<div class="control-string">
	<div class="mx-2 my-2 grid gap-1 overflow-y-auto">
		<Label class="mb-1" for={id}>{label}</Label>
		<Popover.Root>
			<Popover.Trigger asChild let:builder disabled={isLoading || disabled}>
				<Button
					{id}
					builders={[builder]}
					variant="outline"
					class="!pl-3 !pr-0 font-normal {disabled || isLoading
						? 'bg-gray-100 dark:bg-gray-600'
						: 'bg-white dark:bg-gray-800'}"
					disabled={isLoading || disabled}
				>
					<div class="mr-0 flex w-full items-center justify-between !text-left">
						<span>{data || 'Pilih Data'}</span>
						<ChevronDown class="w-4 font-normal" />
					</div>
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-[400px]">
				<div class="h-80 overflow-y-auto">
					{#each filterValues as item}
						<div class="control-boolean mx-2 my-3 flex items-center space-x-2">
							<Checkbox
								id={item.id}
								disabled={isLoading || localLoading || disabled}
								bind:checked={item.is_checked}
								onCheckedChange={(v) => onCheckedChange(item.name, v)}
							/>
							<div class="grid gap-1.5 leading-none">
								<Label
									for={item.id}
									class="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									{item.name}
								</Label>
							</div>
						</div>
					{/each}
				</div>
			</Popover.Content>
		</Popover.Root>
		{#if description}
			<p class="text-sm text-muted-foreground">{@html description}</p>
		{/if}
	</div>
</div>
