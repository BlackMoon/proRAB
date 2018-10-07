import DataService from "./DataService";

export class RecordsDataService extends DataService {
  async getAll(table) {
    const { rows } = await this.executeSql(`select * from ${table}`);
    return rows._array;
  }

  async update(entity, key, table) {
    const sqlStatement =
      `update ${table} set ` +
      Object.entries(entity)
        .filter(([k]) => {
          return k !== key;
        })
        .map(
          ([k, v]) => `${k} = ` + (typeof v === "string" ? `'${v}'` : `${v}`)
        )
        .join(",") +
      ` where ${key} = ?`;

    await this.executeSql(sqlStatement, entity[key]);
  }
}
