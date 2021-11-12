var express = require('express');
var router = express.Router();

const  {
    getjwtToken,
    verifyToken
} = require("../controllers/auth.controller.js")

router.get("/sing", getjwtToken);
router.get("/very", verifyToken);

module.exports = router
