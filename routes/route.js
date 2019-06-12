"use strict";
const express = require('express');
const validator = require('express-joi-validation')({ passError: true })

const contactHandler = require('../handlers/contacts');
const contactGroupHandler = require('../handlers/contactGroups');
const schema = require('../schema/schema');

let router = express();

router.post('/contact/add', validator.body(schema.contactSchema), (req, res, next) => {
    contactHandler.addContact(req, res, next);
});

router.put('/contact/update', validator.body(schema.updateContactSchema), (req, res, next) => {
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

router.post('/contact_group/add', validator.body(schema.contactGroupSchema), (req, res, next) => {
    contactGroupHandler.addContactGroup(req, res, next);
});

router.put('/contact_group/update', validator.body(schema.updateContactGroupSchema), (req, res, next) => {
    contactGroupHandler.updateContactGroup(req, res, next);
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