const knex = require("../db/knex.js");

class User {
  constructor({ id, username, password }) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  //we want each user to have access to a method that checks if the password matches
  isAValidPassword(password) {
    return this.password === password;
  }

  //static because we don't want user instances to have this method
  static async findUser(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const result = await knex.raw(query, [username]);
    const rawUserData = result.rows[0];
    return rawUserData ? new User(rawUserData) : null;
  }
}

module.exports = User;
