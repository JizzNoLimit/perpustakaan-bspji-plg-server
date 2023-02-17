const { Op, where } = require('sequelize')
const Buku = require('../models/buku.models')
const { unlinkSync } = require('node:fs');


exports.createBuku = async (req, res) => {
    try {
        if (!req.file) {
            //menetapkan file default
            req.file = {
                originalname: 'default.jpg',
                path: 'buku/default.jpg',
                filename: 'default.jpg'
            }
        }
        const {no_panggil, judul, pengarang, penerbit,
            isbn, bahasa, tahun, edisi, fisik, kategori, desk
        } = req.body
        await Buku.create({
            id: Date.now(),
            no_panggil, judul, pengarang, penerbit,
            img_url: req.file.filename,
            status: true,
            isbn, bahasa, tahun, edisi: parseInt(edisi),
            fisik, kategori, desk,
        })
        res.status(200).json({
            message: 'Data berhasil ditambahakan'
        })
    } catch (error) {
        console.error(error)
    }
}

exports.getBuku = async (req, res) => {
    try {
        let search = req.query.search_query || ""
        let page = parseInt(req.query.page) || 0
        let limit = parseInt(req.query.limit) || 10
        let offset = limit * page
        // jumlah data 
        const totalRows = await Buku.count({
            where: {
                [Op.or]: [
                    {
                        judul: { [Op.like]: '%' + search + '%' }
                    }, {
                        no_panggil: { [Op.like]: '%' + search + '%' }
                    }
                ]
            }
        })
        const totalPage = Math.ceil(totalRows / limit)
        // cari anggota sesuai nama atau email
        const buku = await Buku.findAll({
            where: {
                [Op.or]: [
                    {
                        judul: { [Op.like]: '%' + search + '%' }
                    }, {
                        no_panggil: { [Op.like]: '%' + search + '%' }
                    }
                ]
            },
            offset,
            limit,
            order: [
                ['createdAt', 'ASC']
            ],
        })
        res.status(200).json({
            data: buku,
            message: "buku perpustakaan bspji palembanAksig",
            metadata: {
                page, limit, totalRows, totalPage
            }
        })
    } catch (error) {
        console.error(error)   
    }
}

exports.getBukuById = async (req, res) => {
    try {
        const {id} = req.params
        const buku = await Buku.findByPk(id)
        res.status(200).json({
            data: buku,
            message: "buku perpustakaan bspji palembang by id",
        })
    } catch (error) {
        console.error(error)
    }
}


exports.updateBuku = async (req, res) => {
    try {
        const {id} = req.query
        const { no_panggil, judul, pengarang, penerbit,
            isbn, bahasa, tahun, edisi, fisik, kategori, desk
        } = req.body
        const buku = await Buku.findByPk(id)
        if (req.file) {
            unlinkSync(`./public/uploads/cover/${buku.img_url}`)
        }
        await Buku.update({
            no_panggil, judul, pengarang, penerbit,
            isbn, bahasa, tahun, edisi: parseInt(edisi),
            fisik, kategori, desk,
        },{
            where: {id}
        })
        res.status(200).json({
            message: "berhasil update data buku",
        })
    } catch (error) {
        console.log(error)
    }
}

exports.deleteBuku = async (req, res) => {
    try {
        const { id } = req.query
        const buku = await Buku.findByPk(id)
        if (buku.img_url !== 'default.jpg') {
            unlinkSync(`./public/uploads/cover/${buku.img_url}`); 
        }
        await Buku.destroy({
            where: {id}
        })
        res.status(200).json({
            message: "berhasil menghapus data buku",
        })
    } catch (error) {
        console.error(error)
    }
}

// Cari buku
exports.searchBuku = async (req, res) => {
    try {
        const keyword = req.query.search_query
        const buku = await Buku.findAll({
            where: {
                [Op.or]: [
                    {
                        judul: { [Op.like]: '%' + keyword + '%' }
                    }, {
                        no_panggil: { [Op.like]: '%' + keyword + '%' }
                    }, {
                        kategori: { [Op.like]: '%' + keyword + '%' }
                    }
                ]
            },
        })
        res.status(200).json({
            data: buku,
            message: "Hasil pencarian",
        })
    } catch (error) {
        console.error(error)   
    }
}