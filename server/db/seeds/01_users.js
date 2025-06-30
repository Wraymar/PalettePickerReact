/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  //restart the id count to one
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      username: "wraymar",
      hashed_password: "1234",
      date_made: new Date(),
    },
    {
      id: 2,
      username: "ty1",
      hashed_password: "1234",
      date_made: new Date(),
    },
  ]);
};
