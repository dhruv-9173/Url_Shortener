const { client } = require("../dbhandler/connection");
async function save_url(url) {
  const response = await client.query(
    "INSERT INTO table_url(url) VALUES($1) RETURNING *",
    [url]
  );
  const id = response.rows[0].id;
  return id;
}
const checkValidity = (url) => {
  try {
    const newurl = new URL(url);

    if (newurl.protocol !== "http:" && newurl.protocol !== "https:") {
      return false;
    }
    console.log("valid");
    return true;
  } catch (err) {
    return false;
  }
};

async function get_url(id) {
  return await client.query("SELECT *FROM table_url WHERE id = $1", [id]);
}

module.exports = {
  get_url,
  checkValidity,
  save_url,
};
