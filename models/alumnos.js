const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlumnoSchema = Schema(
    {
        n_cuenta: {type:Number, required:true, unique:true},
        nombre: {type:String, required:true},
        edad: {type:Number, required:true},
        genero: {type:String, required:true},
    }
)

module.exports = mongoose.model("alumnos", AlumnoSchema)