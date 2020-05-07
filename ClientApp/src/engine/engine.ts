import { IFnContext } from './fn-context';

export default class Engine {
	public makeFn = (...args: string[]): Function => new Function(...args);

	public run<T>(body: string, ctx?: IFnContext): T {
		let args: string[] = [];
		let values: any[] = [];

		if (ctx && ctx.arguments) {
			args = Object.keys(ctx.arguments);
			values = args.map(key => ctx.arguments[key]);
		}

		const fn = this.makeFn(...args.concat(body));
		console.debug(fn.toString(), typeof T);

		return fn.apply(ctx, values) as T;
	}
}
