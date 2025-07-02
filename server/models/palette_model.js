const knex = require("../db/knex");

class Palette {
  constructor({ id, user_id, title, colors, temperature, date_made }) {
    this.id = id;
    this.user_id = user_id;
    this.title = title;
    this.colors = colors;
    this.temperature = temperature;
    this.date_made = date_made;
  }

  static async createPalette(user_id, title, colors, temperature) {
    const query = `
    INSERT into palettes (user_id, title, colors, temperature)
    VALUES (?, ?, ?, ?)
    RETURNING *
    `;
    const result = await knex.raw(query, [user_id, title, colors, temperature]);
    //our query is returning all so we can just grab the result
    const rawData = result.rows[0];
    return new Palette(rawData);
  }

  static async listPalettes() {
    const query = `SELECT * FROM palettes`;
    const result = await knex.raw(query);
    return result.rows.map((rawPalette) => {
      return new Palette(rawPalette);
    });
  }

  static async findByUser(user_id) {
    const query = `SELECT * FROM palettes WHERE user_id = ?`;
    const result = await knex.raw(query, [user_id]);
    return result.rows.map((rawPalette) => new Palette(rawPalette));
  }
}

module.exports = Palette;
