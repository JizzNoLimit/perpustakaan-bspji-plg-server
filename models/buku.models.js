const { Sequelize } = require("sequelize");
const db = require("../config/db.config");

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
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        pengarang: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        penerbit: {
            type: DataTypes.STRING,
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
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        tahun: {
            type: DataTypes.INTEGER,
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
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        kategori: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        desk: {
            type: DataTypes.TEXT
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


module.exports = Buku;
