const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const port = 3009 || process.env.PORT;
require("dotenv").config();

let db,
  dbName = "wellness";
const dbConnectionStr = process.env.mongoUrl;

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
// app.get("/", (request, response) => {
//   db.collection;
//   response.render("./index.ejs");
// });

app.get("/", (request, response) => {
  db.collection("activities")
    .find()
    .toArray()
    .then((data) => {
      response.render("index.ejs", { info: data });
    })
    .catch((error) => console.error(error));
});

app.post("/addActivity", (request, response) => {
  console.log(request);
  db.collection("activities")
    .insertOne({
      activityName: request.body.activityName,
      time: request.body.time,
    })
    .then((result) => {
      console.log("Activity Added");
      response.redirect("/");
    })
    .catch((error) => console.error(error));
});

app.put("/addTotal", (request, response) => {
  db.collection("activities")
    .updateOne({
      total: request.body.total,
    })
    .then((result) => {
      console.log("Added One Like");
      response.json("Like Added");
    })
    .catch((error) => console.error(error));
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
console.log("we are doing it live");
