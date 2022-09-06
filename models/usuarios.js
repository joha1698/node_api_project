const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioSchema = Schema(
    {
        mail: {type:String, required:true, unique:true},
        pass: {type:String, required:true},
    }
)

module.exports = mongoose.model("usuarios", UsuarioSchema)