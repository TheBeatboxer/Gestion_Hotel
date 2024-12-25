const Room = require("../models/Room");

exports.createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.reserveRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, { status: "Reservada" }, { new: true });
    res.status(200).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.payRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, { status: "Pagada" }, { new: true });
    res.status(200).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
