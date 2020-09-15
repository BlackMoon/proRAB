export class Aggregate {
	constructor() {
		this.aggregateId = 0;
		this.aggregateName = '';
		this.aggregateDescription = '';
	}

	aggregateId: number;
	aggregateName: string;
	aggregateDescription?: string;
}
