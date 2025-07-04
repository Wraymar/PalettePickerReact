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
    {
      user_id: 2,
      title: "Ocean Breeze",
      colors: ["#1E3A8A", "#3B82F6", "#60A5FA"],
      temperature: "cool",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Sunset Glow",
      colors: ["#DC2626", "#EA580C", "#F59E0B"],
      temperature: "warm",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Forest Mist",
      colors: ["#064E3B", "#065F46", "#047857"],
      temperature: "cool",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Berry Blast",
      colors: ["#7C2D12", "#B91C1C", "#DC2626"],
      temperature: "warm",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Midnight Sky",
      colors: ["#0F172A", "#1E293B", "#334155"],
      temperature: "cool",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Lavender Dreams",
      colors: ["#581C87", "#7C3AED", "#A855F7"],
      temperature: "cool",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Golden Hour",
      colors: ["#92400E", "#B45309", "#D97706"],
      temperature: "warm",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Mint Fresh",
      colors: ["#064E3B", "#065F46", "#047857"],
      temperature: "cool",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Rose Garden",
      colors: ["#881337", "#BE185D", "#EC4899"],
      temperature: "warm",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Steel Blue",
      colors: ["#1E40AF", "#2563EB", "#3B82F6"],
      temperature: "cool",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Autumn Leaves",
      colors: ["#78350F", "#92400E", "#B45309"],
      temperature: "warm",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Emerald City",
      colors: ["#064E3B", "#065F46", "#047857"],
      temperature: "cool",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Coral Reef",
      colors: ["#BE185D", "#EC4899", "#F472B6"],
      temperature: "warm",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Slate Gray",
      colors: ["#0F172A", "#1E293B", "#334155"],
      temperature: "neutral",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Peach Fuzz",
      colors: ["#9A3412", "#C2410C", "#EA580C"],
      temperature: "warm",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Teal Waters",
      colors: ["#134E4A", "#115E59", "#0F766E"],
      temperature: "cool",
      date_made: new Date(),
    },
    {
      user_id: 2,
      title: "Violet Storm",
      colors: ["#581C87", "#7C3AED", "#A855F7"],
      temperature: "cool",
      date_made: new Date(),
    },
  ]);
};
