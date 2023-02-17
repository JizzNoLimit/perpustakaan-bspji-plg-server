const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path')

// Auth routes
const auth = require('./routes/auth.routes')

// Admin router
const userControl = require('./routes/admin/user.routes')
const bukuControl = require('./routes/admin/buku.routes')
const pinjamControl = require('./routes/admin/pinjam.routes')
const kembaliControl = require('./routes/admin/kembali.routes')

// Anggota router
const userDashboard = require('./routes/user/index.routes')

// Buku router
const buku = require('./routes/buku.routes')
const countData = require('./routes/count.routes')

dotenv.config();

// Database connection
// const db = require("./config/db.config");
// const User = require("./models/user.models");
// const Buku = require("./models/buku.models")
// const Pinjam = require('./models/pinjam.models')

// async function runn() {
//     try {
//         await db.sync();
//     } catch (error) {
//         console.error(error);
//     }
// }
// runn();

const app = express();

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

// static directory
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'));
app.use('/upload', express.static('upload'));

app.get("/", (req, res) => {
    res.status(200).json({
        message: `Hello World`,
    });
});

// Router authentication
app.use('/api/v1/auth', auth)

// Router Admin mengelola User
app.use('/api/v1/admin', userControl)

// Router Admin mengelola Buku
app.use('/api/v1/admin', bukuControl)

// Rouer Admin mengelola Peminjaman
app.use('/api/v1/admin', pinjamControl)

// Rouer Admin mengelola Peminjaman
app.use('/api/v1/admin', kembaliControl)

// Router Anggota
app.use('/api/v1/user', userDashboard)

// Router buku
app.use('/api/v1/', buku)

// Router Count data
app.use('/api/v1', countData)

const PORT = process.env.APP_PORT || 8080;

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
