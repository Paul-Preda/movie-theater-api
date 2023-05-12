let { app } = require("./app")
let { db } = require("./db/connection")
let seed = require("./seed")
let port = 3000

app.listen(port, async () => {
    await db.sync()
    await seed()
    console.log(`App listening at http://localhost:${port}/users`);
});
