import { Asset, FileSystem as FS } from "expo";
import config from "@config";

const copyDbAsync = async () => {
  const { exists } = await FS.getInfoAsync(
    `${FS.documentDirectory}SQLite/${config.DB_NAME}`
  );

  if (!exists) {
    await FS.downloadAsync(
      Asset.fromModule(config.DB_MODULE).uri,
      `${FS.documentDirectory}SQLite/${config.DB_NAME}`
    );
  }
};

export { copyDbAsync };
