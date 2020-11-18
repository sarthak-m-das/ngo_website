const mongoose = require('mongoose')

const VideoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        default: "Random"
    },
    url:{
        type:String,
        required:true,
        default: "Random"
    },
})

module.exports = Video = mongoose.model("video",VideoSchema)