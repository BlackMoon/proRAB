import { Asset, FileSystem as FS } from "expo";

import config from "@constants";

const copyDbAsync = async () => {
  let dbUri = `${FS.documentDirectory}SQLite/${config.DB_NAME}`;
  await FS.deleteAsync(dbUri);

  const { exists } = await FS.getInfoAsync(dbUri);

  if (!exists) {
    await FS.downloadAsync(Asset.fromModule(config.DB_MODULE).uri, dbUri);
  }
};

export { copyDbAsync };
