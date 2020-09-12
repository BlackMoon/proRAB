import { ItemGroup } from './item-group';

export interface OptionItem {
	title: string;
	iconName?: string;
	iconType?: string;
}

export interface OptionItemGroup extends ItemGroup<OptionItem> {}
