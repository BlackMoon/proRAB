import { action, flow, observable } from 'mobx';

import { Project } from '@models';
import { projectService } from '@services';
import { ActivityStore } from './activity-store';

export class ProjectStore extends ActivityStore {
	constructor() {
		super();
		this.loadProject = this.loadProject.bind(this);
		this.loadProjects = this.loadProjects.bind(this);
	}

	@observable currentProject?: Project;
	@observable projects: Project[] = [];

	@action clearProjects = () => {
		this.projects = [];
	};

	loadProject = flow(function* (this: ProjectStore, projectId: number) {
		this.loading = true;
		try {
			this.currentProject = yield projectService.get(projectId);
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
	});

	loadProjects = flow(function* (this: ProjectStore) {
		this.loading = true;
		try {
			this.projects = yield projectService.getAll();
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
	});
}

export default new ProjectStore();
