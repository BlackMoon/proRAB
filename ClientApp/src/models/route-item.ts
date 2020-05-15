export interface RouteItem {
	link: string;
	title: string;
	iconName?: string;
	iconType?: string;
}

export interface RouteItemGroup {
	title?: string;
	data: RouteItem[];
}
