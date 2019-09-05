const moment = require('moment')

module.exports = app => {
    const getTempsAndHumidity = (req, res) => {
        const initialDate = req.query.initialDate ? req.query.initialDate : null
        const finalDate = req.query.finalDate ? req.query.finalDate : moment().endOf('day').toDate()
        

        app.db('air_temp_humidity')
            //TODO  TRATAR FINAL DATE == NULL
            .where('created_at', '<=', finalDate)
            .orderBy('created_at')
            .then(airTempHumity => res.json(airTempHumity))
            .catch(err => res.status(500).json(err))
    }


    

}