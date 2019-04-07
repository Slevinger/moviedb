// a library to handle response
const express = require("express");
const DataBase = require("./dataBase");

const bodyParser = require("body-parser");

const db = new DataBase();

let PORT = 8080;

let app = express();
// support CORS
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET ,POST , OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());

const response = function(res) {
  res.setHeader("Content-type", "application/json; charset=utf-8");
  responseSent = false;
  return function(code, message) {
    if (!responseSent) {
      responseSent = true;
      res.statusCode = code;
      res.send({ message });
    }
  };
};

app.post("/users/add", async function(req, res) {
  const respond = response(res);
  try {
    res.setHeader("Content-type", "application/json; charset=utf-8");
    const { email, password, re_password, permissions } = req.body;
    await db.usersApi.addUser(
      email,
      password,
      re_password,
      permissions,
      respond
    );
    respond(200, "success");
  } catch (err) {
    console.log(err);
    respond(400, err);
  }
});

app.post("/users/logout", async function(req, res) {
  let respond = response(res);
  try {
    const { user_id, token } = req.body;
    await db.usersApi.logout(user_id, token, respond);
    respond(200, `User logged out`);
  } catch (err) {
    console.log(err);
    respond(400, err);
  }
});

app.post("/users/remove", async function(req, res) {
  let respond = response(res);
  try {
    const { user_id } = req.body;
    let user = await db.usersApi.removeUser(user_id, respond);
    respond(200, `User ${user.email}, was deleted`);
  } catch (err) {
    console.log(err);
    respond(400, err);
  }
});

app.post("/users/login", async function(req, res) {
  const respond = response(res);
  try {
    const { email, password } = req.body;
    let result = await db.usersApi.login(email, password, respond);
    respond(200, result);
  } catch (err) {
    console.log(err);
    respond(400, err);
  }
});

app.post("/users/get", async function(req, res) {
  let respond = response(res);
  const { token, user_id } = req.body;
  let ret = await db.usersApi.getUserList(user_id, token);
  respond(200, ret);
});

app.post("/user/remove/favorite", async function(req, res) {
  let respond = response(res);
  const user_id = req.body.user_id;
  const movie_id = req.body.movie_id; // todo get it from the event id
  await db.usersApi.removeFromFavorites(user_id, movie_id, respond);
  //let response = helper.guessKey(JSON.parse(textToDecrypt), keySize);
  respond(200, "success");
});

app.post("/user/add/favorite", async function(req, res) {
  let respond = response(res);
  const { user_id, movie_id } = req.body;
  await db.usersApi.addToFavorites(user_id, movie_id, respond);
  respond(200, "success");
});

app.post("/user/add/user_mock", async function(req, res) {
  let respond = response(res);
  const email = "admin@selina.com",
    password = "12345",
    re_password = "12345",
    permissions = "admin";
  await db.usersApi.addUser(email, password, re_password, permissions, respond);
  respond(200, "success");
});

let server = app.listen(PORT, () =>
  console.log(`Server running at http://127.0.0.1:${PORT} /'`)
);

try {
  db.usersApi.addUser("admin@selina.com", "12345", "12345", "admin");
} catch (err) {
  console.log(err);
}
