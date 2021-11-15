const mongoose = require("mongoose");

const todoShema = new mongoose.Schema(
    {
        ///Nombre del cleinte
        Usuario:{
            type: String,
            required: true,

        },
        ///Tipo de servicio
        Servicio: {
            type: String,
            required: true,
        },
        //Hora
        Hora:{
            type: String,
            default: " "
        },
        Ubicacion:{
            type: String,
            default: " "
        }
    }
)
const Cita = mongoose.model("CITA",todoShema);

module.exports = {
    Cita
}