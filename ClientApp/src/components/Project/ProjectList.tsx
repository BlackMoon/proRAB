import React, { FC, useEffect } from 'react';
import { FlatListProps } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
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
		<ListItem bottomDivider onPress={() => navigation.navigate('project', { projectId: item.projectId })}>
			<Icon name="layers" type="feather" />
			<ListItem.Content>
				<ListItem.Title>{item.projectName}</ListItem.Title>
				<ListItem.Subtitle>{item.projectDescription}</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

const ProjectListWithLoader = WithLoader<FlatListProps<Project>>(FlatList);

const ProjectList: FC<ProjectListProps> = inject('projectStore')(
	observer(({ projectStore, navigation }) => {
		const { allEntities, loadProjects, loading } = projectStore;

		useEffect(() => {
			navigation.addListener('focus', () => loadProjects());
		}, []);

		return (
			<ProjectListWithLoader
				loading={loading}
				data={allEntities}
				keyExtractor={keyExtractor}
				renderItem={({ item }) => renderItem({ item, navigation })}
			></ProjectListWithLoader>
		);
	})
);

export { ProjectList };
