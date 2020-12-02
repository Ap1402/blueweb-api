import * as Joi from '@hapi/joi'

export const ReportSchema = Joi.object({
    message: Joi.string().required(),
    status: Joi.string(),
    dni: Joi.string().empty(''),
    categoryId: Joi.number().required(),
    statusId: Joi.number().empty(''),
    supportMessageForClient: Joi.string(),
    supportMessageInner: Joi.string(),
    priorityLevel: Joi.number()


}).messages({
    "string.base": `"{#value}" debe ser un tipo de texto`,
    "string.empty": `"{#key}" No puede ser un campo vacío`,
    "string.max": `"{#value}" Debe tener un máximo de {#limit}`,
    "email.base": `"{#value}" Debe ser un correo {#limit}`,
    "any.required": `"{#key}" Es un campo requerido`,
    "string.alphanum": `"{#value}"  debe ser un valor alfanumérico`,
});
