const express = require("express");
const {
        attendanceControlRouter,
} = require("./routes/attendanceControl.routes");

//Initalizing the express ap
const app = express();

express.json();

//Receiving data on JSON
app.use(express.json());

//Routers
app.use("/api/v1/attendances", attendanceControlRouter);

//Catching no exisiting data...
app.all("*", (req, res) => {
        res.status(404).json({
                status: "error",
                message: `${req.method} ${req.url} does not exist in our server`,
        });
});

module.exports = { app };
