const User = require('../models/user.models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({
            where: {email}
        })
        if (!user) {return res.status(401).json({message: "email tidak ditemukan"})}
        const match = await bcrypt.compare(password, user.password)
        if (!match) { return res.status(401).json({ message: "password salah" }) }
        const token = jwt.sign({
            id: user.id,
            nama: user.nama,
            username: user.username,
            email: user.email,
            role: user.role,
        }, process.env.TOKEN_SECRET,{
            expiresIn: '1d'
        })
        res.status(200).json({
            token,
            username: user.username,
            role: user.role,
            message: 'Login berhasil'
        })        
    } catch (error) {
        console.error(error)
    }
}


exports.register = async (req, res) => {
    try {
        const {username, nama, email, password} = req.body
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {
                        username: username
                    },
                    {
                        email: email
                    }
                ]
            }
        })
    } catch (error) {
        
    }
}













exports.reister = async (req, res) => {
    const {nama, email, password} = req.body
    const user = await User.findOne({
        where: { email }
    })
    if (user) return res.status(401).json({ message: "email sudah terdaftar" })
    // Bcrypt password
    const salt = bcrypt.genSaltSync(10);
    const has = bcrypt.hashSync(password, salt)
    await User.create({
        id: Date.now(),
        nama,
        email,
        password: has,
        role: 'user',
        skor_kredit: 100,
        status: true
    })
    res.status(201).json({
        message: 'pedandaftaran berhasil'
    })
}
