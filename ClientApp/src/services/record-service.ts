import { DataService } from './data-service';
import { executeSql } from './execute-sql';

export class RecordService extends DataService<any> {
	async getAll(tableName: string): Promise<any[]> {
		const { rows } = await executeSql(`SELECT * FROM ${tableName}`);
		return (rows as any)._array;
	}
}
