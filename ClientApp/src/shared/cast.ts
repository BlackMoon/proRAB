export type Constructor<T> = {
	new (...args: any[]): T;
};

export const cast = <K extends object, T extends object>(source: K | K[], targetClass: Constructor<T>): T | T[] => {
	if (Array.isArray(source)) {
		return castArray(source, targetClass);
	}
	return castObject(source, targetClass);
};

export const castArray = <K extends object, T extends object>(source: K[], targetClass: Constructor<T>): T[] => {
	return source.map(s => castObject(s, targetClass));
};

// shallow casting (case-insensitive property names)
export const castObject = <K extends object, T extends object>(source: K, targetClass: Constructor<T>): T => {
	const result = new targetClass() as any;
	const sourceKeys = Object.keys(source);

	for (const rKey of Object.keys(result)) {
		const sourceKey = sourceKeys.find(skey => skey.toLowerCase() === rKey.toLowerCase());
		if (sourceKey) {
			const type = typeof result[rKey];
			const value = (source as any)[sourceKey];

			switch (type) {
				case 'boolean':
					result[rKey] = Boolean(value);
					break;
				case 'number':
					result[rKey] = Number(value);
					break;
				default:
					result[rKey] = String(value);
					break;
			}
		}
	}

	return result;
};
