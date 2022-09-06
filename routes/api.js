//Generemos un Router para express
const express = require("express");
const api = express.Router();

const { body } = require("express-validator")

//Importamos controladores
const Controller = require("../controllers/welcome")
const controllerDB = require("../controllers/alumnos")
const controllerDBProfesores = require("../controllers/profesores")
const controllerAuth = require("../controllers/usuarios")
const middlewareLogin = require("../middlewares/autorizacion")


//Generamos rutas
//Las comentamos para continuar con el ejercicio de Mongo DB
/* api.get("/alumno", Controller.welcome)
api.post("/alumno", controller.post)
api.put("/alumno", Controller.put)
api.delete("/alumno", Controller.delete)
api.get("/alumno/score", Controller.score) */

//Generamos rutas para el login y logout
api.post("/logout", middlewareLogin.urlProtegida, controllerAuth.logout)
api.post("/login", [
    body("mail").not().isEmpty(),
    body("pass").not().isEmpty(),
], controllerAuth.login)

//Generamos rutas para alumnos
api.get("/alumnos", middlewareLogin.urlProtegida, controllerDB.getAlumnos);
api.get("/alumno/:n", middlewareLogin.urlProtegida, controllerDB.getAlumno);
api.delete("/alumno/:n", middlewareLogin.urlProtegida, controllerDB.deleteAlumno);
api.post("/alumno", middlewareLogin.urlProtegida, [
    //validamos que el alumno que se vaya a crear tenga los siguientes datos 
    body("n_cuenta").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("genero").not().isEmpty()
], controllerDB.postAlumno);

api.put("/alumno/:n", middlewareLogin.urlProtegida, [
    //validamos que el alumno que se vaya a actualizar tenga los siguientes datos 
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("genero").not().isEmpty()
], controllerDB.putAlumno);


//Generamos rutas para profesores
api.get("/profesores", middlewareLogin.urlProtegida, controllerDBProfesores.getProfesores);
api.get("/profesor/:n", middlewareLogin.urlProtegida, controllerDBProfesores.getProfesor);
api.delete("/profesor/:n", middlewareLogin.urlProtegida, controllerDBProfesores.deleteProfesor);
api.put("/profesor/:n", middlewareLogin.urlProtegida, [
    body("n_cuenta").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("genero").not().isEmpty(),
    body("especialidad").not().isEmpty()],
    controllerDBProfesores.putProfesor)

api.post("/profesor", middlewareLogin.urlProtegida, [
    body("n_cuenta").not().isEmpty(),
    body("nombre").not().isEmpty(),
    body("edad").not().isEmpty(),
    body("genero").not().isEmpty(),
    body("especialidad").not().isEmpty()],
    controllerDBProfesores.crearProfesor)

module.exports = api;