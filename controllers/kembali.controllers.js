const { Op } = require("sequelize");
const Buku = require("../models/buku.models");
const Pinjam = require("../models/pinjam.models");
const User = require("../models/user.models");

exports.createKembali = async (req, res) => {
    try {
        const {id} = req.params
        const today = new Date().getTime()
        let message = ''
        const pinjam = await Pinjam.findOne({
            where: {id},
            include: [Buku, User]
        })
        const duration = Math.floor((parseInt(pinjam.batas_pinjam) - parseInt(today)) / 1000 / 60 /60 / 24)
        if (duration < 0) {
            await User.update({
                skor_kredit: Math.abs(duration) * 3
            }, {where: {id: pinjam.user.id}})
            message = `Pengembalian telat ${Math.abs(duration)} hari, ${pinjam.user.nama} menerima hukuman pengurangan skor kredit`
        } else if (duration < -7) {
            await User.update({
                skor_kredit: 0
            }, { where: { id: pinjam.user.id } })
            message = `Buku hilang, ${pinjam.user.nama} diblokir`
        }
        await Pinjam.update({
            status: false,
            tgl_kembali: today,
            ket_pengembalian: message
        }, {
            where: {id}
        })
        await Buku.update({
            status: true
        }, {
            where: {id: pinjam.buku.id}
        })
        res.status(200).json({
            message: "pengembalian buku berhasil" ,
        })
    } catch (error) {
        console.error(error);
    }
}

exports.getKembali = async (req, res) => {
    try {
        let search = req.query.search_query || ""
        let page = parseInt(req.query.page) || 0
        let limit = parseInt(req.query.limit) || 10
        let offset = limit * page
        // jumlah data 
        const totalRows = await Pinjam.count({
            where: {
                id: { [Op.like]: '%' + search + '%' },
                status: false
            }
        })
        const totalPage = Math.ceil(totalRows / limit)
        // cari anggota sesuai nama atau email
        const kembali = await Pinjam.findAll({
            where: {
                [Op.or]: [
                    {
                        id: { [Op.like]: '%' + search + '%' }
                    }, {
                        userId: { [Op.like]: '%' + search + '%' }
                    }
                ],
                status: false
            },
            offset,
            limit,
            include: [User, Buku]
        })
        res.status(200).json({
            data: kembali,
            message: "data pengembalian buku perpustakaan bspji palembang",
            metadata: {
                page, limit, totalRows, totalPage
            }
        })
    } catch (error) {
        console.error(error);
    }
}

exports.getKembaliById = async (req, res) => {
    try {
        const {id} = req.params
        const pinjam = await Pinjam.findOne({
            where: {id},
            include: [Buku, User]
        })
        res.status(200).json({
            message: `data peminjman buku ${pinjam.buku.judul}`,
            data: pinjam
        })
    } catch (error) {
        console.error(error);
    }
}