import env from '../config/config.js'


const config = {
  client: "mysql",
  connection: {
    host: env.sqlHost,
    user: "root",
    password: "",
    database: "desafio08",
  },
  pool: { min: 0, max: 7 },
};

export default config;