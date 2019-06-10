const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = schema({
    _id: Schema.Types.ObjectId,
    name: String,
    emails: [{ type: String, email: String }],
    phoneNos: [{ type: String, phoneNo: String }],
    groups : [{type: Schema.Types.ObjectId, ref : 'ContactGroup'}]
}, {
        timestamps: true
    });

module.exports = mongoose.model('Contact', contactSchema);