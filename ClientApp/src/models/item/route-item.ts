import { ItemGroup } from './item-group';
import { OptionItem } from './option-item';

export interface RouteItem extends OptionItem {
	route: string;
}

export interface RouteItemGroup extends ItemGroup<RouteItem> {}
