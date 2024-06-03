const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



const PlantCare = require("../models/PlantCare.model");
const Plant = require("../models/Plant.model");

//POST /api/care - create a new care
router.post("/care", (req, res, next) => {
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
      
// GET /api/care - all the care  //PROBLEM
router.get("/care", (req, res, next) => {
    PlantCare.find()
      .then((allcares) => res.json(allcares))
      .catch((err) => res.json(err));
  });

// GET /api/care/:careId - returns specific care

router.get("/care/:careId", (req, res, next) => {
    const {careId} = req.params;
  
    if(!mongoose.Types.ObjectId.isValid(careId)) {
      res.status(400).json({message: "specified Id is not valid"})
      return;
    }
  
    PlantCare.findById(careId)
    .populate("plant")
    .then((care) => res.status(200).json(care))
    .catch((err) => res.json(err));
  });


  module.exports = router;