const transaksiModel = require('../models/transaksi')
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

exports.create = (data) =>
    new Promise((resolve, reject) => {
        transaksiModel.create(data)
            .then(() => {
                resolve({
                    sukses: true,
                    msg: 'Berhasil Transaksi'
                })
            }).catch(() => {
                reject({
                    sukses: false,
                    msg: 'Gagal Transaksi'
                })
            })
    })

exports.uploadBuktiBayar = (id, data) =>
    new Promise((resolve, reject) => {
        transaksiModel.updateOne({ _id: id }, { $set: data })
            .then(() => {
                resolve({
                    sukses: true,
                    msg: 'Berhasil Transaksi'
                })
            }).catch(() => {
                reject({
                    sukses: false,
                    msg: 'Gagal Transaksi'
                })
            })
    })

exports.getall = () =>
    new Promise((resolve, reject) => {
        try {
            transaksiModel.aggregate([
                {
                    $lookup: {
                        from: 'gitars',
                        localField: 'idBarang',
                        foreignField: '_id',
                        as: 'dataBarang'
                    }
                },
                {
                    $unwind: '$dataBarang'
                }
            ]).then((data) => {
                resolve({
                    sukses: true,
                    msg: 'Berhasil',
                    data: data
                })
            }).catch((e) => {
                reject({
                    sukses: false,
                    msg: 'Gagal',
                    data: []
                })
            })
        } catch (error) {
            console.log(error)
        }
    })

exports.getByIdUser = (id) =>
    new Promise((resolve, reject) => {
        try {
            transaksiModel.aggregate([
                {
                    $lookup: {
                        from: 'gitars',
                        localField: 'idBarang',
                        foreignField: '_id',
                        as: 'dataBarang'
                    }
                },
                {
                    $unwind: '$dataBarang'
                },
                {
                    $match: {
                        idUser: objectId(id)
                    }
                },
                { $sort: { _id: -1 } }
            ]).then((data) => {
                resolve({
                    sukses: true,
                    msg: 'Berhasil',
                    data: data
                })
            }).catch((e) => {
                reject({
                    sukses: false,
                    msg: 'Gagal',
                    data: []
                })
            })
        } catch (error) {
            console.log(error)
        }
    })

exports.getByIdUserLimit = (id, limit) =>
    new Promise((resolve, reject) => {
        try {
            transaksiModel.aggregate([
                {
                    $lookup: {
                        from: 'gitars',
                        localField: 'idBarang',
                        foreignField: '_id',
                        as: 'dataBarang'
                    }
                },
                {
                    $unwind: '$dataBarang'
                },
                {
                    $match: {
                        idUser: objectId(id)
                    }
                },
                { $sort: { _id: -1 } },
                {
                    $limit: 2,
                },

            ]).then((data) => {
                resolve({
                    sukses: true,
                    msg: 'Berhasil',
                    data: data
                })
            }).catch((e) => {
                reject({
                    sukses: false,
                    msg: 'Gagal',
                    data: []
                })
            })
        } catch (error) {
            console.log(error)
        }
    })