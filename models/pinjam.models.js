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
        batas_pinjam: {
            type: DataTypes.DATE,
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
        }
    },
    {
        freezeTableName: true,
    }
);

// Relationship buku - pinjam
Buku.hasMany(Pinjam)

// Relationship user - pinjam
User.hasMany(Pinjam)

module.exports = Pinjam;
