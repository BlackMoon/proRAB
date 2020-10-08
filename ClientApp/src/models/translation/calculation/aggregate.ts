import { name } from '@shared';

import { ProjectType } from '../../project';
import { WithTranslation } from '../with-translation';
import { AggregateType } from './aggregate-type';

@name('Aggregate')
export class Aggregate extends WithTranslation {
	constructor() {
		super('aggregateName');

		this.aggregateId = 0;
		this.aggregateDescription = '';
		this.aggregateType = AggregateType.Repair;
		this.projectType = ProjectType.House;
	}

	aggregateId: number;
	aggregateDescription?: string;
	aggregateType: AggregateType;
	projectType: ProjectType;
}
