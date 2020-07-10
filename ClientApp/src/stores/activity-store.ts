import { observable } from 'mobx';

export abstract class ActivityStore {
	@observable error?: Error;
	@observable loading: boolean = false;
}
