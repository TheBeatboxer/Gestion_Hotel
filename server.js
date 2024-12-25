require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const promClient = require("prom-client");
const roomRoutes = require("./routes/roomRoutes");

const app = express();

// Configurar métricas de Prometheus
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

const requestCounter = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "status_code", "route"],
});

// Middleware para registrar métricas
app.use((req, res, next) => {
  res.on("finish", () => {
    requestCounter.inc({
      method: req.method,
      status_code: res.statusCode,
      route: req.route ? req.route.path : "unknown",
    });
  });
  next();
});

// Middleware generales
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

// Rutas principales
app.use("/api/rooms", roomRoutes);

// Endpoint para métricas
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
