const { AttendanceControl } = require("../models/attendanceControl.model");

const getAllAttendances = async (req, res) => {
  try {
    const attendances = await AttendanceControl.findAll();
    res.status(200).json({
      status: "success",
      data: {
        attendances,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await AttendanceControl.findOne({
      where: { id },
    });
    if (!attendance) {
      return res.status(404).json({
        status: "error",
        message: "attendance not found",
      });
    }
    res.status(200).json({
      status: "succes",
      data: { attendance },
    });
  } catch (error) {
    console.log(error);
  }
};

const createAttendance = async (req, res) => {
  try {
    const { entranceTime } = req.body;
    const newAttendace = await AttendanceControl.create({
      entranceTime,
    });
    res.status(201).json({
      status: "success",
      data: { newAttendace },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateAttendance = async (req, res) => {
  try {
    const { exitTime } = req.body;
    const { id } = req.params;

    const attendance = await AttendanceControl.findOne({
      where: { id },
    });
    if (!attendance) {
      return res.status(404).json({
        status: "error",
        message: "attendance not found",
      });
    } else if (attendance.status === "CANCELLED") {
      return res.status(400).json({
        status: "error",
        message: "this attendance was cancelled",
      });
    } else if (attendance.status === "OUT") {
      return res.status(400).json({
        status: "error",
        message: "this attendance is already out",
      });
    } else {
      await attendance.update({
        exitTime,
        status: "OUT",
      });
      res.status(200).json({
        status: "succes",
        data: { attendance },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await AttendanceControl.findOne({
      where: { id },
    });
    if (!attendance) {
      return res.status(404).json({
        status: "error",
        message: "attendance not found",
      });
    } else if (attendance.status === "OUT") {
      return res.status(404).json({
        status: "error",
        message: "attendance OUT, is not posible to cancel",
      });
    } else if (attendance.status === "CANCELLED") {
      return res.status(404).json({
        status: "error",
        message: "this attendance was already cancelled",
      });
    } else {
      await attendance.update({
        status: "CANCELLED",
      });
      res.status(204).json({
        status: "success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllAttendances,
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};
