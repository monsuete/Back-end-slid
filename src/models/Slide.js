const mongoose = require("mongoose");

const fs = require('fs')
const path = require('path')
const {promisify} = require ('util')

const SlideSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

SlideSchema.pre('save', function() {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`
  }
})

SlideSchema.pre('remove', function() {
  if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: "uploadexample2",
        key:this.key
      })
      .promise()
  }else {
    return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key))
  }
})


module.exports = mongoose.model("Slide", SlideSchema);
