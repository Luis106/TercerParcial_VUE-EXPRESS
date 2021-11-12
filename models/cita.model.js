const mongoose = require("mongoose");

const todoShema = new mongoose.Schema(
    {
        ///Nombre del cleinte
        NombreClie:{
            type: String,
            required: true,

        },
        ///Tipo de servicio
        Servicio: {
            type: String,
            default: "Común"
        },
        //Hora
        Hora:{
            type: String,
            required: true
        }
    }
)
const Cita = mongoose.model("CITA",todoShema);

module.exports = {
    Cita
}