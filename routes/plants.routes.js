const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Plant = require("../models/Plant.model");
const PlantCare = require("../models/PlantCare.model");

//POST /api/plants - create a new plant
router.post("/plants", (req, res, next) => {
  const { common_name, scientific_name, origin, family, picture_url } =
    req.body;

  Plant.create({ common_name, scientific_name, origin, family, picture_url })
    .then((plantCreated) => res.json(plantCreated))
    .catch((err) => res.json(err));
});


// GET /api/plants - all the plants
router.get("/plants", (req, res, next) => {
  console.log("this is a plant");
  Plant.find()
    .then((allPlants) => res.json(allPlants))
    .catch((err) => res.json(err));
});

// GET /api/plants/:plantId - get specific plant
router.get("/plants/:plantId", (req, res, next)=> {
  const {plantId} = req.params;

  Plant.findById(plantId)
  .then((plant) => res.status(200).json(plant))
  .catch((err) => res.json(err));
});

// PUT /api/plants/:plantId - updates specific plant 
router.put("/plants/:plantId", (req, res, next) => {
  const {plantId} = req.params;

  Plant.findByIdAndUpdate(plantId, req.body, {new: true})
  .then((updatedPlant)=> res.json(updatedPlant))
  .catch((err) => res.json(err));
});

// DELETE /api/plants/plandIt - deletes speciifc plant
router.delete("/plants/:plantId", (req, res, next) => {
  const {plantId} = req.params;

  Plant.findByIdAndDelete(plantId)
  .then((deletedPlant)=>res.json({
    message: `Plant with ${plantId} has been removed successfully`
  })
)
  .catch((err) => res.json(err));
});


module.exports = router;
