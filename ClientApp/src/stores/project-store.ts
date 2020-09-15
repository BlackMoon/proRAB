import { flow, observable } from 'mobx';

import { Project } from '@models';
import { projectService } from '@services';
import { DataActivityStore } from './activity-store';

export class ProjectStore extends DataActivityStore {
	constructor() {
		super();
		this.loadProject = this.loadProject.bind(this);
		this.loadProjects = this.loadProjects.bind(this);
	}

	@observable currentProject?: Project;
	@observable projects: Project[] = [];

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
			this.projects = yield projectService.getAll();
			this.dataLoaded = true;
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
	});
}

export default new ProjectStore();
