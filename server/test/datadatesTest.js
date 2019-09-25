const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const Todo = require('../models/datadates');

chai.use(chaiHTTP);

describe('data', () => {
    beforeEach((done) => {

        let todo = new Todo({
            letter: "2018-08-10",
            frequency: 4.3
        });
        todo.save((err) => {
            done();
        })
    })
    afterEach((done) => {
        Todo.collection.drop();
        done();
    });
    //========================POST SEARCH DATADATES =========================
    it("Seharusnya sistem mengembalikan nilai letter dan frequency dengan metode POST DataDates", function (done) {
        chai.request(server)
            .post('/api/datadates/search')
            .send({
                letter: "2018-08-10",
                frequency: 4.3,
            }).end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal("2018-08-10");
                res.body[0].frequency.should.equal(4.3);
                done();
            });
    });
    //====================GET DATADATES========================
    it("Seharusnya sistem menampilkan semua nilai dalam tabel data dengan metode GET DataDates", (done) => {
        chai.request(server)
            .get('/api/datadates/')
            .end((err, res) => {
                res.should.status(201);
                res.should.be.json;
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0].letter.should.equal('2018-08-10');
                res.body[0].frequency.should.equal(4.3);
                done();
            })
    })
    //=======================POST ADD DATA===========================
    it("seharusnya sistem menambahkan satu data dengan metode post DataDates ", (done) => {
        chai.request(server)
            .post('/api/datadates/')
            .send({
                letter: "2019-08-08",
                frequency: 4.1,
            }).end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.datadateCreate.letter.should.equal('2019-08-08');
                res.body.datadateCreate.frequency.should.equal(4.1);
                done();
            })
    })

    // =======================EDIT DATADATeS==================
    it("seharusnya sistem merubah satu data dengan Metode PUT DataDates", (done) => {
        chai.request(server)
            .get('/api/datadates/')
            .end((err, res) => {
                chai.request(server)
                    .put('/api/datadates/' + res.body[0]._id)
                    .send({
                        letter: "2018-08-10",
                        frequency: 4.3
                    })
                    .end((err, res) => {
                        // console.log(res);

                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal('data have been update');
                        res.body.datadateUpdate.letter.should.equal('2018-08-10');
                        res.body.datadateUpdate.frequency.should.equal(4.3);
                        res.body.should.have.property('datadateUpdate');
                        done();
                    })
            })

    })
    // =======================Delete DATADATES==================

    it("seharusnya sistem menghapus satu data dengan Metode Delete DataDates", (done) => {
        chai.request(server)
            .get('/api/datadates/')
            .end((err, res) => {
                chai.request(server)
                    .delete('/api/datadates/' + res.body[0]._id)
                    .send({
                        letter: "2019-08-08",
                        frequency: 4.1
                    }).end((err, res) => {
                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal('data have been deleted');
                        res.body.datadateRemove.letter.should.equal('2018-08-10');
                        res.body.datadateRemove.frequency.should.equal(4.3);
                        res.body.should.have.property('datadateRemove');
                        done();
                    })
            })
    })
    //=======================Find DATADates==================

    it("seharusnya menampilkan satu data dengan menggunakan id dan metode GET DataDates", (done) => {
        chai.request(server)
            .get('/api/datadates/')
            .end((err, res) => {
                chai.request(server)
                    .get('/api/datadates/' + res.body[0]._id)
                    .send({
                        letter: "2018-08-10",
                        frequency: 4.3
                    }).end((err, res) => {
                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.should.have.property('datadateFind');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal('data have been Find');
                        res.body.datadateFind[0].letter.should.equal('2018-08-10');
                        res.body.datadateFind[0].frequency.should.equal(4.3);
                        done();
                    })
            })
    })
})