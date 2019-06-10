const mongoose = require('mongoose');

const getMongooseConnection = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
            dbName: 'Contacts',
            reconnectTries: 2,
            reconnectInterval: 500,
            bufferMaxEntries: 0,
            keepAlive: true
        }).then(() => {
            resolve(mongoose)
        }, (err) => {
            reject(err)
        }).catch(e => {
            reject(e)
        })
    })
}

module.exports = getMongooseConnection;