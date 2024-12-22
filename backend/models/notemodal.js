const mongoose = require("mongoose")


const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        ref: "User",
        required: true
    },

    createdOn: {
        type: Date,
        default: new Date().getTime()
    }
})
    

const Note = mongoose.model("Note", noteSchema)
module.exports = Note