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

module.exports = contacts;