const mongoose = require("mongoose");

const fs = require('fs')
const path = require('path')
const {promisify} = require ('util')

const NoticeSchema = new mongoose.Schema({
  title: {
      type: String,
      require: true,
  },
  description: {
      type: String,
      require: true,
  }
  
});


const Notice = mongoose.model("NoticeDate", NoticeSchema)
module.exports = mongoose.model("Notice", NoticeSchema);
