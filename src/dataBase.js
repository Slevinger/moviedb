const MongoClient = require("mongodb");
const APIUsersDb = require("./APIUsersDb");
const meta = require("./dbStruct");

class DataBase {
  constructor() {
    this.meta = meta;
    this.DB_NAME = "selina-hostels";
    this.url = `mongodb://localhost:27017`;
    MongoClient.connect(this.url)
      .then((res, err) => {
        if (err) throw err;
        this.db = res;
        this.dbo = res.db(this.DB_NAME);
        this.usersApi = new APIUsersDb(this.db, this.dbo, this);
        this.validateToken = async function(user_id, token) {
          let credentials = await this.dbo.collection("users").findOne({
            _id: new MongoClient.ObjectId(user_id),
            token: token
          });
          return credentials;
        };
        console.log("db connected");
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = DataBase;
