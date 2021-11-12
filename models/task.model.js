const mongoose = require("mongoose");

const todoShema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,

        },
        tag: {
            type: String,
            default: "Común"
        },
        status:{
            type: String,
            required: true
        }
    }
)
const Task = mongoose.model("TODO",todoShema);

module.exports = {
    Task
}