const mongoose = require("mongoose")

const formSchema = mongoose.model("formModel",{
    name: String,
    email: String,
    city: String,
    state: String,
    zipCode: String,
    address: String,
    neighborhood: String
});
module.exports = formSchema