const ObjectId = require("mongodb").ObjectId;
const randomstring = require("randomstring");
const meta = require("./dbStruct").meta;

class APIUsersDb {
  constructor(db, dbo, dataBase) {
    this.db = db;
    this.dbo = dbo;
    this.dataBase = dataBase;
  }

  async addUser(email, password, re_password, permissions, respond) {
    try {
      if (re_password !== password) {
        respond(401, "passwords dont match");
      } else {
        const userData = await this.dbo.collection("users").findOne({ email });
        if (!password || !email) {
          respond(400, ` you are missing parameters`);
        } else if (userData) {
          respond(400, `user with the name ${email}, allready exists`);
        } else {
          let user = JSON.parse(JSON.stringify(meta().user));
          user.permissions = permissions;
          user.password = password;
          user.email = email;
          this.dbo.collection("users").insertOne(user);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async removeUser(user_id, respond) {
    try {
      let user = await this.dbo
        .collection("users")
        .findOneAndDelete({ _id: new ObjectId(user_id) });
      return user.value;
    } catch (err) {
      respond(401, err);
      console.log(err);
    }
  }

  async setPassword(user_id, old_password, new_password, token, respond) {
    try {
      let res = await this.dbo.collection("users").updateOne(
        {
          _id: new ObjectId(user_id),
          token,
          password: old_password
        },
        { $set: { password: new_password } }
      );
      if (res.result.n == 0) {
        respond(400, `the password dont match your own`);
      }
    } catch (err) {
      respond(400, err);
      console.log(err);
    }
  }

  async setEmail(user_id, password, new_mail, token, respond) {
    try {
      let res = await this.dbo.collection("users").updateOne(
        {
          _id: new ObjectId(user_id),
          token,
          password: password
        },
        { $set: { email: new_mail } }
      );
      if (res.result.n == 0) {
        respond(400, `the password dont match your own`);
      }
    } catch (err) {
      respond(400, err);
      console.log(err);
    }
  }

  async addDetails(user_id, detail_key, value, token, respond) {
    try {
      let upsertObj = {};
      upsertObj[detail_key] = value;
      if (detail_key && value) {
        let res = await this.dbo.collection("users").updateOne(
          {
            _id: new ObjectId(user_id),
            token: token
          },
          { $set: upsertObj }
        );
      } else if (detail_key && !value) {
        upsertObj[detail_key] = 1;
        let res = await this.dbo.collection("users").updateOne(
          {
            _id: new ObjectId(user_id),
            token: token
          },
          { $unset: upsertObj }
        );
        respond(200, `detail "${detail_key} was removed`);
      } else {
        respond(400, `you cannot set ${detail_key} to -> ${value}`);
      }
    } catch (err) {
      console.log(err);
      respond(401, err);
    }
  }

  async logout(user_id, token, respond) {
    try {
      let res = await this.dbo.collection("users").updateOne(
        {
          _id: new ObjectId(user_id),
          token: token
        },
        { $unset: { token: 1 } }
      );
      if (res.result.n == 0) {
        respond(400, "could not logout");
      }
    } catch (err) {
      console.log(err);
      respond(400, err);
    }
  }

  async login(email, password, respond) {
    try {
      let findObj = {};
      if (!email) {
        respond(400, `you must have an Email`);
      } else {
        if (email) findObj.email = email;
        if (password) {
          findObj.password = password;
        } else {
          respond(400, "you must fill the password field");
        }
        let token = randomstring.generate({
          length: 12,
          charset: "alphanumeric"
        });
        let res = await this.dbo
          .collection("users")
          .findOneAndUpdate(
            findObj,
            { $set: { token } },
            { returnNewDocument: true }
          );

        if (!res.value) {
          respond(400, `one or more of your credentials is wrong`);
        }
        let ret = { ...res.value, token };
        return ret;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async addToFavorites(user_id, favorite_id, respond) {
    try {
      if (user_id && favorite_id) {
        const res = await this.dbo
          .collection("events")
          .updateOne(
            { _id: new ObjectId(user_id) },
            { $addToSet: { todo_lists: favorite_id } }
          );
      } else {
        respond(
          400,
          "addListToEvent(user_id,favorite_id,respond)::your user_id or favorite_id is null"
        );
      }
    } catch (err) {
      respond(401, err);
      console.log(err);
    }
  }

  async getUserList(user_id, token, respond) {
    const credentails = await this.dataBase.validateToken(user_id, token);
    if (credentails && credentails.permissions == "admin") {
      let users = await this.dbo
        .collection("users")
        .find(
          { permissions: { $not: { $regex: "admin" } } },
          { _id: 0, email: 1 }
        )
        .sort({ email: 1 })
        .toArray();
      return users.map(user => {
        delete user.password;
        return user;
      });
    }
    return [];
  }

  async removeFromFavorites(user_id, favorite_id, respond) {
    try {
      if (!user_id || !favorite_id) {
        respond(
          401,
          " removeListFromEvent(user_id, favorite_id,respond)::no user_id/favorite_id provided"
        );
      } else {
        this.dbo
          .collection("users")
          .update(
            { _id: ObjectId(event_id) },
            { $pull: { todo_lists: favorite_id } },
            { multi: true }
          );
      }
    } catch (err) {
      respond(401, err);
      console.log(err);
    }
  }
}

module.exports = APIUsersDb;
