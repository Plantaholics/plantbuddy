const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Plant = require("../models/Plant.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//************************************************************************************ */
//FIRST TRY =>

// const fileUploader = require("../config/cloudinary.config");

// router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
//   // console.log("file is: ", req.file)

//   if (!req.file) {
//     next(new Error("No file uploaded!"));
//     return;
//   }

//   res.json({ fileUrl: req.file.path });
// });



// POST /api/plants - create a new plant
router.post("/plants", isAuthenticated, (req, res, next) => {
  const { common_name, scientific_name, origin, family, picture_url } =
    req.body;
  const createdBy = req.payload._id; // user's id

  // Veifys if the user exists
  User.findById(createdBy)
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      // Creates the plant asociated with the user
      return Plant.create({
        common_name,
        scientific_name,
        origin,
        family,
        picture_url,
        createdBy,
      });
    })
    .then((plantCreated) => res.json(plantCreated))
    .catch((err) => res.status(400).json({ message: err.message }));
});

// GET /api/plants - all the plants
router.get("/plants", (req, res, next) => {
  Plant.find()
    .then((allPlants) => res.json(allPlants))
    .catch((err) =>
      res.status(500).json({ error: "Error fetching plants", details: err })
    );
});

// GET /api/plants/:plantId - get specific plant
router.get("/plants/:plantId", (req, res, next) => {
  const { plantId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }

  Plant.findById(plantId)
    .populate("care")
    .then((plant) => res.status(200).json(plant))
    .catch((err) =>
      res.status(500).json({ error: "Error fetching plant", details: err })
    );
});

// PUT /api/plants/:plantId - update specific plant
router.put("/plants/:plantId", isAuthenticated, (req, res, next) => {
  const { plantId } = req.params;
  const userId = req.payload._id;

  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }

  Plant.findOneAndUpdate({ _id: plantId, createdBy: userId }, req.body, {
    new: true,
  })
    .then((updatedPlant) => {
      if (!updatedPlant) {
        res
          .status(403)
          .json({ message: "You are not authorized to edit this plant" });
        return;
      }
      res.json(updatedPlant);
    })
    .catch((err) =>
      res.status(500).json({ error: "Error updating plant", details: err })
    );
});

// DELETE /api/plants/plandIt - delete specific plant
router.delete("/plants/:plantId", isAuthenticated, (req, res, next) => {
  const { plantId } = req.params;
  const userId = req.payload._id;

  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    res.status(400).json({ message: "Specified ID is not valid" });
    return;
  }

  Plant.findOneAndDelete({ _id: plantId, createdBy: userId })
    .then((deletedPlant) => {
      if (!deletedPlant) {
        res
          .status(403)
          .json({ message: "You are not authorized to delete this plant" });
        return;
      }
      res.json({
        message: `Plant with ${plantId} has been removed successfully`,
      });
    })
    .catch((err) =>
      res.status(500).json({ error: "Error deleting plant", details: err })
    );
});

module.exports = router;
