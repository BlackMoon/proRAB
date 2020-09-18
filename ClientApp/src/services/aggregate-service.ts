import { Aggregate } from '@models';
import { castArray } from '@shared';
import { DataService } from './data-service';
import { executeSql } from './execute-sql';

export class AggregateService extends DataService<Aggregate> {
	constructor() {
		super('aggregate');
	}

	async getAll(): Promise<Aggregate[]> {
		const { rows } = await executeSql(`SELECT AggregateId, AggregateNameEn, AggregateNameRu FROM ${this.table}`);
		return castArray((rows as any)._array, Aggregate);
	}
}
