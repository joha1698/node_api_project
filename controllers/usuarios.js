const Usuarios = require("../models/usuarios");
const Sesiones = require("../models/sesiones");

const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator")

const controller = {
    login: function (req, res) {

        const usuario = req.body;

        //Validamos que no haya un error en el request
        const error = validationResult(req);
        if (!error.isEmpty()) {
            console.log(error)
            return res.status(400).json({
                message: "La petición debe contener el body el mail y el pass",
                error: error.mesagge
            })
        }

        //Primero buscamos el usuario
        Usuarios.findOne({ mail: usuario.mail, pass: usuario.pass }).exec((error, usuarioFinded) => {

            if (error) {
                return res.status(500).json({
                    mensaje: "No se encuentra el usuario",
                    error: error
                })
            }

            if (!usuarioFinded) {
                return res.status(400).json({
                    mensajae: "Los datos no son validos"
                })
            }

            //Generamos el token con jwt
            const payload = { id: usuarioFinded.id }
            const llave = "G5ifvIkJ5NRCD2mUtNWE1IOj8XGQXEeY4Rcf7fTfu65xbQqVvW"
            const token = jwt.sign(payload, llave, {
                expiresIn: "1d"
            })

            //Actualizamos información en tabla de sesiones
            let update = {
                user_id: usuarioFinded.id,
                jwt: token
            }

            Sesiones.findOneAndUpdate({ user_id: usuarioFinded.id }, update, { upsert: true, new: true }, (error, sesionUpdate) => {
                if (error) {
                    return res.status(500).json({
                        mensaje: error
                    })
                }

                if (!sesionUpdate) {
                    return res.status(404).json({
                        mensaje: "Datos erroneos"

                    })
                }

                return res.status(200).json({
                    mensaje: "Se ha autenticado correctamente",
                    token: token
                })

            })



        })



    },

    logout: function (req, res) {
        console.log(req.decoded)
        Sesiones.findOneAndRemove({user_id:req.decoded.id}, (error, sesionDeleted)=>{
            if(error){
                return res.status(500).send({mensaje:error})
            }
            if(!sesionDeleted){
                return res.status(404).send({mensaje:"Datos erroneos"})
            }
            return res.status(200).send({mensaje:"Ha cerrado sesión"})
        })
    }
}

module.exports = controller