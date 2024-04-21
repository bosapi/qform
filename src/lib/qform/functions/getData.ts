import { page } from '$app/stores';
import { get as getStore } from 'svelte/store';
export const getData = async (params: any) => {
	let url = params?.url;
	if (url) {
		const varPage = getStore(page);
		const paramsPage = varPage.params;
		// const betweens = url.match(/(?<=\{).+?(?=\})/g);
		// if (betweens && betweens.length > 0) {
		// 	for (const item of betweens) {
		// 		let val = paramsPage[item];
		// 		url = url.replace(new RegExp(`{${item}}`, 'g'), val || '');
		// 	}
		// }
		return {};
		// const res = await get(url);
		// return res?.data;
	}
};
