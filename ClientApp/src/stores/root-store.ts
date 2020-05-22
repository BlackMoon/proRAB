import { observable, action, reaction } from 'mobx';

/** Container class for stores */
class RootStore {
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

export default new RootStore();
