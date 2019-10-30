module.exports = {
  methods: {
    setup(app) {
      this.app = app;
    },
    async update(token) {
      //TODO processar token e atualizar senha do usuário

      return `Senha atualizada com sucesso`;
    }
  }
};
