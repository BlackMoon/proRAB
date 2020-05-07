export interface IFnContext {
	arguments?: Record<string, any>;
	constants?: Record<string, any>;
	dictinaries?: Record<string, any>;
	functions?: Record<string, Function>;
}
