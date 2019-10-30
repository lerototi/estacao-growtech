const {
  AuthenticationService,
  JWTStrategy
} = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { expressOauth } = require("@feathersjs/authentication-oauth");

const load = async api => {
  const authService = new AuthenticationService(api);

  authService.register("jwt", new JWTStrategy());
  authService.register("local", new LocalStrategy());

  api.use("/authentication", authService);
  //api.configure(expressOauth());
};

module.exports = load;
