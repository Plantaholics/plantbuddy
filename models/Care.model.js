const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CareSchema = new Schema (
    [{
        water: {
            type: String,
            enum: ["once a day", "once a week", "twice a week", "once every two weeks", "once a month"]
        },
        fertilization: {
            type: String,
            enum: ["every month", "every 3 months", "every 6 months"]
        },
        benefits: {
            type: String
        },
        sunlight: {
            type: String,
            enum: ["morning", "midday", "afternoon", "all day"]
        },
        preferred_area: {
            type: String,
            enum: ["only indoor", "only outdoor", "indoor/outdoor", "humid places", "dry places"]
        },
        plant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plant"
          }
        }]
    )


const Care = model("Care", CareSchema);
module.exports = Care