const { Sequelize } = require("sequelize");
const db = require("../config/db.config");
const Buku = require('./buku.models')

const { DataTypes } = Sequelize;

const BukuDetail = db.define(
    "buku_detail",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        isbn: {
            type: DataTypes.STRING(25),
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        bahasa: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        tahun: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        edisi: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        fisik: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        subyek: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);


module.exports = BukuDetail;
