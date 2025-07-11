const Palette = require("../models/palette_model");

exports.listPalettes = async (req, res) => {
  const palettes = await Palette.listPalettes();
  if (!palettes) {
    console.log("No palettes received");
  }
  res.send(palettes);
};

exports.createPalette = async (req, res) => {
  const { user_id, title, colors, temperature } = req.body;

  const createdPalette = await Palette.createPalette(
    user_id,
    title,
    colors,
    temperature
  );
  res.send(createdPalette);
};

exports.findByUser = async (req, res) => {
  const { id } = req.params;

  console.log(id);

  const foundPalettes = await Palette.findByUser(id);
  if (!foundPalettes) {
    console.log("Failed to get palettes");
    res.send("Failed to get palettes");
  }
  res.send(foundPalettes);
};
