const controller = {
    welcome: function(req, res){
        res.send("Detalle de único alumno");
        return
    },

    post: function(req, res){
        
        const alumno = req.body;
        return res.json({
            creacion:"satisfactoria",
            nuevoAlumno:alumno.nombre,
            programa:alumno.programa
        })
    },


    put: function(req, res){
        res.send("Se actualiza alumno");
        return
    },

    delete: function(req, res){
        res.send("Se elimina alumno");
        return
    },

    score: (req, res)=>{
        const score1 = 2;
        const score2 = 3;
        const score3 = 4;
        const finalScore = (score1+score2+score3)/3

        //res.send("La calificación final del alumno es: "+finalScore);
        return res.status(200).json({
            status:200,
            calificacion:finalScore
        })
    }

}

module.exports = controller;