const axios = require('axios')
const {
    getTodayDate,
    getCurrentTime,
    getNextPrayer,
    getCurrentPrayer,
} = require('../services/prayerService')

const getPrayerByDate = async (req, res) => {
    const { latitude, longitude } = req.body
    let { date } = req.body

    if (!latitude) {
        res.status(500).json({ message: 'Please provide latitude' })
    }

    if (!longitude) {
        res.status(500).json({ message: 'Please provide longitude' })
    }

    if (!date) {
        res.status(500).json({ message: 'Please provide date' })
    }

    date = date.split('GMT')[0]

    const todayDate = getTodayDate(date)
    const currentTime = getCurrentTime(date)

    const timingsUrl = `http://api.aladhan.com/v1/timings/${todayDate}?latitude=${latitude}&longitude=${longitude}&method=3&school=1`

    try {
        const response = await axios.get(timingsUrl)
        const { Fajr, Dhuhr, Asr, Maghrib, Isha, Sunrise } = response.data.data.timings
        const data = { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha }

        // const { Fajr, Dhuhr, Asr, Maghrib, Isha } = response.data.data.timings
        const data2 = { Fajr, Dhuhr, Asr, Maghrib, Isha }


        data.currentPrayer = getCurrentPrayer(currentTime, data, date)

        data.nextPrayer = getNextPrayer(currentTime, data2, date)

        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res
            .status(error.response.data.code)
            .json({ success: false, message: error.response.data.data })
    }
}

module.exports = getPrayerByDate 
