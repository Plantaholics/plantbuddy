const {Schema, model} = require("mongoose");

const plantSchema = new Schema (
    {
        picture: {
            type: String,
            required: [true, "please insert a plant image"],
        },
        scientificName: {
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
        }
    }
)


const Plant = model("Plant", plantSchema);
module.exports = Plant