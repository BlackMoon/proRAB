import { Project } from '@models';
import { castArray, castObject } from '@shared';
import { DataService } from './data-service';
import { executeSql } from './execute-sql';

export class ProjectService extends DataService<Project> {
	constructor() {
		super('project');
	}

	async get(projectId: number): Promise<Project> {
		const { rows } = await executeSql(
			`SELECT ProjectId, ProjectName, ProjectDescription FROM ${this.table} p			
			WHERE p.ProjectId=?`,
			projectId
		);

		let project: Project = null;
		if (rows.length > 0) {
			project = castObject(rows.item(0), Project);
		}
		return project;
	}

	async getAll(): Promise<Project[]> {
		const { rows } = await executeSql(`SELECT ProjectId, ProjectName, ProjectDescription FROM ${this.table}`);
		return castArray((rows as any)._array, Project);
	}
}
