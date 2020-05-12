import * as Linking from 'expo-linking';

export const routes = {
	repair: 'repair',
	construction: 'construction',
	objects: 'objects',
	catalogs: 'catalogs',
	more: 'more',
};

export default {
	prefixes: [Linking.makeUrl('/')],
	config: { routes },
};
