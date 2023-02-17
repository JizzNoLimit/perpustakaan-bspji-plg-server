const { Op } = require("sequelize")
const Buku = require("../models/buku.models")
const Pinjam = require("../models/pinjam.models")
const User = require("../models/user.models")

// POST User
exports.createPinjam = async (req, res) => {
    try {
        const {userId, bukuId} = req.body
        const id = Date.now()
        let today = new Date()
        let batas_pinjam = new Date()
        batas_pinjam.setDate(today.getDate() + 7)
        // Check user apakah skor kredit user bagus atau tidak
        const userCheck = await User.findOne({
            where: {
                id: userId
            }
        })
        if (userCheck.skor_kredit < 90) return res.status(409).json({ 
            message: 'Tidak dapat melakukan peminjaman karena skor kredit rendah' 
        })
        // Check buku
        const bukuCheck = await Buku.findOne({
            where: {id: bukuId}
        })
        if (!bukuCheck.status) return res.status(409).json({
            status: 409,
            message: 'Maaf, Buku lagi dipinjam orang lain'
        })
        await Pinjam.upsert({
            id,
            tgl_pinjam: parseInt(today.getTime()),
            batas_pinjam: parseInt(batas_pinjam.getTime()),
            status: true,
            userId,
            bukuId,
        })
        await Buku.update({
            status: false
        }, {
            where: { id: bukuId }
        })
        res.status(201).json({
            status: 200,
            message: `Peminjaman berhasil`,
        })
    } catch (error) {
        console.error(error)
    }
}

// GET pinjam
exports.getPinjam = async (req, res) => {
    try {
        let search = req.query.search_query || ""
        let page = parseInt(req.query.page) || 0
        let limit = parseInt(req.query.limit) || 10
        let offset = limit * page
        // jumlah data 
        const totalRows = await Pinjam.count({
            where: {
                id: { [Op.like]: '%' + search + '%' },
                status: true
            }
        })
        const totalPage = Math.ceil(totalRows / limit)
        // cari anggota sesuai nama atau email
        const pinjam = await Pinjam.findAll({
            where: {
                [Op.or]: [
                    {
                        id: { [Op.like]: '%' + search + '%' }
                    }, {
                        userId: { [Op.like]: '%' + search + '%' }
                    }
                ],
                status: true
            },
            offset,
            limit,
            include: [User, Buku]
        })

        res.status(200).json({
            data: pinjam,
            message: "peminjaman perpustakaan bspji palembang",
            metadata: {
                page, limit, totalRows, totalPage
            }
        })
    } catch (error) {
        console.error(error)
    }
}

// GET pinjam
exports.getPinjamById = async (req, res) => {
    try {
        const { id } = req.params
        const pinjam = await Pinjam.findOne({
            where: {
                id
            },
            include: [User, Buku]
        })
        if (!pinjam) {
            return res.status(404).json({ message: `id=${id} tidak di temukan` })
        }
        res.status(200).json({
            data: pinjam,
            message: `No peminjaman ${id}`
        })
    } catch (error) {
        console.error(error)
    }
}

// DELETE pinjam
exports.deletePinjam = async (req, res) => {
    try {
        const { id, bukuId } = req.query

        const pinjam = await Pinjam.findByPk(id, { attributes: ['id'] })
        if (!pinjam) {
            return res.status(404).json({ message: `id=${id} tidak ditemukan` })
        }

        await Pinjam.destroy({
            where: { id }
        })
        await Buku.update({
            status: true
        }, {
            where: { id: bukuId }
        })

        res.status(200).json({
            message: `data berhasil di hapus`
        })
    } catch (error) {
        console.error(error)
    }
}