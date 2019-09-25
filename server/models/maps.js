const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mapsSchema = new Schema({
  tittle: { type: String },
  lat: { type: Number },
  lng: { type: Number }
});

module.exports = mongoose.model('Maps', mapsSchema);