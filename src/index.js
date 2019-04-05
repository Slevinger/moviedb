// a library to handle response
const express = require("express");
const bodyParser = require("body-parser");

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
  responseSent = false;
  return function(code, msg) {
    if (!responseSent) {
      responseSent = true;
      res.statusCode = code;
      res.send(msg);
    }
  };
};

app.post("/login", function(req, res) {
  try {
    let respond = response(res);
    let { email, password, rpassword } = req.body;
    console.log(`got the email : ${email}`);
    console.log(`got the password : ${password}`);
    console.log(`got the rpassword : ${rpassword}`);
    // return this.client.get(url,(err,result)=>{
    //   if (result) {
    //     return res.status(200).json({shortUrl :result});
    //   } else {
    //     this.keys[url] = `newKey_${this.size++}`;
    //     this.shortUrl[this.keys[url]] = url;
    //     this.client.set(this.keys[url], url);
    //     this.client.set(url, this.keys[url]);
    //     return res.status(200).json({ shortUrl: this.keys[url],url:url});
    //   }
    // });
    respond(200, "success");
  } catch (e) {
    console.log(e);
  }
});

let server = app.listen(PORT, () =>
  console.log(`Server running at http://127.0.0.1:${PORT} /'`)
);
