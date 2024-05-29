const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const PlantLog = require("../models/Plant.model");
const PlantCare = require("../models/PlantCare.model");

//POST /api/plants - create a new plant
router.post("/plants", (req, res, next) => {
    const {picture, scientificName, origin, family, PlantCare} = req.body;

    PlantLog.create({picture, scientificName, origin, family, PlantCare})
        .then((plantCreated) => res.json(plantCreated))
        .catch((err) =>  res.json(err))
});



