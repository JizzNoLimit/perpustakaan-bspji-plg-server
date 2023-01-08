const { Sequelize } = require("sequelize");
const db = require("../config/db.config");
const User = require('./user.models')
const Buku = require('./buku.models')

const { DataTypes } = Sequelize;

const Kembali = db.define(
    "kembali",
    {
        id: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
            validate: {
                notEmpty: true,
            },
        },
        keterangan: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Status Pengembalian = Terlambat / tidak
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
    },
    {
        freezeTableName: true,
    }
);

// Relationship buku - pinjam
Buku.hasMany(Kembali)

// Relationship user - pinjam
User.hasMany(Kembali)

module.exports = Kembali;
