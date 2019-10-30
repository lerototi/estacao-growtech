require("dotenv").config();

require("./models");

const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");

const main = async () => {
    const app = express();
    app.use(express.static("public"));
    const apiPostSetup = await require("./api")(app);

    const port = process.env.SERVICE_PORT;
    let server = app.listen(port, () => {
        console.log(`iClub server listening on port ${port || 8080}`);
    });
    apiPostSetup(server);
};

main();

