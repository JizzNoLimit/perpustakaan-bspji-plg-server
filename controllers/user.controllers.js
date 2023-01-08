const User = require('../models/user.models')
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

// POST user
exports.createUser = async (req, res) => {
    try {
        const {nama, email, password, role} = req.body
        // Bcrypt password
        const salt = bcrypt.genSaltSync(10);
        const has = bcrypt.hashSync(password, salt)
        // check apakah email sudah digunakan
        const check = await User.findOne({
            where: {email}
        })
        if (check) {
            return res.status(409).json({message: 'email telah terdaftar'})
        }
        await User.create({
            id: Date.now(),
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
                ]
            }
        })
        const totalPage = Math.ceil(totalRows / limit)
        // cari anggota sesuai nama atau email
        const users = await User.findAll({
            attributes: ['id', 'nama', 'email', 'role', 'skor_kredit', 'status', 'createdAt'],
            where: {
                [Op.or]: [
                    {
                        nama: { [Op.like]: '%' + search + '%' }
                    }, {
                        email: { [Op.like]: '%' + search + '%' }
                    }
                ]
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
            attributes: ['id', 'nama', 'email', 'role', 'skor_kredit', 'status', 'createdAt'],
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
        const { nama, email, password, role } = req.body

        const user = await User.findByPk(id, { attributes: ['id'] })
        if (!user) {
            return res.status(404).json({ message: `id=${id} tidak di temukan` })
        }
        // Bcrypt password
        const salt = bcrypt.genSaltSync(10);
        const has = bcrypt.hashSync(password, salt)

        await User.update({
            where: { id }
        }, {
            nama,
            email,
            password: has,
            role,
            status: true
        })

        res.status(200).json({
            message: `data berhasil di ubah`
        })
    } catch (error) {
        console.error(error)
    }
}

// DELETE user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

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