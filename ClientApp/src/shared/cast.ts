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
	const result = new targetClass();
	const sourceKeys = Object.keys(source);

	for (const rKey of Object.keys(result)) {
		const sourceKey = sourceKeys.find(skey => skey.toLowerCase() === rKey.toLowerCase());
		(result as any)[rKey] = sourceKey ? (source as any)[sourceKey] : undefined;
	}

	return result;
};
