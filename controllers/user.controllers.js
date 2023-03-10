const User = require('../models/user.models')
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const Pinjam = require('../models/pinjam.models');
const Buku = require('../models/buku.models');

// POST user
exports.createUser = async (req, res) => {
    try {
        const {username, nama, email, password, role} = req.body
        // check apakah email sudah digunakan
        const check = await User.findOne({
            where: {
                [Op.or]: [
                    {username}, {email}
                ]
            }
        })
        // Bcrypt password
        if (check) return res.status(409).json({message: 'email telah terdaftar'})
        const salt = bcrypt.genSaltSync(10);
        const has = bcrypt.hashSync(password, salt)
        await User.create({
            id: Date.now(),
            username,
            nama,
            email,
            password: has,
            role,
            skor_kredit: 100,
            status: true
        })
        res.status(201).json({
            message: 'user berhasil di buat'
        })
    } catch (error) {
        console.error(error)
    }
}

// GET all user
exports.getUsers = async (req, res) => {
    try {
        let search = req.query.search_query || ""
        let page = parseInt(req.query.page) || 0
        let limit = parseInt(req.query.limit) || 10
        let offset = limit * page
        // jumlah data 
        const totalRows = await User.count({
            where: {
                [Op.or]: [
                    {
                        nama: {[Op.like]: '%'+search+'%'}
                    }, {
                        email: { [Op.like]: '%' + search + '%' }
                    }
                ],
                role: 'user'
            }
        })
        const totalPage = Math.ceil(totalRows / limit)
        // cari anggota sesuai nama atau email
        const users = await User.findAll({
            attributes: ['id', 'username', 'nama', 'email', 'role', 'skor_kredit', 'status', 'createdAt'],
            where: {
                [Op.or]: [
                    {
                        nama: { [Op.like]: '%' + search + '%' }
                    }, {
                        email: { [Op.like]: '%' + search + '%' }
                    }
                ],
            },
            offset ,
            limit,
            order: [
                ['createdAt', 'ASC']
            ]
            
        })
        
        res.status(200).json({
            data: users, 
            message: "anggota perpustakaan bspji palembang",
            metadata: {
                page, limit, totalRows, totalPage
            }
        })
    } catch (error) {
        console.error(error)
    }
}

// GET user by id
exports.getUserById = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findByPk(id, {
            attributes: {exclude: ['password']},
        })
        if (!user) {
            return res.status(404).json({message: `id=${id} tidak di temukan`})
        }
        res.status(200).json({
            data: user,
            message: `anggota yang memiliki id ${id}`
        })
    } catch (error) {
        console.error(error)
    }
}

// UPDATE user 
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { username, nama, email, role } = req.body

        await User.update({
            username,
            nama,
            email,
            role,
            status: true
        }, {
            where: { id }
        })

        res.status(200).json({
            message: `data berhasil di ubah ${id}`
        })
    } catch (error) {
        console.error(error)
    }
}

// DELETE user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.query

        const user = await User.findByPk(id, { attributes: ['id'] })
        if (!user) {
            return res.status(404).json({ message: `id=${id} tidak ditemukan` })
        }

        await User.destroy({
            where: { id }
        })

        res.status(200).json({
            message: `data berhasil di hapus`
        })
    } catch (error) {
        console.error(error)
    }
}

exports.getUserRealation = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [Buku, Pinjam]
        })
        if (!user) {
            return res.status(404).json({ message: `id=${id} tidak di temukan` })
        }
        res.status(200).json({
            data: user,
            message: `anggota yang memiliki id ${id}`
        })
    } catch (error) {
        console.error(error)
    }
}

exports.getDataUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findOne({
            where: {
                id
            }
        })
        const pinjamCount = await Pinjam.count({
            where: {
                userId: id
            },
        })
        const pinjam = await Pinjam.findAll({
            where: {
                userId: id
            },
            include: [User, Buku]
        })

        res.status(200).json({
            pinjam,
            pinjamCount

        })
    } catch (error) {
        console.error(error);
    }
}