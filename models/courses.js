const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    courseTitle:{
        type:String,
        required:true,
        default: "Random"
    },
    Description:{
        type:String,
        default: ""
    },
    videos:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "video",
        }
    ]
})

module.exports = Course = mongoose.model("course",CourseSchema)