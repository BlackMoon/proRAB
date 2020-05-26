import Engine from './engine';
import { IFnContext } from './fn-context';

describe('Function engine', () => {
	it('empty context. 1 / 2 returns the 0.5', () => {
		const expected = 0.5;
		const result = new Engine().run<number>('return 1/2;');
		console.log(typeof result);
		expect(result).toEqual(expected);
	});

	xit('4 + 34 returns the 38', () => {
		const expected = 38;

		const ctx: IFnContext = {
			arguments: { a: 4, b: 34 },
		};

		const result = new Engine().run<number>('return a + b;', ctx);
		expect(result).toEqual(expected);
	});

	xit('pow(4, 2) returns the 16', () => {
		const expected = 16;

		const ctx: IFnContext = {
			arguments: { a: 4, b: 2 },
		};

		const result = new Engine().run<number>('return Math.pow(a, b);', ctx);
		expect(result).toEqual(expected);
	});

	xit('Nested function. 2 + fn(4, 2){ return a * b } returns the 10', () => {
		const expected = 10;

		const ctx: IFnContext = {
			arguments: { a: 4, b: 2 },
			functions: { s: (a: number, b: number) => a * b },
		};

		const result = new Engine().run<number>('return 2 + this.functions.s(a, b);', ctx);
		expect(result).toEqual(expected);
	});
});
