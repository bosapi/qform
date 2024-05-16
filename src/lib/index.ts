import { writable, type Writable } from 'svelte/store';

// @ts-ignore
export { default as QForm } from './qform/qform.svelte';

export const storeForm: Writable<any> = writable(undefined);