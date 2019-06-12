"use strict";
const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation')({ passError: true })

const contactHandler = require('../handlers/contacts');
const contactGroupHandler = require('../handlers/contactGroups');

let router = express();

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

router.post('/contact/add', validator.body(contactSchema), (req, res, next) => {
    contactHandler.addContact(req, res, next);
});

router.put('/contact/update', (req, res, next) => {
    contactHandler.updateContact(req, res, next);
});

router.get('/contact/:id', (req, res, next) => {
    contactHandler.getContact(req, res, next);
});

router.delete('/contact/:id', (req, res, next) => {
    contactHandler.deleteContact(req, res, next);
});

router.get('/contacts', (req, res, next) => {
    contactHandler.listContact(req, res, next);
});

router.get('/contact_search', (req, res, next) => {
    contactHandler.searchContact(req, res);
});

router.post('/contact_group/add', (req, res, next) => {
    contactGroupHandler.addContactGroup(req, res, next);
});

router.put('/contact_group/update', (req, res, next) => {
    contactGroupHandler.updateContactGroupName(req, res, next);
});

router.put('/contact_group/update_members', (req, res, next) => {
    contactGroupHandler.updateContactGroupMembers(req, res, next);
});

router.get('/contact_group/:id', (req, res, next) => {
    contactGroupHandler.getContactGroup(req, res, next);
});

router.delete('/contact_group/:id', (req, res, next) => {
    contactGroupHandler.deleteContactGroup(req, res, next);
});

router.get('/contact_groups', (req, res, next) => {
    contactGroupHandler.listContactGroup(req, res, next);
});

module.exports = router;