const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactGroupSchema = Schema({
    name: { type: String, required: true, unique: true },
    contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact', required: true }]
}, {
        timestamps: true
    });

module.exports = mongoose.model('ContactGroup', contactGroupSchema);