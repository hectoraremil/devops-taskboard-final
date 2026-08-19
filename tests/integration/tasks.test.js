const request = require("supertest");

const mongoose = require("mongoose");

const {
    MongoMemoryServer
} = require("mongodb-memory-server");

const app = require("../../src/app");


jest.setTimeout(30000);


let mongoServer;


beforeAll(async () => {

    mongoServer =
        await MongoMemoryServer.create();

    await mongoose.connect(
        mongoServer.getUri()
    );

});


afterEach(async () => {

    const collections =
        mongoose.connection.collections;

    for (
        const key of Object.keys(collections)
    ) {

        await collections[key]
            .deleteMany({});

    }

});


afterAll(async () => {

    await mongoose.disconnect();

    await mongoServer.stop();

});


describe(
    "API de tareas",
    () => {

        test(
            "POST /api/tasks crea una tarea",
            async () => {

                const response =
                    await request(app)
                        .post("/api/tasks")
                        .send({
                            title:
                                "Aprender CI/CD"
                        });

                expect(
                    response.statusCode
                ).toBe(201);

                expect(
                    response.body.title
                ).toBe(
                    "Aprender CI/CD"
                );

            }
        );


        test(
            "GET /api/tasks devuelve tareas",
            async () => {

                await request(app)
                    .post("/api/tasks")
                    .send({
                        title:
                            "Aprender Docker"
                    });

                const response =
                    await request(app)
                        .get("/api/tasks");

                expect(
                    response.statusCode
                ).toBe(200);

                expect(
                    response.body.length
                ).toBe(1);

            }
        );

    }
);