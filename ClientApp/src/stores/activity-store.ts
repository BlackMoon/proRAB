import { observable } from 'mobx';

export abstract class ActivityStore {
	@observable error?: Error;
	@observable loading: boolean = false;
}

export abstract class DataActivityStore extends ActivityStore {
	protected dataLoaded: boolean = false;
}
