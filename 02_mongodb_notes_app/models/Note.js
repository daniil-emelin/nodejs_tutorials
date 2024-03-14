var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteScheme = new Schema(
  {
    author: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteScheme);
