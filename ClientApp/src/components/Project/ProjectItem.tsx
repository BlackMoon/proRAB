import React, { FC, useEffect, useLayoutEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';

import i18n from '@localization';
import { Project } from '@models';
import { ProjectdScreenRouteProp, ProjectScreenNavigatorProp } from '@navigation';
import { projectStore } from '@stores';
import { WithLoader } from '../Hoc';

interface ProjectItemProps {
	navigation: ProjectScreenNavigatorProp;
	projectStore: typeof projectStore;
	route: ProjectdScreenRouteProp;
}

// todo enhance ProjectCard!
const ProjectCard = ({ project }: { project?: Project }) => {
	return project ? (
		<View>
			<Text>{project.projectId}</Text>
			<Text>{project.projectName}</Text>
			<Text>{project.projectDescription}</Text>
		</View>
	) : null;
};

const ProjectItemWithLoader = WithLoader(ProjectCard);

const ProjectItem: FC<ProjectItemProps> = inject('projectStore')(
	observer(({ navigation, projectStore, route }) => {
		const { projectId } = route.params;
		const { currentProject, loadProject, loading } = projectStore;

		useEffect(() => {
			(async () => loadProject(projectId))();
		}, []);

		useLayoutEffect(() => {
			navigation.setOptions({
				headerRight: () => <Button onPress={() => {}} title={i18n.t('save')} />,
			});
		}, []);

		return <ProjectItemWithLoader loading={loading} project={currentProject}></ProjectItemWithLoader>;
	})
);

export { ProjectItem };
