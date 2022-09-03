const express = require("express");

const {
  getAllAttendances,
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceControl.controller");
const attendanceControlRouter = express.Router();

// attendanceControl Endpoints
attendanceControlRouter.get("/", getAllAttendances);
attendanceControlRouter.get("/:id", getAttendance);
attendanceControlRouter.post("/", createAttendance);
attendanceControlRouter.patch("/:id", updateAttendance);
attendanceControlRouter.delete("/:id", deleteAttendance);

module.exports = { attendanceControlRouter };
