import DataService from "./DataService";

export class HandbooksDataService extends DataService {
  constructor() {
    super("handbooks");
  }

  async get(key) {
    let { rows } = await this.executeSql(
      `select h.table_name tableName, hi.field_code code, hi.name, hi.valuetype_id 
      from ${this.table} h
      left join handbook_info hi on hi.handbook_id = h.id
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
      `select id, name, table_name from ${this.table}`,
      args
    );
    return rows._array;
  }
}
