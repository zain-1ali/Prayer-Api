const getTodayDate = (date) => {
    const today = new Date(date)

    const yyyy = today.getFullYear()
    let mm = today.getMonth() + 1 // Months start at 0!
    let dd = today.getDate()

    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm

    const formattedToday = dd + '-' + mm + '-' + yyyy

    return formattedToday
}

const getCurrentTime = (date) => {
    const today = new Date(date)

    let hh = today.getHours()
    let mm = today.getMinutes()

    if (hh < 10) hh = '0' + hh
    if (mm < 10) mm = '0' + mm

    const time = hh + ':' + mm

    return time
}

const compareTimes = (currentTime, prayerTime, date) => {
    const today = new Date(date)

    const current = new Date(`${today.toDateString()} ${currentTime}`)
    const prayer = new Date(`${today.toDateString()} ${prayerTime}`)
    if (current < prayer) {
        return true
    }
    return false
}

const getNextPrayer = (currentTime, prayerTimes, date) => {
    for (let key in prayerTimes) {
        if (prayerTimes.hasOwnProperty(key)) {
            const value = prayerTimes[key]
            if (compareTimes(currentTime, value, date)) {
                return { prayer: key, time: value }
            }
        }
    }
}

const getCurrentPrayer = (currentTime, prayerTimes, date) => {
    let prayer, time
    for (let key in prayerTimes) {
        if (prayerTimes.hasOwnProperty(key)) {
            const value = prayerTimes[key]
            if (compareTimes(currentTime, value, date)) {
                break
            }
            prayer = key
            time = value
        }
    }
    if (!prayer) {
        prayer = 'Isha'
        time = prayerTimes.Isha
    }

    return { prayer, time }
}

module.exports = {
    getTodayDate,
    getCurrentTime,
    compareTimes,
    getNextPrayer,
    getCurrentPrayer,
}
