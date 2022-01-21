const express = require("express");
const morgan = require("morgan");
const { db, Page, User } = require("./models");
const layout = require("./views/layout");
const PORT = 3000;
const app = express();
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  try {
    res.send(layout());
  } catch (error) {
    console.log(error);
  }
});

const init = async () => {
  //Remember that this option will drop all tables and then recreate them
  //await db.sync({force: true})

  await db.sync();
  // make sure that you have a PORT constant
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
