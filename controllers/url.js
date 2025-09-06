const base62 = require("base62");
const { save_url, checkValidity, get_url } = require("../services/url");

const handleRedirectRequest = async (req, res) => {
  try {
    const id = base62.decode(req.params.urlid);
    await get_url(id)
      .then((response) => {
        console.log(response.rows);
        const url = response.rows[0].url;
        return res.redirect(url);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const handleShortenRequest = async (req, res) => {
  const url = req.body;
  console.log(url.url);
  if (!checkValidity(url.url))
    return res.status(400).json({ message: "Invalid url" });

  await save_url(url.url)
    .then((response) => {
      const shorturl = "http://localhost:8080/" + base62.encode(response);
      console.log(shorturl);
      return res.status(200).render("index", { shorturl });
    })
    .catch((err) => {
      return res.status(500).json({ ERROR: err });
    });
};

module.exports = {
  handleRedirectRequest,
  handleShortenRequest,
};
