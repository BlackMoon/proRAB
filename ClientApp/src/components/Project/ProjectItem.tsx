import React, { FC, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Text, View } from 'react-native';

import { ProjectdScreenRouteProp, ProjectScreenNavigatorProp } from '@navigation';
import { projectStore } from '@stores';

interface ProjectItemProps {
	navigation: ProjectScreenNavigatorProp;
	projectStore: typeof projectStore;
	route: ProjectdScreenRouteProp;
}

const ProjectItem: FC<ProjectItemProps> = inject('projectStore')(
	observer(({ navigation, projectStore, route }) => {
		const { projectId } = route.params;
		const { currentProject, loadProject, loading } = projectStore;

		useEffect(() => {
			(async () => loadProject(projectId))();
		}, []);

		return (
			<View>
				<Text>{currentProject?.projectId}</Text>
				<Text>{currentProject?.projectName}</Text>
				<Text>{currentProject?.projectDescription}</Text>
			</View>
		);
	})
);

export { ProjectItem };
