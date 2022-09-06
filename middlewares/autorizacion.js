const jwt = require("jsonwebtoken");
const sesiones = require("../models/sesiones");
const llave = "G5ifvIkJ5NRCD2mUtNWE1IOj8XGQXEeY4Rcf7fTfu65xbQqVvW";
const Sesiones = require("../models/sesiones")


const middlewares = {
    urlProtegida: function (req, res, next) {
        const token = req.headers["access-token"];
        console.log(token)

        if (token !== undefined) {
            jwt.verify(token, llave, (error, decoded) => {

                if (error) {
                    return res.status(403).json({
                        mensaje: "Token invalido o inexistente"
                    })
                }
                if (decoded) {
                    req.decoded = decoded;
                    Sesiones.findOne({ user_id: decoded.id, jwt: token }).exec((error, sesion) => {
                        if (error) {
                            return res.status(500).send({ mensaje: "Error al devolver los datos" })
                        }
                        if (!sesion) {
                            return res.status(404).send({ message: "Los datos de autenticación no son validos." })
                        }
                        next()
                    })
                }
            })
        } else {
            return res.status(403).json({
                mensaje: "Usuario mal logeado"
            })
        }
    }
}

module.exports = middlewares