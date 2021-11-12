var taskList
const { Servicio } = require("../models/Servicio.model");
var cachecambios = true;

const redis = require("redis")
client  = redis.createClient();

async function minsertOne(req,res){

    const ServName = req.body.name;
  
    if (ServName){

       try {

            const newServ = await new Servicio({
                name: ServName,
            }).save();

            res.status(200).json({
                savedTask:newServ
            });
            cachecambios = true;
            

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo guardar el servicio");
       }

    }else{
        res.status(400).send("Falta de parametros");
    }

}

///http://localhost:3000/Servicio/listall?status=NEW
async function mFindAll(req,res){
        var NombreLista

    try {
        ///Nombre de la lista
        NombreLista = `ListaServicios`

        ///Consulta guardada en la variable r
        var r = await client.get(NombreLista)
        console.log(r)
        taskList =  JSON.parse(r)


    } catch (error) {
        console.log( error);
    }
  

    if(taskList && !cachecambios){
        console.log("Extraido de cache")
        res.status(200).json(taskList);
       
    }else{
        console.log("Servicio vacios")

        try {
            const result =  await Servicio.find({
            });

            if (result && result.length > 0) {

                console.log("Guardado en cache")
                client.set(NombreLista, JSON.stringify(result));
                cachecambios = false
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
}

async function mDeleteOne(req,res){

    const taskId = req.body._id;
    if (taskId){

       try {

            await Servicio.deleteOne({
                _id: taskId,
            }); 
            cachecambios = true;
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
    const Id = req.body._id;
    const ServName = req.body.name;
    
    if (Id){

       try {

            await Servicio.updateOne({
                _id: Id,
            }, {
                $set:{
                    name: ServName
                }
            }); 
            cachecambios = true;
            res.status(200).json({
                msg: "Servicio actualizado"
            });

       } catch (error) {

           console.log(error)
           res.status(500).send("No se pudo actualizar el servicio");
       }

    }
}
module.exports= {
    minsertOne,
    mFindAll,
    mUpdateOne,
    mDeleteOne
}