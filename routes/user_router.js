let User = require("../models/User")
let Show = require("../models/Show")
let { Router } = require("express")
let user_router = Router()

// GET all users
user_router.get("/", async (req, res) =>{
    let users = await User.findAll()
    res.json(users)
})

// GET one user
user_router.get("/:id", async (req, res) => {
    let id = req.params.id
    let found = await User.findByPk(id)
    res.json(found)
})

// GET all shows watched by a user (user id in req.params)
user_router.get("/:id/shows", async (req, res) => {
    let id = req.params.id
    let user = await User.findByPk(id, { include: [{ model: Show }] })
    res.json(user.shows)
})

// PUT update and add a show if a user has watched it
user_router.put("/:id/shows", async (req, res) => {
    let id = req.params.id
    let user = await User.findByPk(id)
    let show = await Show.findByPk(req.body.showId)
    await user.addShow(show, { through: { rating: req.body.rating, status: req.body.status }})
    res.json(user)
})



module.exports = user_router