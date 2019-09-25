module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.get('/devices', app.api.device.getAllDevices)
    app.route('/device')
        .all(app.config.passport.authenticate())
        .get(app.api.device.getDevicesByUser)
        .post(app.api.device.save)

    app.route('/device/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.device.remove)
    }