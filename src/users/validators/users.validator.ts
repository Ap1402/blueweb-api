import * as Joi from '@hapi/joi'

export const userSchema = Joi.object({
    dni: Joi.when("$login", {
        is: Joi.boolean().valid(true).required(),
        then: Joi.string().max(30),
        otherwise: Joi.string().max(30).required(),
    }),

    identification: Joi.when("$login", {
        is: Joi.boolean().valid(true).required(),
        then: Joi.string().max(30),
        otherwise: Joi.string().max(30).required(),
    }),

    username: Joi.when("$login", {
        is: Joi.boolean().valid(true).required(),
        then: Joi.string().max(30).required(),
        otherwise: Joi.string().max(30).required(),
    }),

    confirmPassword: Joi.when("$login", {
        is: Joi.boolean().valid(true).required(),
        then: Joi.string().min(3).max(15),
        otherwise: Joi.any()
            .equal(Joi.ref("password"))
            .required()
            .label("Confirm password")
            .messages({ "any.only": "Las contraseñas deben coincidir" }),
    }),

    password: Joi.when("$login", {
        is: Joi.boolean().valid(true).required(),
        then: Joi.string().min(3).max(15).required().label("Password"),
        otherwise: Joi.string().min(6).messages({ "string.min": "Las contraseña debe tener un minimo de {#limit} carácteres" }),
    }),
}).messages({
    "string.base": `"{#value}" debe ser un tipo de texto`,
    "string.empty": `"{#value}" No puede ser un campo vacío`,
    "string.max": `"{#value}" Debe tener un máximo de {#limit}`,
    "email.base": `"{#value}" debe ser un email válido`,
    "any.required": `"{#key}" Es un campo requerido`,
    "string.alphanum": `"{#value}"  debe ser un valor alfanumérico`,
});