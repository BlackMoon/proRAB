import { projectService } from '@services';
import { observable, action, reaction, computed } from 'mobx';

import aggregateStore from './aggregate-store';
import catalogStore from './catalog-store';
import projectStore from './project-store';
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
	setDbVersion(version: number) {
		this.dbVersion = version;
	}

	@computed get error() {
		return aggregateStore.error || catalogStore.error || projectStore.error || recordStore.error;
	}
}

export default new RootStore();
