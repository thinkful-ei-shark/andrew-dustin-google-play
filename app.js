/*eslint-disable */
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const playStore = require("./playstore");

console.log(playStore);
const app = express();

app.use(morgan("dev"));

app.use(cors());
const validGenres = [
  "Action",
  "Puzzle",
  "Strategy",
  "Casual",
  "Arcade",
  "Card",
];
function handleGetApps(req, res) {
  const sort = req.query.sort;
  const genre = req.query.genre;
  console.log("sort", sort);
  let results = playStore;
  if (sort) {
    if (sort !== "rating" && sort !== "app") {
      return res
        .status(400)
        .json({ error: "Can only sort by 'app' and 'rating'" });
    }
    if (sort === "app") {
      results = results.sort((a, b) => {
        let textA = a.App.toLowerCase();
        let textB = b.App.toLowerCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    }
    if (sort === "rating") {
      results = results.sort((a, b) => {
        let textA = a.Rating;
        let textB = b.Rating;
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    }
    console.log("results after sort:", results);
  }
  if (genre) {
    if (validGenres.includes(genre)) {
      results = results.filter((x) => x.Genres === genre)
      console.log('results', results);
    } else {
      return res
        .status(400)
        .json({ error: `valid genres: ${validGenres}` });
    }
  }

  res.json(results);
}
app.get("/apps", handleGetApps);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});
