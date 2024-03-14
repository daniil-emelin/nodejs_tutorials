const mongoose = require("mongoose");
const Note = require("../models/Note");

module.exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find();

    return res.json(notes);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Внутренняя ошибка сервера",
    });
  }
};

module.exports.addNote = async (req, res) => {
  try {
    const newNoteData = req.body;

    const newNote = await new Note(newNoteData).save();

    return res.json(newNote);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Внутренняя ошибка сервера",
    });
  }
};

module.exports.editNote = async (req, res) => {
  try {
    const { _id } = req.body;

    await Note.findOneAndUpdate({ _id }, { $set: req.body });

    return res.json(req.body);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Внутренняя ошибка сервера",
    });
  }
};

module.exports.deleteNote = async (req, res) => {
  try {
    const { _id } = req.query;

    const note = await Note.deleteOne({ _id });

    return res.json(note);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Внутренняя ошибка сервера",
    });
  }
};
