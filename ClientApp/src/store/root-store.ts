import { observable, action, reaction } from 'mobx';

export default class RootStore {
	constructor() {
		reaction(
			() => this.dbVersion,
			(version, reaction) => {
				console.debug(`current db version: ${version}`);
				reaction.dispose();
			}
		);
	}

	@observable dbVersion = 0;

	@action
	setDbVersion = (version: number) => (this.dbVersion = version);
}
