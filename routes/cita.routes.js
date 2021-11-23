const express = require("express")
const router = express.Router();

const {
    minsertOne,
    mFindAll,
    mUpdateOne,
    mDeleteOne
} = require("../controllers/cita.controller")

const  {
    verifyToken
} = require("../controllers/auth.controller.js")


//http://localhost:3000/Task
router.post('/create',verifyToken, minsertOne);
router.get('/', mFindAll);
router.put('/update', mUpdateOne);
router.delete('/delete', mDeleteOne);

module.exports = router;