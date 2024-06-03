const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const plantSchema = new Schema (
    {
        common_name: {
            type: String,
            required: [true, "a name is required"],
        },
        scientific_name: {
            type: String,
            required: [true, "please insert the scientific name"]
        },
        origin: {
            type: String,
            required: [true, "please insert the plant origin"]
        },
        family: {
            type: String,
            enum: ["araceae", "asparagaceae", "polypodiaceae", "pteridaceae", "dryopteridaceae", "asparagaceae", "asphodelaceae", "moraceae", "musaceae", "asteraceae"]
        },
        picture_url: {
            type: String
        },
        cares: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "PlantCare"
          }]
    }
)


const Plant = model("Plant", plantSchema);
module.exports = Plant;