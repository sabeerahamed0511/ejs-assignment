const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true
    },
    isPromoted : {
        type : Boolean,
        default : null
    }
});

const User = new mongoose.model("users", userSchema);

module.exports = User;