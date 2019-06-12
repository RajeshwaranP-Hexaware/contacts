"use strict";
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

let ContactGroupsModel = require('../models/contactGroups');
let contactGroup = {};

contactGroup.addContactGroup = async (req, res, next) => {
    try {
        const reqData = {
            name: req.body.name,
            contacts: req.body.contactIds
        };
        let contactGroupData = new ContactGroupsModel(reqData);
        const createdData = await contactGroupData.save();
        res.status(200);
        res.json({ "message": "Contact Group Added Successfully", "id": createdData._id }).end();
    } catch (e) {
        console.log(e);
        return next(e);
    }
};

module.exports = contactGroup;