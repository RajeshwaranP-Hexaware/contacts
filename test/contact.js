"use strict";

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

let contactData = require('./data/contact');

chai.use(chaiHttp);

describe('CONTACT TEST CASE', () => {
    describe('/POST Add Contact', () => {
        it('it should Create new Contact', (done) => {
            chai.request(server)
                .post('/contact/add')
                .send(contactData.addContactData1)
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    done();
                });
        });

        it('it should Throw Error as contact name already exists', (done) => {
            chai.request(server)
                .post('/contact/add')
                .send(contactData.addContactData1)
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(500);
                    done();
                });
        });

        it('it should Throw Bad Request Error as invalid request', (done) => {
            chai.request(server)
                .post('/contact/add')
                .send({})
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(400);
                    done();
                });
        });

    });

    describe('/PUT Update Contact', () => {
        it('it should Update Contact', (done) => {
            chai.request(server)
                .put('/contact/update')
                .send(contactData.updateContactData)
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('it should Throw Error as contact name already exists', (done) => {
            contactData.updateContactData.name = contactData.addContactData1.name;
            chai.request(server)
                .post('/contact/update')
                .send(contactData.updateContactData)
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(500);
                    done();
                });
        });

        it('it should Throw Error as contact not exits', (done) => {
            contactData.updateContactData.name = contactData.addContactData1.name;
            contactData.updateContactData.id = "test";
            chai.request(server)
                .post('/contact/update')
                .send(contactData.updateContactData)
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(420);
                    done();
                });
        });

        it('it should Throw Bad Request Error as invalid request', (done) => {
            chai.request(server)
                .post('/contact/update')
                .send({})
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(400);
                    done();
                });
        });

    });

    describe('/GET Get Contact', () => {
        it('it should Get Contact', (done) => {
            chai.request(server)
                .get('/contact/' + data.getContactData.id)
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('contact');
                    done();
                });
        });

        it('it should Throw Error as contact not exits', (done) => {
            chai.request(server)
                .post('/contact/test')
                .send(contactData.updateContactData)
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(420);
                    done();
                });
        });
    });

    describe('/DELETE  Contact', () => {
        it('it should Delete Contact', (done) => {
            chai.request(server)
                .delete('/contact/' + data.getContactData.id)
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('contact');
                    done();
                });
        });

        it('it should Throw Error as contact not exits', (done) => {
            chai.request(server)
                .post('/contact/test')
                .send(contactData.updateContactData)
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(420);
                    done();
                });
        });
    });

    describe('/GET Get Contact List', () => {
        it('it should Get Contact List', (done) => {
            chai.request(server)
                .get('/contacts')
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('contactList');
                    done();
                });
        });

        it('it should Get Contact List should have length 1', (done) => {
            chai.request(server)
                .get('/contacts?index=0&limit=1')
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('contactList');
                    res.body.contactList.should.have.length(1);
                    done();
                });
        });
    });

    describe('/GET Search Contact List', () => {
        it('it should Get Contact List', (done) => {
            chai.request(server)
                .get('/contact_search?text=raj')
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('contactList');
                    done();
                });
        });

        it('it should Get Contact List should have length 1', (done) => {
            chai.request(server)
                .get('/contact_search?index=0&limit=1&text=raj')
                .end((err, res) => {
                    console.log("killer", JSON.stringify(res));
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('contactList');
                    res.body.contactList.should.have.length(1);
                    done();
                });
        });
    });
});
