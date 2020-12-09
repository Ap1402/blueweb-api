import * as Joi from '@hapi/joi'

export const ReportSchema = Joi.object({
    message: Joi.string(),
    status: Joi.string(),
    dni: Joi.string().empty(''),
    categoryId: Joi.number().required(),
    statusId: Joi.number().empty(''),
    supportMessageForClient: Joi.string(),
    supportMessageInner: Joi.string().empty(''),
    priorityLevel: Joi.number()
}).messages({
    "string.base": `"{#value}" debe ser un tipo de texto`,
    "string.empty": `"{#key}" No puede ser un campo vacío`,
    "string.max": `"{#value}" Debe tener un máximo de {#limit}`,
    "email.base": `"{#value}" Debe ser un correo {#limit}`,
    "any.required": `"{#key}" Es un campo requerido`,
    "string.alphanum": `"{#value}"  debe ser un valor alfanumérico`,
});

export const StatusCategoryValidator = Joi.object({
    name: Joi.when("$category", {
        is: Joi.boolean().valid(true).required(),
        then: Joi.string().required(),
        otherwise: Joi.string().required(),
    }),

    defaultPriorityLevel: Joi.when("$category", {
        is: Joi.boolean().valid(true).required(),
        then: Joi.number().min(1).max(10).required(),
        otherwise: Joi.number().empty(''),
    })
}).messages({
    "string.base": `"{#value}" debe ser un tipo de texto`,
    "string.empty": `"{#value}" No puede ser un campo vacío`,
    "string.max": `"{#value}" Debe tener un máximo de {#limit}`,
    "any.required": `"{#key}" Es un campo requerido`,
    "string.alphanum": `"{#value}"  debe ser un valor alfanumérico`,
});


export const CommentsValidator = Joi.object({
    comment: Joi.string().required(),
}).messages({
    "string.base": `"{#value}" debe ser un tipo de texto`,
    "string.empty": `"{#value}" No puede ser un campo vacío`,
    "string.max": `"{#value}" Debe tener un máximo de {#limit}`,
    "any.required": `"{#key}" Es un campo requerido`,
    "string.alphanum": `"{#value}"  debe ser un valor alfanumérico`,
});