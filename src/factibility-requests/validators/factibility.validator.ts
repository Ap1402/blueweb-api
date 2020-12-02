import * as Joi from '@hapi/joi'

export const FacitibilityRequestSchema = Joi.object({
    coordenades: Joi.when("$create", {
        is: Joi.boolean().valid(true).required(),
        then: Joi.string().required(),
        otherwise: Joi.string(),
    }),
    requesterName: Joi.when("$create", {
        is: Joi.boolean().valid(true).required(),
        then: Joi.string().required(),
        otherwise: Joi.string(),
    }),
    requesterPhone: Joi.when("$create", {
        is: Joi.boolean().valid(true).required(),
        then: Joi.string().required(),
        otherwise: Joi.string(),
    }),
    wasEvaluated: Joi.when("$create", {
        is: Joi.boolean().valid(true).required(),
        then: Joi.string(),
        otherwise: Joi.string().required(),
    }),
    supportMessage: Joi.when("$create", {
        is: Joi.boolean().valid(true).required(),
        then: Joi.string(),
        otherwise: Joi.string().required(),
    }),
    isFactible: Joi.when("$create", {
        is: Joi.boolean().valid(true).required(),
        then: Joi.string(),
        otherwise: Joi.string().required(),
    }),
    requesterEmail: Joi.when("$create", {
        is: Joi.boolean().valid(true).required(),
        then: Joi.string()
            .email({
                minDomainSegments: 2,
                tlds: { allow: true },
            })
            .required(),
        otherwise: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: true },
        }),
    }),
}).messages({
    "string.base": `"{#value}" debe ser un tipo de texto`,
    "string.empty": `"{#value}" No puede ser un campo vacío`,
    "string.max": `"{#value}" Debe tener un máximo de {#limit}`,
    "email.base": `"{#value}" Debe ser un correo {#limit}`,
    "any.required": `"{#key}" Es un campo requerido`,
    "string.alphanum": `"{#value}"  debe ser un valor alfanumérico`,
});
