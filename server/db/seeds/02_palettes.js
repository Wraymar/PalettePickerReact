/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("palettes").del();
  await knex("palettes").insert([
    {
      user_id: 2,
      title: "Winter Reds",
      colors: ["#A10115", "#C0B2B5", "#600A0A"],
      temperature: "warm",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Sleek and Modern",
      colors: ["#3A5199", "#2F2E33", "#D5D6D2"],
      temperature: "cool",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Marcy",
      colors: ["#c92929", "#2f5a8b", "#327a5f"],
      temperature: "neutral",
      date_made: new Date(),
    },
  ]);
};
