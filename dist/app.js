"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./routes");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const conexion_1 = require("./config/conexion");
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Cambia al dominio de Nuxt
    credentials: true
}));
app.use(express_1.default.json());
app.use("/auth", auth_routes_1.default);
app.use(routes_1.router);
const errorHandler = (err, req, res, next) => {
    if (err instanceof multer_1.default.MulterError) {
        // Error específico de Multer
        res.status(400).json({ message: err.message });
    }
    else if (err) {
        // Otro tipo de error
        res.status(500).json({ message: "Error del servidor", error: err.message });
    }
    else {
        next();
    }
};
app.use(errorHandler);
conexion_1.AppDataSource.initialize()
    .then(() => {
    console.log("✅ Conexión a la base de datos exitosa");
    app.listen(PORT, () => {
        console.log(`🚀 Servidor listo en el puerto ${PORT}`);
    });
})
    .catch((error) => {
    console.error("❌ Error al conectar la base de datos:", error);
});
