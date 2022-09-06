const Profesores = require("../models/profesores")

const { validationResult } = require("express-validator")
const profesores = require("../models/profesores")

const controller = {
    getProfesores: function (req, res) {
        Profesores.find({}).exec((error, profesores) => {
            if (error) {
                return res.status(500).send({ mensaje: error })
            }
            if (!profesores) {
                return res.status(404).send({ mensaje: "No hay profesores" })
            }
            return res.status(200).json({ profesores })
        })
    },

    getProfesor: function (req, res) {
        n = req.params.n
        Profesores.findOne({ n_cuenta: n }).exec((error, profesor) => {
            if (error) {
                return res.status(500).send({ mensaje: error })
            }
            if (!profesor) {
                return res.status(500).send({ mensaje: "No existe este profesor" })
            }
            return res.status(200).json({ profesor })
        })
    },

    crearProfesor: function (req, res) {

        //Validamos la info que se envia en el body de la petición
        const error = validationResult(req);
        if (!error.isEmpty()) {
            console.log(error)
            return res.status(400).json({
                message: "Hay un error validando el body de la petición",
                error: error.mesagge
            })
        }

        const body = req.body
        const profesorModel = new Profesores;

        profesorModel.n_cuenta = body.n_cuenta
        profesorModel.nombre = body.nombre
        profesorModel.edad = body.edad
        profesorModel.genero = body.genero
        profesorModel.especialidad = body.especialidad

        profesorModel.save((error, profesorStored) => {
            if (error) {
                return res.status(500).send({ mensaje: error })
            }
            if (!profesorStored) {
                return res.status(404).send({ mensaje: "No se ha guardado el profesor" })
            }

            return res.status(200).json({ profesorStored })
        })
    },

    deleteProfesor: function (req, res) {
        const n = req.params.n

        Profesores.findOneAndRemove({ n_cuenta: n }, (error, profesorDeleted) => {
            if (error) {
                return res.status(500).send({ mensaje: error })
            }
            if (!profesorDeleted) {
                return res.status(404).send({ mensaje: "El profesor no se ha eliminado" })
            }
            return res.status(200).json({ profesorDeleted })
        })
    },

    putProfesor: function (req, res) {

        //Validamos la info que se envia en el body de la petición
        const error = validationResult(req);
        if (!error.isEmpty()) {
            console.log(error)
            return res.status(400).json({
                message: "Hay un error en la petición",
                error: error.mesagge
            })
        }

        const n = req.params.n;
        const body = req.body
        const profesorInfoUpdate = {
            nombre: body.nombre,
            edad: body.edad,
            genero: body.genero,
            especialidad: body.especialidad
        }

        Profesores.findOneAndUpdate({ n_cuenta: n }, profesorInfoUpdate, { new: true }, (error, profesorActualizado) => {
            if(error){
                return res.status(500).send({mensaje:error})
            }
            if(!profesorActualizado){
                return res.status(404).send({mensaje:"El profesor no ha sido actualizado"})
            }
            return res.status(200).json({profesorActualizado})
        })
    }
}

module.exports = controller;