import * as Linking from 'expo-linking';

export const routes = {
	about: 'about',
	catalogs: 'catalogs',
	calculations: 'calculations',
	construction: 'construction',
	functions: 'functions',
	more: 'more',
	objects: 'objects',
	repair: 'repair',
	settings: 'settings',
	tables: 'tables',
};

export default {
	prefixes: [Linking.makeUrl('/')],
	config: routes,
};
