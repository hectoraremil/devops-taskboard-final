const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const taskRoutes = require("./routes/taskRoutes");

const logger = require("./logger");

const {
    client,
    httpRequestsTotal
} = require("./metrics");


const app = express();


app.use(express.json());


app.use((req, res, next) => {

    const inicio = Date.now();

    res.on("finish", () => {

        const duracion = Date.now() - inicio;

        httpRequestsTotal.inc({
            method: req.method,
            status_code: String(res.statusCode)
        });

        logger.info("http_request", {
            method: req.method,
            path: req.originalUrl,
            status: res.statusCode,
            durationMs: duracion
        });

    });

    next();
});


app.use(
    express.static(
        path.join(__dirname, "../public")
    )
);


app.use("/api/tasks", taskRoutes);


app.get("/health", (_req, res) => {

    const dbConnected =
        mongoose.connection.readyState === 1;

    res
        .status(dbConnected ? 200 : 503)
        .json({
            status: dbConnected ? "ok" : "degraded",
            database: dbConnected
                ? "connected"
                : "disconnected",
            uptime: Math.round(process.uptime())
        });

});


app.get("/metrics", async (_req, res) => {

    res.set(
        "Content-Type",
        client.register.contentType
    );

    res.end(
        await client.register.metrics()
    );

});


app.use((error, _req, res, _next) => {

    logger.error("unhandled_error", {
        message: error.message,
        stack: error.stack
    });

    res.status(500).json({
        message: "Error interno del servidor"
    });

});


module.exports = app;