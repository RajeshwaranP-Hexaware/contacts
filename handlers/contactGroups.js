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

contactGroup.updateContactGroupName = async (req, res, next) => {
    try {
        const reqObj = req.body;
        let isValidId = await validateId(reqObj.id);
        if (!isValidId) {
            res.status(421);
            res.json({ "message": "Contact Group Not Found" }).end();
        }
        let contactGroupData = await ContactGroupsModel.findOne({ _id: mongoose.Types.ObjectId(reqObj.id) })
        console.log('FEDDF ', contactGroupData);
        if (contactGroupData) {
            contactGroupData.name = reqObj.name;
            await contactGroupData.save();
            res.status(200);
            res.json({ "message": "Contact Group Updated Successfully" }).end();
        } else {
            res.status(421);
            res.json({ "message": "Contact Group Not Found" }).end();
        }
    } catch (e) {
        console.log('PPPPP ', JSON.stringify(e));
        return next(e);
    }
};


contactGroup.updateContactGroupMembers = async (req, res, next) => {
    try {
        const reqObj = req.body;
        let isValidId = await validateId(reqObj.id);
        if (!isValidId) {
            res.status(421);
            res.json({ "message": "Contact Group Not Found" }).end();
        }
        let contactGroupData = await ContactGroupsModel.findOne({ _id: mongoose.Types.ObjectId(reqObj.id) })
        console.log('FEDDF ', contactGroupData);
        if (contactGroupData) {
            if (reqObj.type == "ADD") {
                contactGroupData.contacts.push.apply(contactGroupData.contacts, reqObj.contactIds);
                contactGroupData.contacts = _.uniq(contactGroupData.contacts);
            } else {
                contactGroupData.contacts = _.difference(contactGroupData.contacts, reqObj.contactIds);
            }
            await contactGroupData.save();
            res.status(200);
            res.json({ "message": "Contact Group Updated Successfully" }).end();
        } else {
            res.status(421);
            res.json({ "message": "Contact Group Not Found" }).end();
        }
    } catch (e) {
        console.log('PPPPP ', JSON.stringify(e));
        return next(e);
    }
};

contactGroup.getContactGroup = async (req, res, next) => {
    try {
        const contactGroupId = req.params.id;
        let isValidId = await validateId(reqObj.id);
        if (!isValidId) {
            res.status(421);
            res.json({ "message": "Contact Group Not Found" }).end();
        }
        const contactGroupData = await ContactGroupsModel.findOne({ _id: mongoose.Types.ObjectId(contactGroupId) }).populate('contacts');
        if (contactGroupData) {
            const response = {
                contactGroup: contactGroupData
            };
            res.status(200);
            res.json(response).end();
        } else {
            res.status(421);
            res.json({ "message": "Contact Group Not Found" }).end();
        }
    } catch (e) {
        return next(e);
    }
};

contactGroup.deleteContactGroup = async (req, res, next) => {
    try {
        const contactGroupId = req.params.id;
        let isValidId = await validateId(reqObj.id);
        if (!isValidId) {
            res.status(421);
            res.json({ "message": "Contact Group Not Found" }).end();
        }
        const deleteCount = await ContactGroupsModel.deleteOne({ _id: mongoose.Types.ObjectId(contactGroupId) });
        if (deleteCount && deleteCount.n) {
            res.status(200);
            res.json({ "message": "Contact Group Deleted Successfully" }).end();
        } else {
            res.status(421);
            res.json({ "message": "Contact Group Not Found" }).end();
        }
    } catch (e) {
        return next(e);
    }
};

contactGroup.listContactGroup = async (req, res, next) => {
    try {
        const query = req.query || {};
        const index = parseInt(query.index) || 0;
        const limit = parseInt(query.limit) || 10;
        let contactGroupList = await ContactGroupsModel.find().populate('contacts').sort({ createdAt: -1 }).skip(index).limit(limit);
        res.status(200);
        res.json({ contactGroupList: contactGroupList }).end();
    } catch (e) {
        return next(e);
    }
};

module.exports = contactGroup;