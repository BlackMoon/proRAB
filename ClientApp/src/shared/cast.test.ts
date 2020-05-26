import { Catalog } from '@models';
import { cast } from './cast';

describe('Cast', () => {
	it('casting catalog (as any) with lowercase properties to Catalog class', () => {
		const expected = new Catalog();
		expected.catalogId = 1;
		expected.catalogCode = 'first';

		const result = cast({ catalogid: 1, catalogcode: 'first' }, Catalog);
		expect(result).toEqual(expected);
	});

	it('casting array of catalogs (as any) with lowercase properties to array of Catalog class', () => {
		const cat1 = new Catalog();
		cat1.catalogId = 1;
		cat1.catalogCode = 'first';

		const cat2 = new Catalog();
		cat2.catalogId = 2;
		cat2.catalogCode = 'second';

		const expected = [cat1, cat2];

		const result = cast(
			[
				{ catalogid: 1, catalogcode: 'first' },
				{ catalogid: 2, catalogcode: 'second' },
			],
			Catalog
		);
		expect(result).toEqual(expected);
	});
});
