const express = require("express")
const router = express.Router();

const {
    minsertOne,
    mFindAll,
    mUpdateOne,
    mDeleteOne
} = require("../controllers/cita.controller")


//http://localhost:3000/Task
router.post('/create', minsertOne);
router.get('/', mFindAll);
router.put('/update', mUpdateOne);
router.delete('/delete', mDeleteOne);

module.exports = router;