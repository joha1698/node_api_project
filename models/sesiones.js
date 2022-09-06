const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SesionesSchema = Schema(
    {
        user_id: { type: String, require: true, unique: true},
        jwt: String
    }
)

module.exports = mongoose.model("sesiones", SesionesSchema)