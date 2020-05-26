import { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { inject, observer } from 'mobx-react';

import i18n, { translate } from '@localization';
import { Catalog } from '@models';
import CatalogsStore from '@stores/catalogs-store';

interface CatalogItemProps {
	catalogsStore: typeof CatalogsStore;
}

const CatalogItem: FC<CatalogItemProps> = ({ catalogsStore }) => {
	const navigation = useNavigation();
	useEffect(() => {
		(async () => catalogsStore.loadCatalogs())();
	}, []);
	return null;
};

export default inject('catalogsStore')(observer(CatalogItem));
