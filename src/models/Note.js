const mongoose = require('mongoose')
const {Schema}= mongoose

const NoteSchema = new Schema({
    title:{type: String, trim:true, required:true},

    description:{type:String, required:true},

    date:{type: Date, default:Date.now},

    done:{type: Boolean, default: false}
},{
    timestamps:false,
    versionKey:false
})

module.exports= mongoose.model("Note",NoteSchema)