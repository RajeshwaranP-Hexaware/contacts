const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = Schema({
    name: { type: String, required: true, unique: true },
    emails: [{ type: { type: String }, email: { type: String } }],
    phoneNos: [{ type: { type: String }, phoneNo: { type: String } }]
}, {
        timestamps: true
    });

module.exports = mongoose.model('Contact', contactSchema);