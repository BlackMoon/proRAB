import DataService from "./DataService";

export class HandbooksDataService extends DataService {
  constructor() {
    super("handbook");
  }

  async get(key) {
    let { rows } = await this.executeSql(
      `select h.table_name tableName, hi.fieldCode code, hi.name, hi.valuetypeId 
      from ${this.table} h
      left join handbookInfo hi on hi.handbookId = h.id
      where h.id = ?`,
      key
    );

    let handbook = { id: key };
    if (rows.length) {
      handbook.fields = new Map(
        rows._array.map(f => [
          f.code,
          { name: f.name, valueType: f.valuetype_id }
        ])
      );
      handbook.table = rows.item(0).tableName;
    }

    return handbook;
  }

  async getAll(...args) {
    const { rows } = await this.executeSql(
      `select id, name, tableName from ${this.table}`,
      args
    );
    return rows._array;
  }
}
