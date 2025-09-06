const { Client } = require("pg");

require("dotenv").config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function connectdb() {
  await client
    .connect()
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log("Database Not Connected");
      throw err;
    });
}
module.exports = {
  client,
  connectdb,
};
