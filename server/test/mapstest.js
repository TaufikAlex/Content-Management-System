const chai = require('chai');
const chaiHTTP = require('chai-http');
const server = require('../app');
const Data = require('../models/maps');
const should = chai.should();

chai.use(chaiHTTP);

describe('data', () => {
    beforeEach((done) => {

        let data = new Data({
            'tittle': "Trans studio Mall",
            'lat': -6.9261257,
            'lng': 107.6343728
        });
        data.save((err) => {

            done();
        })
    })
    afterEach((done) => {
        Data.collection.drop();
        done();
    });
    //========================POST SEARCH DATA   =========================
    it("Seharusnya sistem mengenbalikan nilai letter dan frequency dengan metode POST Maps", function (done) {
        chai.request(server)
            .post('/api/maps/search')
            .send({
                'tittle': "Trans studio Mall",
                'lat': -6.9261257,
                'lng': 107.6343728
            }).end(function (err, res) {
                console.log(res.body);

                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('tittle');
                res.body[0].should.have.property('lat');
                res.body[0].should.have.property('lng');
                res.body[0].tittle.should.equal("Trans studio Mall");
                res.body[0].lat.should.equal(-6.9261257);
                res.body[0].lng.should.equal(107.6343728);
                done();
            });
    });
    // ====================GET DATA ========================
    it("Seharusnya sistem menampilkan semua nilai dalam tabel data dengan metode GET Maps", (done) => {
        chai.request(server)
            .get('/api/maps/')
            .end((err, res) => {
                console.log(res.body);

                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('tittle');
                res.body[0].should.have.property('lat');
                res.body[0].should.have.property('lng');
                res.body[0].tittle.should.equal("Trans studio Mall");
                res.body[0].lat.should.equal(-6.9261257);
                res.body[0].lng.should.equal(107.6343728);
                done();
            })
    })

    // //=======================POST ADD DATA  Maps===========================
    it("seharusnya sistem menambahkan satu data dengan metode post  Maps", (done) => {
        chai.request(server)
            .post('/api/maps/')
            .send({
                'tittle': "Dufan",
                'lat': -6074484,
                'lng': 106.50006
            }).end((err, res) => {
                console.log(res.body);

                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.should.have.property('message');
                res.body.mapsCreated.tittle.should.equal('Dufan');
                res.body.mapsCreated.lat.should.equal(-6074484);
                res.body.mapsCreated.lng.should.equal(106.50006);
                done();
            })
    })
    // =======================EDIT DATA Maps==================
    it("seharusnya sistem merubah satu data dengan Metode PUT Maps", (done) => {
        chai.request(server)
            .get('/api/maps/')
            .end((err, res) => {
                chai.request(server)
                    .put('/api/maps/' + res.body[0]._id)
                    .send({
                        'tittle': "Ancol",
                        'lat': -6074484,
                        'lng': 106.50006
                    })
                    .end((err, res) => {
                        // console.log(res);

                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal('Maps have been Update Maps');
                        res.body.mapsUpdate.tittle.should.equal('Ancol');
                        res.body.mapsUpdate.lat.should.equal(-6074484);
                        res.body.mapsUpdate.lng.should.equal(106.50006);
                        res.body.should.have.property('mapsUpdate');
                        done();
                    })
            })

    })
    // // =======================Delete DATA Maps ==================

    it("seharusnya sistem menghapus satu data dengan Metode Delete Maps", (done) => {
        chai.request(server)
            .get('/api/maps/')
            .end((err, res) => {
                chai.request(server)
                    .delete('/api/maps/' + res.body[0]._id)
                    .send({
                        'tittle': "Trans studio Mall",
                        'lat': -6.9261257,
                        'lng': 107.6343728
                    }).end((err, res) => {
                        console.log(res.body);

                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal('Maps have been deleted Maps');
                        res.body.mapsRemove.tittle.should.equal('Trans studio Mall');
                        res.body.mapsRemove.lat.should.equal(-6.9261257);
                        res.body.mapsRemove.lng.should.equal(107.6343728);
                        res.body.should.have.property('mapsRemove');
                        done();
                    })
            })
    })
    // // =======================Find DATA  Maps==================

    it("seharusnya menampilkan satu data dengan menggunakan id dan metode GET  Maps", (done) => {
        chai.request(server)
            .get('/api/maps/')
            .end((err, res) => {
                chai.request(server)
                    .get('/api/maps/' + res.body[0]._id)
                    .send({
                        'tittle': "Trans studio Mall",
                        'lat': -6.9261257,
                        'lng': 107.6343728
                    }).end((err, res) => {
                        console.log(res.body);
                        
                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.should.have.property('message');
                        res.body.should.have.property('mapsFind');
                        res.body.success.should.equal(true);
                        res.body.message.should.equal('Maps Found Maps');
                        res.body.mapsFind[0].tittle.should.equal('Trans studio Mall');
                        res.body.mapsFind[0].lat.should.equal(-6.9261257);
                        res.body.mapsFind[0].lng.should.equal(107.6343728);
                        done();
                    })
            })
    })
})
