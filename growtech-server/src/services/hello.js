module.exports = {
  methods: {
    async get(id) {
      console.log(`Durante gettar ${id}!`);
      return `world ${id}!`;
    }
  },
  hooks: {
    before: {
      get(context) {
        console.log(`Antes de gettar ${context.id}!`);
      }
    },
    after: {
      get(context) {
        console.log(`Depois de gettar ${context.id}!`);
      }
    }
  }
};
