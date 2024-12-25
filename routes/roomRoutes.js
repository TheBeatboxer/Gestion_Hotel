const express = require("express");
const router = express.Router();
const {
  createRoom,
  getRooms,
  updateRoom,
  deleteRoom,
  reserveRoom,
  payRoom,
} = require("../controllers/roomController");

router.post("/", createRoom);
router.get("/", getRooms);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.post("/:id/reserve", reserveRoom);
router.post("/:id/pay", payRoom);

module.exports = router;
