import { WithTranslation } from '../with-translation';

enum AggregateType {
	Construction = 'Construction',
	Repair = 'Repair',
}

export class Aggregate extends WithTranslation {
	constructor() {
		super('aggregateName');

		this.aggregateId = 0;
		this.aggregateDescription = '';
		this.aggregateType = AggregateType.Repair;
	}

	aggregateId: number;
	aggregateDescription?: string;
	aggregateType: AggregateType;
}
