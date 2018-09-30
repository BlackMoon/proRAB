import DataService, { db } from "./DataService";

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

    let handbook = { records: [] };
    if (rows.length) {
      handbook.fields = new Map(
        rows._array.map(f => [
          f.code,
          { name: f.name, valueType: f.valuetype_id }
        ])
      );
      handbook.table = rows.item(0).tableName;
      try {
        ({ rows } = await this.executeSql(`select * from ${handbook.table}`));
        handbook.records = rows._array;
      } catch (e) {}
    }

    return handbook;
  }
}
