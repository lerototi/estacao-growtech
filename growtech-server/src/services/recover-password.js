module.exports = {
  methods: {
    setup(app) {
      this.app = app;
    },
    async create(body, params) {
      let user = (await this.app
        .service("users")
        .find({ query: { $limit: 1, email: body.email } })).data[0];

      if (user == undefined || user == null) {
        return `Usuário não cadastrado`;
      }

      //TODO estruturar envio de e-mail, configs de servidor e etc.

      return `Um e-mail foi enviado para: ${body.email}`;
    }
  }
};
