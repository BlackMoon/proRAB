import { observable, action, reaction, computed } from 'mobx';

import catalogStore from './catalog-store';
import recordStore from './record-store';

class RootStore {
	constructor() {
		reaction(
			() => this.dbVersion,
			(version, reaction) => {
				console.debug(`current db version: ${version}`);
				reaction.dispose();
			}
		);
		reaction(
			() => this.error,
			// log to file
			error => console.log(error)
		);
	}

	@observable dbVersion = 0;

	@action
	setDbVersion = (version: number) => (this.dbVersion = version);

	@computed get error() {
		return catalogStore.error || recordStore.error;
	}
}

export default new RootStore();
