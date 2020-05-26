import { observable } from 'mobx';

export abstract class ActivityStore {
	@observable loading: boolean = false;
}
