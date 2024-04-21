import * as localData from '../data';
const data: any = localData;
export const getLocalData = (params: any) => {
	if (params.url) {
		return data[params.url];
	}
};
