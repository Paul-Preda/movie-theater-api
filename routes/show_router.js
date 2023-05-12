let express = require("express");
let Show = require("../models/Show");
let { Router } = require("express");
let show_router = Router();

// GET all shows
show_router.get("/", async (req, res) => {
  let shows = await Show.findAll();
  res.json(shows);
});

// GET show by ID
show_router.get("/:id", async (req, res) => {
  let id = req.params.id;
  let found = await Show.findByPk(id);
  res.json(found);
});

// GET shows of a specified genre
show_router.get("/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  let shows = await Show.findAll({ where: { genre: genre } });
  res.json(shows);
});

// PUT update rating of a show that has been watched
show_router.put("/:id/rating", async (req, res) => {
  let id = req.params.id;
  let rating = req.body.rating;
  let show = await Show.findByPk(id);
  show.rating = rating;
  await show.save();
  res.json(show);
});

// PUT update the status of a show
show_router.put("/:id/status", async (req, res) => {
  let id = req.params.id;
  let status = req.body.status;
  let show = await Show.findByPk(id);
  show.status = status;
  await show.save();
  res.json(show);
});

// PUT update the watched status of a show
show_router.put("/:id/watched", async (req, res) => {
  let id = req.params.id;
  let watched = req.body.watched;
  let show = await Show.findByPk(id);
  show.watched = watched;
  await show.save();
  res.json(show);
});

// DELETE a show
show_router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  await Show.destroy({ where: { id: id } });
  res.json({ message: `Show ${id} deleted` });
});

module.exports = show_router;