const express = require('express');
const {addTask} = require('../controlllers/listController');


const router = express.Router();

router.post('/listAdd', addTask);

module.exports = router;




