const mongoose = require("mongoose");

const todoShema = new mongoose.Schema(
    {
        ////Nombre del servicio
        name:{
            type: String,
            required: true,

        }
    }
)
const Servicio = mongoose.model("SERVICIO",todoShema);

module.exports = {
    Servicio
}