const Alumnos = require("../models/alumnos")

const { validationResult } = require("express-validator")

const controller = {
    getAlumnos: function (req, res) {
        Alumnos.find({}).exec((error, alumnos) => {
            if (error) {
                return res.status(500).json({
                    mensaje: "Hubo un error de conexión",
                    error: error.message
                })
            }
            else if (!alumnos) {
                return res.status(200).json({
                    mensaje: "No hay alumnos por listar",
                })

            }
            return res.status(200).json({
                mensaje: "Se obtienen todos los alumnos",
                alumnos: alumnos
            })

        })
    },

    getAlumno: function (req, res) {
        const n = req.params.n;
        console.log(n)
        Alumnos.find({ n_cuenta: n }).exec((error, alumno) => {
            if (error) console.log(error.mesagge)
            res.status(200).json({
                alumno
            })
        })
    },

    postAlumno: function (req, res) {

        //Validamos la info que se envia en el body de la petición
        const error = validationResult(req);
        if (!error.isEmpty()) {
            console.log(error)
            return res.status(400).json({
                message: "Hay un error validando el body de la petición",
                error: error.mesagge
            })
        }

        const body = req.body;
        const alumnoModel = new Alumnos;

        alumnoModel.n_cuenta = body.n_cuenta;
        alumnoModel.nombre = body.nombre;
        alumnoModel.edad = body.edad;
        alumnoModel.genero = body.genero;

        alumnoModel.save((error, alumnoStored) => {
            if (error) {
                return res.status(500).json({
                    mensaje: "Error al crear alumno",
                    error: error.message,
                })
            }

            return res.status(200).json({
                mensaje: "Alumno creado con exito",
                alumno: alumnoStored
            })
        })
    },

    putAlumno: function (req, res) {

        //Primero validamos la info que se envia en el body de la petición
        const error = validationResult(req);
        if (!error.isEmpty()) {
            console.log(error)
            return res.status(400).json({
                message: "Hay un error en la petición",
                error: error.mesagge
            })
        }

        //Segundo buscamos al alumno
        const n = req.params.n;
        Alumnos.find({ n_cuenta: n }).exec((error, alumno) => {
            if (error) {
                return res.status(400).json({
                    mensaje: "No se encuentra el alumno indicado",
                    error: error.message
                })
            }

            //Luego actualizamos alumno
            const body = req.body
            const alumnoInfoUpdate = {
                nombre: body.nombre,
                edad: body.edad,
                genero: body.genero
            }

            Alumnos.findOneAndUpdate({ n_cuenta: n }, alumnoInfoUpdate, { new: true }, (error, alumnoUpdated) => {
                  
                    if (error) {
                        return res.status(500).json({
                            mensaje: "Error al actualizar"
                        })

                    }

                    if (!alumnoUpdated) {
                        return res.status(404).json({
                            mensaje: "No existe el alumno"
                        })
                    }

                    return res.status(200).json({
                        mensaje: "Alumno actualizado",
                        alumnoUpdated,
                    })
                })

        })
    },

    deleteAlumno: function (req, res){
        const n = req.params.n;

        Alumnos.findOneAndRemove({n_cuenta:n}, (error, aulmnoDeleted)=>{
            if(error){
                return res.status(500).json({
                    mensaje: "Error al eliminar"
                })
            }

            if(!aulmnoDeleted){
                return res.status(404).json({
                    mensaje: "No existe el alumno"
                })
            }

            return res.status(200).json({
                mensaje: "Alumno eliminado",
                aulmnoDeleted
            })
        })
    }
}


module.exports = controller;