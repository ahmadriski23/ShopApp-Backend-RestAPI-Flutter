const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gitarSchema = new Schema({
    nama: {
        type: String
    },
    tipe: {
      type: String
    },
    harga: {
      type: Number
    },
    merk: {
      type: String
    },
    gambar: {
      type: String
    }
})

module.exports = mongoose.model('gitar', gitarSchema)