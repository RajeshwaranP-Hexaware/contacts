const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactGroupSchema = schema({
    _id: Schema.Types.ObjectId,
    name: String,
    contacts : [{type: Schema.Types.ObjectId, ref : 'Contact'}]
}, {
        timestamps: true
});

module.exports = mongoose.model('ContactGroup', contactGroupSchema);