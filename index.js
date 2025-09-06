const express = require("express");
const PORT = 8080;
const app = express();
const { connectdb } = require("./dbhandler/connection");
const {
  handleShortenRequest,
  handleRedirectRequest,
} = require("./controllers/url");

connectdb();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/:urlid", (req, res) => handleRedirectRequest(req, res));
app.post("/url", handleShortenRequest);
app.get("/", (req, res) => {
  const shorturl = "";
  return res.render("index", { shorturl });
});

app.listen(PORT, () => {
  console.log("Server started on port 8080");
});
