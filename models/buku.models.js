const { Sequelize } = require("sequelize");
const db = require("../config/db.config");
const BukuDetail = require('./bukuDetail.models')

const { DataTypes } = Sequelize;

const Buku = db.define(
    "buku",
    {
        id: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        no_panggil: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        judul: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        pengarang: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        penerbit: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        img_url: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        freezeTableName: true,
    }
);

BukuDetail.hasOne(Buku)


module.exports = Buku;
