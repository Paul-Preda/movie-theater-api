const request = require("supertest")
const { db } = require('../db/connection');
const { User, Show } = require('../models/index')
const { app } = require('../app');
const seed = require("../seed");

beforeAll(async () => {
    await seed();
})
describe('./users endpoint', () => {
    // Write your tests here
    
    it("can send successful request", async () => {
        let info = await request(app).get("/users");
        expect(info.statusCode).toBe(200);
    })



    it("can get list of users with correct attributes", async () => {
        let info = await request(app).get("/users");
        expect(info.body[0]).toHaveProperty('username');
        expect(info.body[0]).toHaveProperty('password');
    })

    it("can get list of users", async () => {
        let users = await User.findAll();
        let { body } = await request(app).get("/users");

        expect(body).toMatchObject([{"id":1,"username":"testUser@gmail.com"},
        {"id":2,"username":"someone@gmail.com"}])
    })

    it("can get user by id", async () => {
        let user = await User.findByPk(1); //get first user in seed
        let { body } = await request(app).get("/users/1"); //request first user 
        expect(body).toMatchObject({id : 1, username: "testUser@gmail.com"}); //request should equal first user
    })


    
})

describe('./shows endpoint', () => {
    // Write your tests here
    
    it("can send successful request", async () => {
        let info = await request(app).get("/shows");
        expect(info.statusCode).toBe(200);
    })



    it("can get list of shows with correct attributes", async () => {
        let info = await request(app).get("/shows");
        expect(info.body[0]).toHaveProperty('title');
        expect(info.body[0]).toHaveProperty('genre');
        expect(info.body[0]).toHaveProperty('status');
        expect(info.body[0]).toHaveProperty('rating');
    })

    it("can get list of shows", async () => {
        let users = await Show.findAll();
        let { body } = await request(app).get("/shows");

        expect(body).toMatchObject([
            {
              "title": "King of Queens",
              "genre": "Drama",
              "rating": 5,
              "status": "on-going"
            },
            {
              "title": "X-Files",
              "genre": "Sitcom",
              "rating": 0,
              "status": "on-going"
            },
            {
              "title": "The Office",
              "genre": "Comedy",
              "rating": 1,
              "status": "on-going"
            },
            {
              "title": "American Horror Story",
              "genre": "Sitcom",
              "rating": 5,
              "status": "on-going"
            },
            {
              "title": "House",
              "genre": "Comedy",
              "rating": 0,
              "status": "on-going"
            },
            {
              "title": "The Punisher",
              "genre": "Drama",
              "rating": 5,
              "status": "on-going"
            },
            {
              "title": "Squid Games",
              "genre": "Comedy",
              "rating": 0,
              "status": "on-going"
            },
            {
              "title": "Avatar",
              "genre": "Comedy",
              "rating": 1,
              "status": "on-going"
            },
            {
              "title": "Demon Slayer",
              "genre": "Sitcom",
              "rating": 5,
              "status": "cancelled"
            },
            {
              "title": "Jujutsu Kaisen",
              "genre": "Horror",
              "rating": 0,
              "status": "cancelled"
            },
            {
              "title": "Queens Gambit",
              "genre": "Drama",
              "rating": 0,
              "status": "cancelled"
            }
          ])
    })

    it("can get show by id", async () => {
        let show = await Show.findByPk(1); //get first show in seed
        let { body } = await request(app).get("/shows/1"); //request first show 
        expect(body).toMatchObject({
            "title": "King of Queens",
            "genre": "Drama",
            "rating": 5,
            "status": "on-going"
          }); //request should equal first show
    })


    
})