/*eslint-disable */
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const playStore = require("./playstore");

console.log(playStore);
const app = express();

app.use(morgan("dev"));

app.use(cors());

function handleGetApps(req, res) {
  const sort = req.query.sort;
  console.log(sort)
  let results = playStore;
  if (sort) {
    if (sort !== "rating" && sort !== "app") {
      return res
        .status(400)
        .json({ error: "Can only sort by 'app' and 'rating'" });
    }
    if (sort === "app") {
      results = results.sort((a,b) =>{ 
        let textA=a.App.toLowerCase()
        let textB=b.App.toLowerCase()
        return (textA < textB) ? -1 : (textA> textB) ? 1: 0
      });}
      console.log("results after sort:", results)
    }

    if(sort === "rating"){
      results = results.sort((a,b)=>{
        let textA=a.Rating.toLowerCase()
        let textB=a.Rating.toLowerCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      });}
  
  res.json(results)
}
app.get("/apps", handleGetApps);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server listening at http://localhost:${PORT}`);
});
