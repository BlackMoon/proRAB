import { Catalog } from '@models';
import { cast } from './cast';

describe('Cast', () => {
	it('casting catalog (as any) with lowercase properties to Catalog class', () => {
		const expected = new Catalog();
		expected.catalogId = 1;
		expected.catalogName = 'first';

		const result = cast({ catalogid: 1, catalogname: 'first' }, Catalog);
		expect(result).toEqual(expected);
	});

	it('casting array of catalogs (as any) with lowercase properties to array of Catalog class', () => {
		const cat1 = new Catalog();
		cat1.catalogId = 1;
		cat1.catalogName = 'first';

		const cat2 = new Catalog();
		cat2.catalogId = 2;
		cat2.catalogName = 'second';

		const expected = [cat1, cat2];

		const result = cast(
			[
				{ catalogid: 1, catalogname: 'first' },
				{ catalogid: 2, catalogname: 'second' },
			],
			Catalog
		);
		expect(result).toEqual(expected);
	});
});
