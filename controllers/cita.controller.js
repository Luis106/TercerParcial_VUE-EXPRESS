const { Cita } = require("../models/cita.model.js");

async function minsertOne(req,res){

    const usuario = req.body.usuario;
    const servicio = req.body.servicio;
    const hora = req.body.hora;
    
    if (usuario && servicio){

       try {

            const newTask = await new Cita({
                usuario: usuario,
                servicio: servicio,
                hora: hora
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

    const taskId = req.body._id;
    console.log(taskId)
    
    if (taskId){

       try {

            await Cita.deleteOne({
                _id: taskId,
            }); 
            res.status(200).json({
                msg: "Registro eliminado"
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo eliminar la tarea");
       }

    }
}

async function mUpdateOne(req,res){
    const taskId = req.body._id;
    const taskStatus = req.body.status;
    
    if (taskId){

       try {

            await Cita.updateOne({
                _id: taskId,
            }, {
                $set:{
                    status: taskStatus
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