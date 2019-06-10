"use strict";
const express = require('express');
const contactHandler = require('../handlers/contacts');
const contactGroupHandler = require('../handlers/contactGroups');

let router = express();

router.post('/contact/add', (req, res) => {
    contactHandler.addContact(req, res);
});

router.put('/contact/update', (req, res) => {
    contactHandler.updateContact(req, res);
});

router.get('/contact:contactId', (req, res) => {
    contactHandler.getContact(req, res);
});

router.delete('/contact:contactId', (req, res) => {
    contactHandler.deleteContact(req, res);
});

router.get('/contact/list', (req, res) => {
    contactHandler.listContact(req, res);
});

router.get('/contact/search', (req, res) => {
    contactHandler.searchContact(req, res);
});

router.post('/contact_group/add', (req, res) => {
    contactGroupHandler.addContactGroup(req, res);
});

router.put('/contact_group/update', (req, res) => {
    contactGroupHandler.updateContactGroup(req, res);
});

router.get('/contact_group:contactId', (req, res) => {
    contactGroupHandler.getContactGroup(req, res);
});

router.delete('/contact_group:contactId', (req, res) => {
    contactGroupHandler.deleteContactGroup(req, res);
});

router.get('/contact_group/list', (req, res) => {
    contactGroupHandler.listContactGroup(req, res);
});

module.exports = router;