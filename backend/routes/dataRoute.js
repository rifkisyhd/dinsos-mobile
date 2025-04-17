const express = require('express');
const router = express.Router();
const { getBNBA, getRekap } = require('../Controller/dataControllers.js');

router.get('/bnba/:program/:periode', getBNBA);
router.get('/rekapitulasi/:program/:periode', getRekap);

module.exports = router;
