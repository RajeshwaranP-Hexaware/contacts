"use strict";
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

let ContactModel = require('../models/contacts');
let contacts = {};

contacts.addContact = async (req, res, next) => {
    try {
        const reqData = {
            name: req.body.name,
            emails: req.body.emails,
            phoneNos: req.body.phoneNos
        };
        let contactData = new ContactModel(reqData);
        const createdData = await contactData.save();
        res.status(200);
        res.json({ "message": "Contact Added Successfully", "id": createdData._id }).end();
    } catch (e) {
        console.log(e);
        return next(e);
    }
};

/**
 * Validate id whether mongo object id and returns true or false 
 */
const validateId = (id) => {
    return new Promise((resolve, reject) => {
        if (!ObjectId.isValid(id)) {
            return resolve(true);
        } else {
            return resolve(false);
        }
    })
}

contacts.updateContact = async (req, res, next) => {
    try {
        const reqObj = req.body;
        let isValidId = await validateId(reqObj.id);
        if (!isValidId) {
            res.status(420);
            res.json({ "message": "Contact Not Found" }).end();
        }
        let contactData = await ContactModel.findOne({ _id: mongoose.Types.ObjectId(reqObj.id) })
        console.log('FEDDF ', contactData);
        if (contactData) {
            contactData.name = reqObj.name;
            contactData.emails = reqObj.emails;
            contactData.phoneNos = reqObj.phoneNos;
            await contactData.save();
            res.status(200);
            res.json({ "message": "Contact Updated Successfully" }).end();
        } else {
            res.status(420);
            res.json({ "message": "Contact Not Found" }).end();
        }
    } catch (e) {
        console.log('PPPPP ', JSON.stringify(e));
        return next(e);
    }
};

contacts.getContact = async (req, res, next) => {
    try {
        const contactId = req.params.id;
        let isValidId = await validateId(contactId);
        if (!isValidId) {
            res.status(420);
            res.json({ "message": "Contact Not Found" }).end();
        }
        const contactData = await ContactModel.findOne({ _id: mongoose.Types.ObjectId(contactId) });
        if (contactData) {
            const response = {
                contact: contactData
            };
            res.status(200);
            res.json(response).end();
        } else {
            res.status(420);
            res.json({ "message": "Contact Not Found" }).end();
        }
    } catch (e) {
        console.log('KKKKK ', JSON.stringify(e));
        return next(e);
    }
};

module.exports = contacts;