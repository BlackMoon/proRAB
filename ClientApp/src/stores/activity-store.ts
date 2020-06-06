import { observable } from 'mobx';

export abstract class ActivityStore {
	@observable error: string;
	@observable loading: boolean = false;
}
