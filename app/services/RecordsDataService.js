import DataService from "./DataService";

export class RecordsDataService extends DataService {
  async add(entity, table) {
    this.table = table;
    return super.add(entity);
  }

  async getAll(table) {
    const { rows } = await this.executeSql(
      `select * from ${table} order by name`
    );
    return rows._array;
  }

  async update(entity, table) {
    this.table = table;
    return super.update(entity);
  }
}
