//import sha256 from 'crypto-js/sha256';
const crypto = require("crypto-js");

const { Usuario } = require("../models/usuario.model.js");


//laMejorMonja69 -SOS

///http://localhost:3000/Cita/listall?status=NEW
async function mFind(req,res){

    const Nombre = req.body.Nombre;
    const Contraseña = req.body.Contraseña

    console.log(Contraseña + " Cons")
    var Cons = crypto.SHA3(Contraseña).toString()
    console.log(Cons)

    try {

        const result =  await Usuario.find({
           Usuario: Nombre,
           Contraseña: Cons
        },{_id:0, Contraseña: 0});

        if (result && result.length > 0) {

            res.status(200).json(result);

        }else{

            res.status(200).send("Constraseña o usuario incorrecto")
        }

        } catch (error) {

            console.log(error)
            res.status(500).json(
                {message: error,
                data: []
                });
        }
}  



async function minsertOne(req,res){

    const Nombre = req.body.Nombre;
    const Contraseña = req.body.Contraseña

   
    var Con = crypto.SHA3(Contraseña).toString()
   
   
  
    if (Nombre && Contraseña){
       try {

            const newServ = await new Usuario({
                Usuario: Nombre,
                Contraseña: Con

            }).save();

            //res.status(200).json({savedTask:newServ});
            res.status(400).send("Usuario " + Nombre + " creado");


       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo guardar el servicio");
       }

    }else{
        res.status(400).send("Falta de parametros");
    }

}  


module.exports= {
    mFind,
    minsertOne
}