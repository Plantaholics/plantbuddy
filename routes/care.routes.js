const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");



const Care = require("../models/Care.model");
const Plant = require("../models/Plant.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//POST /api/care - create a new care
router.post("/care", isAuthenticated, (req, res, next) => {
    const { water, fertilization, benefits, sunlight, preferred_area, plantId} =
      req.body;
  
    Care.create({ water, fertilization, benefits, sunlight, preferred_area, plant: plantId })
      .then((newCare) => {
        return Plant.findByIdAndUpdate(plantId, {
          care: newCare._id 
        }, { new: true });
        })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
      });
      
// GET /api/care - all the care  
router.get("/care", (req, res, next) => {
    Care.find()
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
  
    Care.findById(careId)
    .populate("plant")
    .then((care) => res.status(200).json(care))
    .catch((err) => res.json(err));
  });

  // PUT /api/care/:careId - updates specific care 
router.put("/care/:careId", isAuthenticated, (req, res, next) => {
  const {careId} = req.params;

  if(!mongoose.Types.ObjectId.isValid(careId)) {
    res.status(400).json({message: "specified Id is not valid"})
    return;
  }

  Care.findByIdAndUpdate(careId, req.body, {new: true})
  .then((updatedCare)=> res.json(updatedCare))
  .catch((err) => res.json(err));
});


  module.exports = router;