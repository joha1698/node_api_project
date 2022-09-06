//importamos app
const mongoose = require("mongoose");
const app = require("./app");
const port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/curso", {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>{
        console.log("Se logró la conexión con la base de datos y ahora levantaremos el servidor web")
        app.listen(port, ()=>{
            console.log("Servidor corriendo en: http://localhost:"+ port)
        })
    })
    .catch(error => console.log(error.message))



