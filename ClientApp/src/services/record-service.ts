import { DataService } from './data-service';
import { executeSql } from './execute-sql';

export class RecordService extends DataService<object> {
	async getAll(tableName: string): Promise<object[]> {
		const { rows } = await executeSql(`SELECT * FROM ${tableName}`);
		return (rows as any)._array;
	}
}
