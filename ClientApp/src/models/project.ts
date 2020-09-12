export class Project {
	constructor() {
		this.projectId = 0;
		this.projectName = '';
		this.projectDescription = '';
	}

	projectId: number;
	projectName: string;
	projectDescription?: string;
}
