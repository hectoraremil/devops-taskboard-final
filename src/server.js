require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");

const logger = require("./logger");


const PORT = process.env.PORT || 3000;

const MONGODB_URI =
    process.env.MONGODB_URI;


async function startServer() {

    if (!MONGODB_URI) {

        logger.error(
            "La variable MONGODB_URI no está configurada"
        );

        process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);

    logger.info("MongoDB conectado correctamente");

    app.listen(
        PORT,
        "0.0.0.0",
        () => {

            logger.info(
                `Servidor ejecutándose en puerto ${PORT}`
            );

        }
    );
}


startServer().catch((error) => {

    logger.error(
        "Error iniciando aplicación",
        {
            message: error.message
        }
    );

    process.exit(1);

});