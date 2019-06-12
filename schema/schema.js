const Joi = require('joi');

let schema = {};

let contactSchema = Joi.object({
    name: Joi.string().required(),
    emails: Joi.array().items(Joi.object({
        type: Joi.string().valid(["WORK", "PERSONAL"]).required(),
        email: Joi.string().email().required()
    })).required(),
    phoneNos: Joi.array().items(Joi.object({
        type: Joi.string().valid(["WORK", "PERSONAL"]).required(),
        phoneNo: Joi.string().regex(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/).required()
    })).required()
});

schema.contactSchema = contactSchema;

schema.updateContactSchema = Joi.object({
    id: Joi.string().required()
}).concat(contactSchema);

schema.contactGroupSchema = Joi.object({
    name: Joi.string().required(),
    contactIds: Joi.array().items(Joi.string().required()).required()
});

schema.updateContactGroupSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    contactIds: Joi.array().items(Joi.string().required()).required()
});

module.exports = schema;