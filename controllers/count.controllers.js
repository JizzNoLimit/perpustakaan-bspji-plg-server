const Buku = require("../models/buku.models")
const Pinjam = require("../models/pinjam.models")
const User = require("../models/user.models")

exports.getCoundData = async (req, res) => {
    try {
        const user = await User.count({
            where: {
                role: 'user'
            }
        })
        const buku = await Buku.count()
        const pinjam = await Pinjam.count()
        const kembali = await Pinjam.count({
            where: {status: false}
        })
        res.status(200).json({
            data: {
                user, buku, pinjam, kembali
            },
            message: 'Jumlah data user, buku, peminjaman dan pengembalian'
        })
    } catch (error) {
        console.error(error);
    }
}