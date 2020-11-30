import * as Joi from '@hapi/joi'

export const clientSchema = Joi.object({
  names: Joi.when("$update", {
    is: Joi.boolean().valid(true).required(),
    then: Joi.string().max(30),
    otherwise: Joi.string().max(30).required(),
  }),
  lastNames: Joi.when("$update", {
    is: Joi.boolean().valid(true).required(),
    then: Joi.string().max(30),
    otherwise: Joi.string().max(30).required(),
  }),
  address: Joi.when("$update", {
    is: Joi.boolean().valid(true).required(),
    then: Joi.string().max(30),
    otherwise: Joi.string().max(30).required(),
  }),

  isEnterprise: Joi.boolean(),

  commercialReason: Joi.when("isEnterprise", {
    is: '1',
    then: Joi.string().required(),
    otherwise: Joi.string().empty(''),
  }),


  socialReason: Joi.when("isEnterprise", {
    is: '1',
    then: Joi.string().required(),
    otherwise: Joi.string().empty(''),
  }),

  identification: Joi.string().max(30).valid("V", "G", "E", "J"),

  state: Joi.when("$update", {
    is: Joi.boolean().valid(true).required(),
    then: Joi.string().max(30),
    otherwise: Joi.string().max(30).required(),
  }),
  municipality: Joi.when("$update", {
    is: Joi.boolean().valid(true).required(),
    then: Joi.string().max(30),
    otherwise: Joi.string().max(30).required(),
  }),
  dni: Joi.when("$update", {
    is: Joi.boolean().valid(true).required(),
    then: Joi.string().max(30),
    otherwise: Joi.string().max(30).required(),
  }),

  city: Joi.when("$update", {
    is: Joi.boolean().valid(true).required(),
    then: Joi.string().max(30),
    otherwise: Joi.string().max(30).required(),
  }),
  phone: Joi.string().max(30),

  email: Joi.when("$update", {
    is: Joi.boolean().valid(true).required(),
    then: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: true },
    }),
    otherwise: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: true },
      })
      .required(),
  }),
}).messages({
  "string.base": `"{#value}" debe ser un tipo de texto`,
  "string.empty": `"{#key}" No puede ser un campo vacío`,
  "string.max": `"{#value}" Debe tener un máximo de {#limit}`,
  "any.required": `"{#key}" Es un campo requerido`,
  "string.alphanum": `"{#value}"  debe ser un valor alfanumérico`,
});
