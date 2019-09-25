const moment = require('moment')

module.exports = app => {
    
    getDevices = (req, res) => {
        
        app.db('device')
            .where({ userId: req.user.id })
            .then(devices => res.json(devices))
            .catch(err => res.status(500).json(err))
    }

    const save = (req, res) => {
        if(req.body.name.trim() || req.body.identifierCode) {
            return res.status(400).send('Verifique dados obrigatórios')
        }

        req.body.userId = req.user.id
        app.db('device')
            .insert(req.body)
            .then(_ => res.status(204).send())

    }
        

    const remove = (req, res) => {
        app.db('device')
            .where({ id: req.params.id, userId: req.user.id })
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0) {
                res.status(204).send()
            } else {
                const msg = `Não foi encontrado devide com o id &{req.params.id}.`
                res.staus(400).send(msg)
            }
        })
    }
}