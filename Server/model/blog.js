const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blodSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  sata:{
    type: Date,
    default: Date.now
  }
});
module.exports=mongoose.model("Blog",blogSchema);