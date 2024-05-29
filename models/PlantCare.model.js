const {Schema, model} = require("mongoose");

const plantCareSchema = new Schema (
    {
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
        preferredArea: {
            type: String,
            enum: ["only indoor", "only outdoor", "indoor/outdoor", "humid places", "dry places"]
        },
        plant: [{
            type:mongoose.Schema.Types.ObjectId, ref: "Plant"
        }]
    }
)


const PlantCare = model("PlantCare", plantCareSchema);
module.exports = PlantCare