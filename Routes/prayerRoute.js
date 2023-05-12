const express = require('express')
const prayerTimer = require('../Controllers/prayerControler')

const router = express.Router()



router.post('/prayerTimes', prayerTimer)


module.exports = router;