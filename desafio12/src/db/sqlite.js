import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const sqliteConfig = {
  client: "sqlite3",
  connection: { filename: join(__dirname, '../database/messages.sqlite') },
  useNullAsDefault: true,
};

export default sqliteConfig;