export type PropSchemaOption = {
	flex?: string;
	table?: Record<string, any>;
	form?: Record<string, any>;
	variant?: string;
};

export type PropSchema = {
	type: string;
	label: string;
	description?: string;
	minlength?: number;
	maxlength?: number;
	required?: boolean;
	disabled?: boolean;
	options?: PropSchemaOption;
	pattern?: string;
	autofocus?: boolean;
};

export type Schema = {
	name?: string;
	title?: string;
	description?: string;
	class?: string;
	properties: Record<string, PropSchema>;
};

export const editableOnly = (schema: any, data: any) => {
	const props = schema.properties;
	// uneditable: id, form show false, form options editable false
	for (const key in data) {
		if (
			props[key] === undefined ||
			data[key] === null ||
			key === 'id' ||
			props[key]?.options?.form?.show === false ||
			props[key]?.options?.form?.editable === false
		) {
			delete data[key];
		}
	}
	return data;
};

export const cloneObject = (o: any) => {
	return JSON.parse(JSON.stringify(o));
};
