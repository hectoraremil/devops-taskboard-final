function validateTaskTitle(title) {

    if (typeof title !== "string") {
        return {
            valid: false,
            message: "El título es obligatorio"
        };
    }

    const cleanTitle = title.trim();

    if (cleanTitle.length === 0) {
        return {
            valid: false,
            message: "El título no puede estar vacío"
        };
    }

    if (cleanTitle.length > 120) {
        return {
            valid: false,
            message: "El título no puede superar 120 caracteres"
        };
    }

    return {
        valid: true,
        value: cleanTitle
    };
}


module.exports = {
    validateTaskTitle
};