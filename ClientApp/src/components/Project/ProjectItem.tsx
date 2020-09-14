import React, { FC, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Text, View } from 'react-native';

import { ProjectdScreenRouteProp } from '@navigation';
import { projectStore } from '@stores';
import { Project } from '@models';
import { WithLoader } from '../Hoc';

interface ProjectItemProps {
	projectStore: typeof projectStore;
	route: ProjectdScreenRouteProp;
}

// todo enhance ProjectCard!
const ProjectCard = ({ project }: { project?: Project }) => {
	return (
		<View>
			<Text>{project?.projectId}</Text>
			<Text>{project?.projectName}</Text>
			<Text>{project?.projectDescription}</Text>
		</View>
	);
};

const ProjectItemWithLoader = WithLoader(ProjectCard);

const ProjectItem: FC<ProjectItemProps> = inject('projectStore')(
	observer(({ projectStore, route }) => {
		const { projectId } = route.params;
		const { currentProject, loadProject, loading } = projectStore;

		useEffect(() => {
			(async () => loadProject(projectId))();
		}, []);

		return <ProjectItemWithLoader loading={loading} project={currentProject}></ProjectItemWithLoader>;
	})
);

export { ProjectItem };
