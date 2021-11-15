const express = require("express")
const router = express.Router();

const {
    mFind,
    minsertOne
} = require("../controllers/usuario.controller.js")


router.post('/', mFind);
router.post('/create', minsertOne);

module.exports = router;
