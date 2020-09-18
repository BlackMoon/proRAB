import { flow } from 'mobx';

import { Aggregate } from '@models';
import { aggregateService } from '@services';
import { DataActivityStore } from './activity-store';

class AggregateStore extends DataActivityStore<Aggregate> {
	selectId = (a: Aggregate) => a.aggregateId;
	constructor() {
		super();
		this.loadAggregates = this.loadAggregates.bind(this);
	}

	loadAggregates = flow(function* (this: AggregateStore) {
		if (this.dataLoaded) {
			return;
		}

		this.loading = true;
		try {
			const aggregates = yield aggregateService.getAll();
			this.setManyMutably(aggregates);
			console.log(aggregates);
			this.dataLoaded = true;
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
	});
}

export default new AggregateStore();
