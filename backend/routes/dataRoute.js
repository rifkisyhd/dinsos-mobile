const express = require('express');
const router = express.Router();
const { getBNBA, getRekap } = require('../Controller/dataControllers.js');

router.get('/rekapitulasi/:program/:periode', getRekap);

module.exports = router;
