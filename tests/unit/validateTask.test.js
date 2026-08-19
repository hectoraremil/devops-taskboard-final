const {
    validateTaskTitle
} = require(
    "../../src/utils/validateTask"
);


describe(
    "Validación de tareas",
    () => {

        test(
            "debe aceptar un título válido",
            () => {

                const result =
                    validateTaskTitle(
                        "Aprender DevOps"
                    );

                expect(result.valid)
                    .toBe(true);

            }
        );


        test(
            "debe rechazar un título vacío",
            () => {

                const result =
                    validateTaskTitle("   ");

                expect(result.valid)
                    .toBe(false);

            }
        );


        test(
            "debe eliminar espacios externos",
            () => {

                const result =
                    validateTaskTitle(
                        "  Docker  "
                    );

                expect(result.value)
                    .toBe("Docker");

            }
        );

    }
);