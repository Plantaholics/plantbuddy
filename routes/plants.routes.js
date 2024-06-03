const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Plant = require("../models/Plant.model");
const PlantCare = require("../models/PlantCare.model");



//POST /api/plants - create a new plant
router.post("/plants", (req, res, next) => {
  const { common_name, scientific_name, origin, family, picture_url } = req.body;

  Plant.create({ common_name, scientific_name, origin, family, picture_url })
    .then((plantCreated) => res.json(plantCreated))
    .catch((err) => res.json(err));
});

// GET /api/plants - all the plants
router.get("/plants", (req, res, next) => {
  console.log("this is a plant");
  Plant.find()
    .then((getAllPlants) => res.json(getAllPlants))
    .catch((err) => {
      console.error("Error fetching plants:", err);
      res.status(500).json({ error: "Error fetching plants" });
    });
});


// GET /api/plants/:plantId - get specific plant
router.get("/plants/:plantId", (req, res, next)=> {
  const {plantId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(plantId)) {
    res.status(400).json({message: "specified Id is not valid"})
    return;
  }

  Plant.findById(plantId)
  // .populate("care")
  .then((plant) => res.status(200).json(plant))
  .catch((err) => res.json(err));
});

// PUT /api/plants/:plantId - updates specific plant 
router.put("/plants/:plantId", (req, res, next) => {
  const {plantId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(plantId)) {
    res.status(400).json({message: "specified Id is not valid"})
    return;
  }

  Plant.findByIdAndUpdate(plantId, req.body, {new: true})
  .then((updatedPlant)=> res.json(updatedPlant))
  .catch((err) => res.json(err));
});

// DELETE /api/plants/plandIt - deletes speciifc plant
router.delete("/plants/:plantId", (req, res, next) => {
  const {plantId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(plantId)) {
    res.status(400).json({message: "specified Id is not valid"})
    return;
  }

  Plant.findByIdAndDelete(plantId)
  .then((deletedPlant)=>res.json({
    message: `Plant with ${plantId} has been removed successfully`
  })
)
  .catch((err) => res.json(err));
});


module.exports = router;
