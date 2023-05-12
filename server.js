let app = require("./app")
let db = require("./db/connection")
let port = 3000;

app.listen(port, () => {
    db.sync()
    console.log(`App listening on port http://localhost:${port}/movie-theater-api`)
})