import { flow, observable } from 'mobx';

import { Project } from '@models';
import { projectService } from '@services';
import { DataActivityStore } from './activity-store';

export class ProjectStore extends DataActivityStore<Project> {
	selectId = (p: Project) => p.projectId;

	constructor() {
		super();
		this.addProject = this.addProject.bind(this);
		this.loadProject = this.loadProject.bind(this);
		this.loadProjects = this.loadProjects.bind(this);
	}

	@observable currentProject?: Project;

	addProject = flow(function* (this: ProjectStore, project: Project) {
		let insertedId = 0;
		this.loading = true;
		try {
			insertedId = yield projectService.add(project);
			if (insertedId > 0) {
				project.projectId = insertedId;
				this.addOneMutably(project);
			}
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
		return insertedId;
	});

	loadProject = flow(function* (this: ProjectStore, projectId?: number) {
		if (projectId) {
			this.loading = true;
			try {
				this.currentProject = yield projectService.get(projectId);
			} catch (ex) {
				this.error = ex;
			}
			this.loading = false;
		} else {
			this.currentProject = undefined;
		}
	});

	loadProjects = flow(function* (this: ProjectStore) {
		if (this.dataLoaded) {
			return;
		}

		this.loading = true;
		try {
			const projects = yield projectService.getAll();
			this.setManyMutably(projects);
			this.dataLoaded = true;
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
	});

	updateProject = flow(function* (this: ProjectStore, project: Project) {
		let rowsAffected = 0;
		this.loading = true;
		try {
			rowsAffected = yield projectService.update(project, 'projectId');
			if (rowsAffected > 0) {
				this.updateOneMutably(project);
			}
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
		return rowsAffected;
	});
}

export default new ProjectStore();
