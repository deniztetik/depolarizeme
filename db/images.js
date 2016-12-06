var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    imageID: String,
    data: String
  });

var Image = mongoose.model("Image", imageSchema)

module.exports = Image
