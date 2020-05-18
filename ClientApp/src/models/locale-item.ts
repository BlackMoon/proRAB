import { ItemGroup } from './item-group';
import { OptionItem } from './option-item';

export interface LocaleItem extends OptionItem {
	locale: string;
}

export interface LocaleItemGroup extends ItemGroup<LocaleItem> {}