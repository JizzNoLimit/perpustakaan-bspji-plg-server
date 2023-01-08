const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");

// Admin router
const userControl = require('./routes/admin/user.routes')

dotenv.config();

// Database connection
// const db = require("./config/db.config");
// const User = require("./models/user.models");
// const Buku = require("./models/buku.models")
// const BukuDetail = require("./models/bukuDetail.models")
// const Pinjam = require('./models/pinjam.models')
// const Kembali = require('./models/kembali.models')

// async function runn() {
//     try {
//         await db.sync();
//     } catch (error) {
//         console.error(error);
//     }
// }
// runn();

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: "auto",
        },
    })
);

// List url yang di setujui oleh cors
let allowList = [process.env.URL1, process.env.URL2];

// Cors options
let corsOptions = {
    origin: (origin, callbak) => {
        if (allowList.indexOf(origin) !== -1 || !origin) {
            callbak(null, true);
        } else {
            callbak(new Error("Not allowed by CORS"));
        }
    },
};
// CORS
app.use(cors(corsOptions));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.status(200).json({
        message: `Hello World`,
    });
});

// Router Admin mengelola User
app.use('/api/v1/admin', userControl)

const PORT = process.env.APP_PORT || 8080;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
