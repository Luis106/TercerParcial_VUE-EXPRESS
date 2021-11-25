const { Cita } = require("../models/cita.model.js");

async function minsertOne(req,res){

    const usuario = req.body.usuario;
    const servicio = req.body.servicio;
    const hora = req.body.hora;
    const Ubicacion = req.body.ubicacion;
    
    if (usuario && servicio){

       try {

            const newTask = await new Cita({
                Usuario: usuario,
                Servicio: servicio,
                Hora: hora,
                Ubicacion: Ubicacion

            }).save();
            res.status(200).json({
                savedTask:newTask
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo guardar la cita");
       }

    }else{
        res.status(400).send("Falta de parametros");
    }
}

///http://localhost:3000/Cita/listall?status=NEW
async function mFindAll(req,res){
    try {

        const result =  await Cita.find({
            ////Parametros
        });

        if (result && result.length > 0) {

            res.status(200).json(result);

        }else{

            res.status(200).json([]);
        }

        } catch (error) {

            console.log(error)
            res.status(500).json(
                {message: error,
                data: []
                });
        }
}  

async function mDeleteOne(req,res){

    const id = req.body._id;
    
    
    if (id){

       try {

            await Cita.deleteOne({
                _id: id,
            }); 
            res.status(200).json({
                msg: "Registro eliminado"
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo eliminar la cita");
       }

    }
}

async function mUpdateOne(req,res){
    const id = req.body._id;
    
    const usuario = req.body.usuario;
    const servicio = req.body.servicio;
    const hora = req.body.hora;
    const Ubicacion = req.body.ubicacion;
    
    if (id){

       try {

            await Cita.updateOne({
                _id: id,
            }, {
                $set:{
                    Usuario: usuario,
                    Servicio: servicio,
                    Hora: hora,
                    Ubicacion: Ubicacion
                }
            }); 
            res.status(200).json({
                msg: "Registro actualizado"
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo actualizar la tarea");
       }

    }
}

module.exports= {
    minsertOne,
    mFindAll,
    mUpdateOne,
    mDeleteOne
}