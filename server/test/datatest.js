const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const Data = require('../models/data');
const should = chai.should();

chai.use(chaiHTTP);

describe('data', () => {
    beforeEach((done) => {

        let data = new Data({
            letter: "A",
            frequency: 1.1
        });
        data.save((err) => {

            done();
        })
    })
    afterEach((done) => {
        Data.collection.drop();
        done();
    });
    //========================POST SEARCH DATA =========================
    it("Seharusnya sistem mengenbalikan nilai letter dan frequency dengan metode POST", function (done) {
        chai.request(server)
            .post('/api/data/search')
            .send({
                letter: "A",
                frequency: 1.1,
            }).end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal("A");
                res.body[0].frequency.should.equal(1.1);
                done();
            });
    });
    //====================GET DATA========================
    it("Seharusnya sistem menampilkan semua nilai dalam tabel data dengan metode GET", (done) => {
        chai.request(server)
            .get('/api/data/')
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal('A');
                res.body[0].frequency.should.equal(1.1);
                done();
            })
    })

    //=======================POST ADD DATA===========================
    it("seharusnya sistem menambahkan satu data dengan metode post ", (done) => {
        chai.request(server)
            .post('/api/data/')
            .send({
                letter: "A",
                frequency: 2.1,
            }).end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.dataCreated.letter.should.equal('A');
                res.body.dataCreated.frequency.should.equal(2.1);
                done();
            })
    })
    // =======================EDIT DATA==================
    it("seharusnya sistem merubah satu data dengan Metode PUT", (done) => {
        chai.request(server)
            .get('/api/data/')
            .end((err, res) => {
                chai.request(server)
                    .put('/api/data/' + res.body[0]._id)
                    .send({
                        letter: "A",
                        frequency: 2.8
                    })
                    .end((err, res) => {
                        // console.log(res);

                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal('Error cuk');
                        res.body.dataUpdated.letter.should.equal('A');
                        res.body.dataUpdated.frequency.should.equal(2.8);
                        res.body.should.have.property('dataUpdated');
                        done();
                    })
            })

    })
    // =======================Delete DATA==================

    it("seharusnya sistem menghapus satu data dengan Metode Delete", (done) => {
        chai.request(server)
            .get('/api/data/')
            .end((err, res) => {
                chai.request(server)
                    .delete('/api/data/' + res.body[0]._id)
                    .send({
                        letter: "A",
                        frequency: 2.8
                    }).end((err,res) =>{
                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal('data have been deleted');
                        res.body.dataRemoved.letter.should.equal('A');
                        res.body.dataRemoved.frequency.should.equal(1.1);
                        res.body.should.have.property('dataRemoved');
                        done();
                    })
            })
    })
    // =======================Find DATA==================

    it("seharusnya menampilkan satu data dengan menggunakan id dan metode GET",(done)=>{
        chai.request(server)
            .get('/api/data/')
            .end((err, res) =>{
                chai.request(server)
                    .get('/api/data/'+ res.body[0]._id)
                    .send({
                        letter: "A",
                        frequency:1.1
                    }).end((err, res) => {
                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.should.have.property('datafind');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal('data have been Find');
                        res.body.datafind.letter.should.equal('A');
                        res.body.datafind.frequency.should.equal(1.1);
                        done();
                    })
            })
    })
})
