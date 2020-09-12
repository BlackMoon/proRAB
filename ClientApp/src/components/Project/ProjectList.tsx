import React, { FC, useEffect } from 'react';
import { FlatListProps } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react';

import { Project } from '@models';
import { ProjectScreenNavigatorProp } from '@navigation';
import { projectStore } from '@stores';
import { WithLoader } from '../Hoc';

interface ProjectListProps {
	projectStore: typeof projectStore;
	navigation: ProjectScreenNavigatorProp;
}

const keyExtractor = (item: Project) => item.projectId.toString();
const renderItem = ({ item, navigation }: { item: Project; navigation: ProjectScreenNavigatorProp }) => {
	return (
		<ListItem
			leftIcon={{
				name: 'layers',
				type: 'feather',
			}}
			title={item.projectName}
			subtitle={item.projectDescription}
			bottomDivider
			onPress={() => navigation.navigate('project', { projectId: item.projectId })}
		/>
	);
};

const ProjectListWithLoader = WithLoader<FlatListProps<Project>>(FlatList);

const ProjectList: FC<ProjectListProps> = inject('projectStore')(
	observer(({ projectStore, navigation }) => {
		const { clearProjects, loadProjects, loading, projects } = projectStore;

		useEffect(() => {
			navigation.addListener('blur', () => clearProjects());
			navigation.addListener('focus', () => loadProjects());
		}, []);

		return (
			<ProjectListWithLoader
				loading={loading}
				data={projects}
				keyExtractor={keyExtractor}
				renderItem={({ item }) => renderItem({ item, navigation })}
			></ProjectListWithLoader>
		);
	})
);

export { ProjectList };
