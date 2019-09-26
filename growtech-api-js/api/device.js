const moment = require('moment')

module.exports = app => {
    
    const getDevicesByUser = (req, res) => {
        app.db('device')
            .where('user_id', "=", req.user.id)
            .then(device => res.json(device))
            .catch(err => res.status(500).json(err))
    }

    const save = (req, res) => {
        if(!req.body.name.trim() || !req.body.identifierCode) {
            return res.status(400).send('Verifique dados obrigatórios')
        
        }else {

            const device = {
                name: req.body.name,
                identifier_code: req.body.identifierCode,
                created_at: moment(),
                user_id: req.user.id
            }
    
            app.db('device')
                .insert(device)
                .then( device => res.status(204).json(device) )
            }
    }
        

    const remove = (req, res) => {
        app.db('device')
            .where({ id: req.params.id, user_id: req.user.id })
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0) {
                res.status(204).send()
            } else {
                const msg = `Não foi encontrado devide com o id ${req.params.id}.`
                res.staus(400).send(msg)
            }
        })
    }

    return { getDevicesByUser, save, remove}
}