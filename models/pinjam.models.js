const { Sequelize } = require("sequelize");
const db = require("../config/db.config");
const User = require('./user.models')
const Buku = require('./buku.models')

const { DataTypes } = Sequelize;

const Pinjam = db.define(
    "pinjam",
    {
        id: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true,
            },
        },
        tgl_pinjam: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        tgl_kembali: {
            type: DataTypes.BIGINT
        },
        batas_pinjam: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        // Status Peminjaman = Sudah kembali / belum kembali
        status : {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        // Keterangan pengembalian
        ket_pengembalian: {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

// Relationship user - pinjam
User.hasMany(Pinjam)
Pinjam.belongsTo(User)

// Relationship buku - Pinjam
Buku.hasMany(Pinjam)
Pinjam.belongsTo(Buku)

module.exports = Pinjam;
