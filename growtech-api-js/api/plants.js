const moment = require('moment')

module.exports = app => {
    const getAirTempHumits = (req, res) => {
        const date = req.query.date ? req.query.date : moment().endOf('day').toDate()
    }
}