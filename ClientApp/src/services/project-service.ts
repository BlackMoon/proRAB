import { Project } from '@models';
import { castArray } from '@shared';
import { DataService } from './data-service';
import { executeSql } from './execute-sql';

export class ProjectService extends DataService<Project> {
	constructor() {
		super('project');
	}

	async getAll(): Promise<Project[]> {
		const { rows } = await executeSql(`SELECT ProjectId, ProjectName, ProjectDescription FROM ${this.table}`);
		return castArray((rows as any)._array, Project);
	}
}
