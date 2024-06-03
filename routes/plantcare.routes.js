const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



const PlantCare = require("../models/PlantCare.model");
const Plant = require("../models/Plant.model");

//POST /api/plantcare - create a new plantCare
router.post("/plantcare", (req, res, next) => {
    const { water, fertilization, benefits, sunlight, preferred_area, plantId} =
      req.body;
  
    PlantCare.create({ water, fertilization, benefits, sunlight, preferred_area, plant: plantId })
      .then((newCare) => {
        return Plant.findByIdAndUpdate(plantId, {
          $push: { cares: newCare._id },
        }, { new: true });
        })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
      });
      
// GET /api/plantCare - all the plantCare
router.get("/plantcare", (req, res, next) => {
    console.log("this is a plantCare");
    PlantCare.find()
      .then((allPlantCares) => res.json(allPlantCares))
      .catch((err) => res.json(err));
  });

  // DELETE /api/plantcare/plandCareIt - deletes speciifc plantCare
router.delete("/plantcare/:plantcareId", (req, res, next) => {
    const {plantcareId} = req.params;
  
    PlantCare.findByIdAndDelete(plantcareId)
    .then((deletedPlantCare)=>res.json({
      message: `PlantCare with ${plantcareId} has been removed successfully`
    })
  )
    .catch((err) => res.json(err));
  });

  module.exports = router;